import React from 'react';
import { useNavigate } from 'react-router-dom';

const GymCard = ({ gym, onBookNow, isGymPage }) => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        if (onBookNow) {
            onBookNow(); // Call the passed down callback to open the Booking Form or navigate to GymPage
        } else {
            navigate(`/gym/${gym.id}`); // Navigate to GymPage if no callback provided
        }
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{gym.name}</h5>
                <p className="card-text">
                    <strong>Location:</strong> {gym.location}
                </p>
                <p className="card-text">
                    <strong>Distance:</strong> {gym.distance} km away
                </p>
                <p className="card-text">
                    <strong>Description:</strong> {gym.description}
                </p>
                {!isGymPage && (
                    <button
                        className="btn btn-primary"
                        onClick={handleBookNow}
                    >
                        Book Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default GymCard;