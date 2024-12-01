import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import GymList from './pages/GymList';
import GymPage from './pages/GymPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gyms" element={<GymList />} />
                <Route path="/gym/:gymId" element={<GymPage />} />
            </Routes>
        </Router>
    );
}

export default App;