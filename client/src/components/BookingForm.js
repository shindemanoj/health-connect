import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ gymId, gymName, className, onClose }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/bookings', {
                gymId,
                className,
            });
            setMessage(`Successfully booked ${className} at ${gymName}!`);
        } catch (error) {
            setMessage('Failed to book the class. Please try again.');
        }
    };

    return (
        <div className="card p-4 mt-4 shadow-sm">
            <h3 className="card-title">Book {className} at {gymName}</h3>
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
            {message && <p className={`mt-3 ${message.includes('Failed') ? 'text-danger' : 'text-success'}`}>{message}</p>}
        </div>
    );
};

export default BookingForm;