const gymOwnerModel = require('../models/gymOwnerModel');

// Create a gym
const createGym = async (req, res) => {
    const { name, location, description, distance } = req.body;
    const ownerId = req.body.userId;

    try {
        const gym = await gymOwnerModel.createGym(name, location, description, distance, ownerId);
        res.status(201).json(gym);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create gym' });
    }
};

// Fetch gyms owned by the current owner
const getGyms = async (req, res) => {
    const ownerId = req.headers.userId;

    try {
        const gyms = await gymOwnerModel.getGyms(ownerId);
        res.status(200).json(gyms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch gyms' });
    }
};

// Add a class to a gym
const addClassToGym = async (req, res) => {
    const { gymId } = req.params;
    const { name, schedule, capacity } = req.body;

    try {
        const newClass = await gymOwnerModel.addClassToGym(gymId, name, schedule, capacity);
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add class' });
    }
};

// Get classes by gym ID
const getClassesByGym = async (req, res) => {
    const { gymId } = req.params;

    try {
        const classes = await gymOwnerModel.getClassesByGym(gymId);
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch classes' });
    }
};

// Get dashboard data for gym owner
const getGymOwnerData = async (req, res) => {
    const ownerId = req.headers.userid;

    try {
        const gyms = await gymOwnerModel.getGymOwnerData(ownerId);
        res.status(200).json({ gyms });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

module.exports = { createGym, getGyms, addClassToGym, getClassesByGym, getGymOwnerData };