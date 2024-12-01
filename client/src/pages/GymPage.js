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
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                Back to Gym List
            </button>

            {gym ? (
                <>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">{gym.name}</h2>
                            <p className="card-text">
                                <strong>Location:</strong> {gym.location}
                            </p>
                            <p className="card-text">
                                <strong>Distance:</strong> {gym.distance} km away
                            </p>
                        </div>
                    </div>

                    <h3>Available Classes</h3>
                    {classes.length > 0 ? (
                        <ul className="list-group">
                            {classes.map((classItem) => (
                                <li key={classItem.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{classItem.name}</strong> - {new Date(classItem.schedule).toLocaleString()}
                                    </div>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleClassSelect(classItem.name)}
                                    >
                                        Book
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No classes available for this gym.</p>
                    )}

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