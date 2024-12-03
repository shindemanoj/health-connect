import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const GymOwnerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axios.post('http://localhost:5001/api/users/login', {
                email,
                password,
            });

            // Ensure only gym owners can login
            if (data.role !== 'gym_owner') {
                setError('Unauthorized access. This login is for Gym Owners only.');
                return;
            }

            // Store token in localStorage and navigate to the dashboard
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('role', data.role);
            navigate('/gym-owner/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Gym Owner Login</h2>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                        {error && <p className="text-danger mt-3">{error}</p>}
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account?{' '}
                        <Link to="/gym-owner/register" className="link-primary">
                            Register as Gym Owner
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GymOwnerLogin;