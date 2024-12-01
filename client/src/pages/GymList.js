import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from '../components/BookingForm'; // Adjusted import path for BookingForm

const GymList = () => {
    const [gyms, setGyms] = useState([]);
    const [selectedGym, setSelectedGym] = useState(null); // State for the gym selected for booking

    useEffect(() => {
        const fetchGyms = async () => {
            try {
                const { data } = await axios.get('http://localhost:5001/api/gyms');
                setGyms(data);
            } catch (error) {
                console.error('Error fetching gyms:', error);
            }
        };

        fetchGyms();
    }, []);

    const handleBookClick = (gym) => {
        setSelectedGym(gym);
    };

    return (
        <div>
            <h2>Nearby Gyms</h2>
            <ul>
                {gyms.map((gym) => (
                    <li key={gym.id}>
                        <h3>{gym.name}</h3>
                        <p>{gym.location}</p>
                        <p>{gym.distance} km away</p>
                        <button onClick={() => handleBookClick(gym)}>Book Now</button>
                    </li>
                ))}
            </ul>
            {selectedGym && (
                <BookingForm
                    gymId={selectedGym.id}
                    gymName={selectedGym.name}
                    onClose={() => setSelectedGym(null)} // Close the form after booking
                />
            )}
        </div>
    );
};

export default GymList;