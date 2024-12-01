import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GymCard from '../components/GymCard';

const GymList = () => {
    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        const fetchGyms = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/gyms');
                setGyms(response.data); // Set gyms list
            } catch (error) {
                console.error('Error fetching gyms:', error);
            }
        };

        fetchGyms();
    }, []);

    return (
        <div>
            <h2>Nearby Gyms</h2>
            {gyms.length > 0 ? (
                gyms.map((gym) => (
                    <Link to={`/gym/${gym.id}`} key={gym.id} style={{ textDecoration: 'none' }}>
                        <GymCard gym={gym} />
                    </Link>
                ))
            ) : (
                <p>No gyms available in your area.</p>
            )}
        </div>
    );
};

export default GymList;