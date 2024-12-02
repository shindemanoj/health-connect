import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to login page
        navigate('/login');
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