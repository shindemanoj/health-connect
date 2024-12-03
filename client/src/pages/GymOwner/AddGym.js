import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../components/LogoutButton';

const GymOwnerAddGym = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axios.post(
                'http://localhost:5001/api/gym-owner/gyms',

                { name, location, description, userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                        role: role
                    },
                }
            );

            if (data) {
                navigate('/gym-owner/dashboard');
            }
        } catch (err) {
            setError('Failed to add gym. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <LogoutButton />
            <h2>Add New Gym</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Gym Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Gym
                </button>
            </form>
        </div>
    );
};

export default GymOwnerAddGym;