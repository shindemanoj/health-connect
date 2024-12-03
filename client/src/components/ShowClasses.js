import React, { useState } from 'react';
import axios from 'axios';

const ShowClasses = ({ gymId }) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isClassesLoaded, setIsClassesLoaded] = useState(false); // New flag

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    const fetchClasses = async () => {
        setLoading(true);
        setError(null);
        setIsClassesLoaded(true); // Set to true when user clicks the button

        try {
            const { data } = await axios.get(`http://localhost:5001/api/gym-owner/gyms/${gymId}/classes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                    role: role,
                },
            });
            setClasses(data);
        } catch (err) {
            console.error(`Error fetching classes for gym ${gymId}:`, err);
            setError('Failed to fetch classes.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-3">
            <button className="btn btn-secondary" onClick={fetchClasses}>
                Show Classes
            </button>
            {loading && <p className="text-muted mt-2">Loading classes...</p>}
            {error && <p className="text-danger mt-2">{error}</p>}
            {classes.length > 0 && (
                <div className="card card-body mt-3">
                    <h6>Classes:</h6>
                    <ul className="list-group">
                        {classes.map((gymClass) => (
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
            )}
            {isClassesLoaded && classes.length === 0 && !loading && !error && (
                <p className="text-muted mt-2">No classes available for this gym.</p>
            )}
        </div>
    );
};

export default ShowClasses;