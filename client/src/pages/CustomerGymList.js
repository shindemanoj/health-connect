import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GymCard from '../components/GymCard';
import LogoutButton from '../components/LogoutButton';

const CustomerGymList = () => {
    const [gyms, setGyms] = useState([]);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGyms = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/gyms',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            userId: userId,
                            role: role,
                        },
                    });
                setGyms(response.data); // Set gyms list
            } catch (error) {
                setError(error.error);
                console.error('Error fetching gyms:', error);
            }
        };

        fetchGyms();
    }, []);

    return (
        <div className="container mt-4">
            <LogoutButton />

            <h2 className="mb-4">Nearby Gyms</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {gyms.length > 0 ? (
                <div className="row">
                    {gyms.map((gym) => (
                        <div className="col-md-4 mb-4" key={gym.id}>
                            <Link to={`/gyms/${gym.id}`} style={{ textDecoration: 'none' }}>
                                <GymCard gym={gym} />
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No gyms available in your area.</p>
            )}
        </div>
    );
};

export default CustomerGymList;