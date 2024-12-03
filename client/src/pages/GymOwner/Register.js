import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GymOwnerRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to hash the password using SHA-256
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

        try {
            // Hash the password before sending it to the server
            const hashedPassword = await hashPassword(password);

            await axios.post('http://localhost:5001/api/users/gym-owner/register', {
                name,
                email,
                password: hashedPassword, // Send hashed password
            });

            // After successful registration, navigate to the login page
            navigate('/gym-owner/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Server error');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Register as Gym Owner</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                        <button type="submit" className="btn btn-primary w-100">
                            Register
                        </button>
                    </form>
                    {error && <p className="text-danger mt-2">{error}</p>}
                    <p className="mt-3 text-center">
                        Already have an account?{' '}
                        <a href="/gym-owner/login" className="link-primary">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GymOwnerRegister;