// src/pages/GymOwnerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../../components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import ShowClasses from '../../components/ShowClasses';

const GymOwnerDashboard = () => {
    const [gyms, setGyms] = useState([]);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGyms = async () => {
            try {
                const { data } = await axios.get('http://localhost:5001/api/gym-owner/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                        role: role,
                    },
                });
                setGyms(data.gyms || []);
            } catch (err) {
                console.error("Error fetching gyms:", err);
                setGyms([]);
            }
        };

        fetchGyms();
    }, [token, userId, role]);

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
                                        <strong>Distance:</strong> {gym.distance}
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
                                    <ShowClasses gymId={gym.id}/>
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