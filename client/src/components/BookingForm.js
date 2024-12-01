import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ gymId, gymName, onClose }) => {
    const [className, setClassName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`http://localhost:5001/api/bookings`, {
                gymId,
                className,
            });
            setMessage(`Successfully booked ${className} at ${gymName}!`);
        } catch (error) {
            setMessage('Failed to book the class. Please try again.');
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
            <h3>Book a Class at {gymName}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Class Name:</label>
                    <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Confirm Booking</button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BookingForm;