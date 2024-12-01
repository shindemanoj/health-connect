import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

const GymPage = () => {
    const { gymId } = useParams(); // Get gym ID from the URL
    const navigate = useNavigate();
    const [gym, setGym] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        const fetchGymDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/gyms/${gymId}`);
                setGym(response.data.gym); // Set gym details
                setClasses(response.data.classes); // Set associated classes
            } catch (error) {
                console.error('Error fetching gym details:', error);
            }
        };

        fetchGymDetails();
    }, [gymId]);

    const handleClassSelect = (className) => {
        setSelectedClass(className);
    };

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back to Gym List</button>

            {gym ? (
                <>
                    <h2>{gym.name}</h2>
                    <p>{gym.location}</p>
                    <p>{gym.distance} km away</p>

                    <h3>Available Classes</h3>
                    <ul>
                        {classes.length > 0 ? (
                            classes.map((classItem) => (
                                <li key={classItem.id}>
                                    <strong>{classItem.name}</strong> -{' '}
                                    {new Date(classItem.schedule).toLocaleString()}
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => handleClassSelect(classItem.name)}
                                    >
                                        Book
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No classes available for this gym.</p>
                        )}
                    </ul>

                    {selectedClass && (
                        <BookingForm
                            gymId={gym.id}
                            gymName={gym.name}
                            className={selectedClass}
                            onClose={() => setSelectedClass('')} // Reset selected class after booking
                        />
                    )}
                </>
            ) : (
                <p>Loading gym details...</p>
            )}
        </div>
    );
};

export default GymPage;