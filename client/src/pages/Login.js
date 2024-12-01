import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Redirect logged-in users to the gyms page
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/gyms');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
            });
            // Store token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // Store user details (optional)
            navigate('/gyms'); // Redirect to gyms page on successful login
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;