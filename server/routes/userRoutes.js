// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration (for customers)
router.post('/register', userController.registerUser);

// Gym Owner registration
router.post('/gym-owner/register', userController.registerGymOwner);  // New route for Gym Owners

// Login (for both customers and gym owners)
router.post('/login', userController.loginUser);

module.exports = router;