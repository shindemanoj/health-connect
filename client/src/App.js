import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import GymList from './pages/GymList'; // Example, replace with actual components.

function App() {
    return (
        <Router>
            <Routes>
                {/* Home route (/) redirects to Login */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gyms" element={<GymList />} />
            </Routes>
        </Router>
    );
}

export default App;