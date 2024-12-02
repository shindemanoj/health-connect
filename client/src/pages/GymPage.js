import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import LogoutButton from '../components/LogoutButton';
import GymCard from '../components/GymCard';

const GymPage = () => {
    const { gymId } = useParams(); // Get gym ID from the URL
    const navigate = useNavigate();
    const [gym, setGym] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Get userId from localStorage
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchGymDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/gyms/${gymId}`);
                setGym(response.data.gym); // Set gym details
                setClasses(response.data.classes); // Set associated classes
            } catch (err) {
                console.error('Error fetching gym details:', err);
                setError('Failed to load gym details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchGymDetails();
    }, [gymId]);

    const handleClassSelect = (classItem) => {
        setSelectedClass(classItem);
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <LogoutButton />
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <LogoutButton />
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Back to Gym List
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <LogoutButton />
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                Back to Gym List
            </button>

            {gym ? (
                <>
                    <GymCard gym={gym} isGymPage={true} />

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
                                        onClick={() => handleClassSelect(classItem)} // Pass the entire classItem
                                    >
                                        Book
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="alert alert-info">No classes available for this gym.</div>
                    )}

                    {selectedClass && (
                        <BookingForm
                            gymId={gym.id}
                            gymName={gym.name}
                            classId={selectedClass.id}
                            userId={userId}  // Get userId from localStorage
                            onClose={() => setSelectedClass('')} // Reset selected class after booking
                        />
                    )}
                </>
            ) : (
                <div className="alert alert-warning">Gym details not found.</div>
            )}
        </div>
    );
};

export default GymPage;