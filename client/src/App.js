import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerGymList from './pages/CustomerGymList';
import CustomerGymPage from './pages/CustomerGymPage';


import GymOwnerLogin from './pages/GymOwner/Login';
import GymOwnerRegister from './pages/GymOwner/Register';
import GymOwnerDashboard from './pages/GymOwner/Dashboard';
import GymOwnerAddGym from './pages/GymOwner/AddGym';
import GymOwnerAddClass from './pages/GymOwner/AddClass';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gyms" element={<CustomerGymList />} />
                <Route path="/gyms/:gymId" element={<CustomerGymPage />} />

                {/* Gym Owner Routes */}
                <Route path="/gym-owner/login" element={<GymOwnerLogin />} />
                <Route path="/gym-owner/register" element={<GymOwnerRegister />} />
                <Route path="/gym-owner/dashboard" element={<GymOwnerDashboard />} />
                <Route path="/gym-owner/add-gym" element={<GymOwnerAddGym />} />
                <Route path="/gym-owner/gym/:gymId/add-class" element={<GymOwnerAddClass />} />
            </Routes>
        </Router>
    );
}

export default App;