const express = require('express');
const {
    createGym,
    getGyms,
    addClassToGym,
    getClassesByGym,
    getGymOwnerData,
} = require('../controllers/gymOwnerController');
const { authenticateRole } = require('../middleware/auth');
const router = express.Router();

// Protect these routes for gym owners only
router.post('/gyms', authenticateRole('gym_owner'), createGym);
router.get('/gyms', authenticateRole('gym_owner'), getGyms);
router.post('/gyms/:gymId/classes', authenticateRole('gym_owner'), addClassToGym);
router.get('/gyms/:gymId/classes', authenticateRole('gym_owner'), getClassesByGym);
router.get('/dashboard', authenticateRole('gym_owner'), getGymOwnerData);

module.exports = router;