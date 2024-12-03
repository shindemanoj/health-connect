import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const GymOwnerAddClass = () => {
    const { gymId } = useParams();
    const [name, setName] = useState('');
    const [schedule, setSchedule] = useState('');
    const [capacity, setCapacity] = useState('');
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
                `http://localhost:5001/api/gym-owner/gyms/${gymId}/classes`,
                { name, schedule, capacity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                        role: role,
                    },
                }
            );

            if (data) {
                navigate(`/gym-owner/dashboard`);
            }
        } catch (err) {
            setError('Failed to add class. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Class to Gym</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Class Name</label>
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
                    <label htmlFor="schedule">Schedule</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="schedule"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Class
                </button>
            </form>
        </div>
    );
};

export default GymOwnerAddClass;