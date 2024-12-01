import React from 'react';
import { useNavigate } from 'react-router-dom';

const GymCard = ({ gym, onBookNow }) => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        if (onBookNow) {
            onBookNow(); // Call the passed down callback to open the Booking Form or navigate to GymPage
        } else {
            navigate(`/gym/${gym.id}`); // Navigate to GymPage if no callback provided
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
            <h3>{gym.name}</h3>
            <p>{gym.location}</p>
            <p>{gym.distance} km away</p>
            <button onClick={handleBookNow}>Book Now</button>
        </div>
    );
};

export default GymCard;