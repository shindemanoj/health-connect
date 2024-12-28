import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/gyms');
        }
    }, [navigate]);

    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Step 1: Hash password directly
            const hashedPassword = await hashPassword(password);

            // Step 2: Send email and hashed password to server
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
                email,
                hashedPassword,
            });

            // Step 3: Save token and redirect
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('role', data.role);
            navigate('/gyms');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    {error && (
                        <div className="alert alert-danger mt-2" role="alert">
                            {error}
                        </div>
                    )}
                    <p className="mt-3 text-center">
                        Don't have an account?{' '}
                        <a href="/register" className="link-primary">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;