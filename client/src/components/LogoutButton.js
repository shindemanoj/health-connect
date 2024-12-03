import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        // Redirect to login page based on the role
        const role = localStorage.getItem('role');

        if (role === 'gym_owner') {
            localStorage.removeItem('role');
            navigate('/gym-owner/login'); // Redirect to gym owner's login page
        } else {
            localStorage.removeItem('role');
            navigate('/login'); // Redirect to general user login page
        }
    };

    return (
        <button
            className="btn btn-danger"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
            }}
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

export default LogoutButton;