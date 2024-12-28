import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ gymId, gymName, classId, onClose }) => {
    const [message, setMessage] = useState('');

    // Read userId from localStorage
    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send booking request to the server
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/bookings`, {
                gymId,
                classId,
                userId, // Include userId in the request
            });
            setMessage(`Successfully booked class at ${gymName}!`);
        } catch (error) {
            console.error('Error booking the class:', error);
            setMessage('Failed to book the class. Please try again.');
        }
    };

    return (
        <div className="card p-4 mt-4 shadow-sm">
            <h3 className="card-title">Book Class at {gymName}</h3>
            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-success">
                        Confirm Booking
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            {message && (
                <p
                    className={`mt-3 ${
                        message.includes('Failed') ? 'text-danger' : 'text-success'
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default BookingForm;