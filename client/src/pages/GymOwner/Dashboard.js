import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../../components/LogoutButton';
import { useNavigate } from 'react-router-dom';

const GymOwnerDashboard = () => {
    const [gyms, setGyms] = useState([]);
    const [classes, setClasses] = useState({});
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    // Fetch gyms owned by the user
    useEffect(() => {
        const fetchGyms = async () => {
            try {
                const { data } = await axios.get('http://localhost:5001/api/gym-owner/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId,
                        role,
                    },
                });
                setGyms(data.gyms || []);
            } catch (err) {
                console.error('Error fetching gyms:', err);
                setGyms([]);
            }
        };

        fetchGyms();
    }, [token, userId, role]);

    // Fetch classes for a specific gym
    const fetchClassesForGym = async (gymId) => {
        try {
            const { data } = await axios.get(`http://localhost:5001/api/gym-owner/gyms/${gymId}/classes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId,
                    role,
                },
            });
            console.log('Classes fetched for gym:', gymId, data); // Debug log
            setClasses((prev) => ({
                ...prev,
                [gymId]: data, // Update the classes state for the specific gym
            }));
        } catch (err) {
            console.error(`Error fetching classes for gym ${gymId}:`, err);
        }
    };

    // Navigate to add gym or class
    const handleAddGym = () => {
        navigate('/gym-owner/add-gym');
    };

    const handleAddClass = (gymId) => {
        navigate(`/gym-owner/gym/${gymId}/add-class`);
    };

    return (
        <div className="container mt-4">
            <LogoutButton />
            <h2 className="mb-4">Gym Owner Dashboard</h2>
            <button className="btn btn-success mb-4" onClick={handleAddGym}>
                Add New Gym
            </button>
            <div className="row">
                {gyms.length > 0 ? (
                    gyms.map((gym) => (
                        <div className="col-md-6 mb-4" key={gym.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{gym.name}</h5>
                                    <p className="card-text">
                                        <strong>Location:</strong> {gym.location}
                                    </p>
                                    <p className="card-text">
                                        <strong>Description:</strong> {gym.description}
                                    </p>
                                    <button
                                        className="btn btn-primary mb-3"
                                        onClick={() => handleAddClass(gym.id)}
                                    >
                                        Add Class
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => fetchClassesForGym(gym.id)}
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#classes-${gym.id}`}
                                        aria-expanded="false"
                                        aria-controls={`classes-${gym.id}`}
                                    >
                                        Show Classes
                                    </button>
                                    <div
                                        className="collapse mt-3"
                                        id={`classes-${gym.id}`}
                                    >
                                        {classes[gym.id] && classes[gym.id].length > 0 ? (
                                            <div className="card card-body">
                                                <h6>Classes:</h6>
                                                <ul className="list-group">
                                                    {classes[gym.id].map((gymClass) => (
                                                        <li
                                                            className="list-group-item d-flex justify-content-between align-items-center"
                                                            key={gymClass.id}
                                                        >
                                                            <span>
                                                                <strong>{gymClass.name}</strong> -{' '}
                                                                {new Date(gymClass.schedule).toLocaleString()}
                                                            </span>
                                                            <span className="badge bg-primary rounded-pill">
                                                                {gymClass.capacity} spots
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="text-muted">No classes available.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No gyms found</p>
                )}
            </div>
        </div>
    );
};

export default GymOwnerDashboard;