const pool = require('../config/db');

// Create a gym
const createGym = async (name, location, description, distance, ownerId) => {
    try {
        const result = await pool.query(
            'INSERT INTO gyms (name, location, description, distance, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, location, description, distance, ownerId]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to create gym');
    }
};

// Fetch gyms owned by the current owner
const getGyms = async (ownerId) => {
    try {
        const result = await pool.query('SELECT * FROM gyms WHERE owner_id = $1', [ownerId]);
        return result.rows;
    } catch (error) {
        throw new Error('Failed to fetch gyms');
    }
};

// Add a class to a gym
const addClassToGym = async (gymId, name, schedule, capacity) => {
    try {
        const result = await pool.query(
            'INSERT INTO classes (gym_id, name, schedule, capacity) VALUES ($1, $2, $3, $4) RETURNING *',
            [gymId, name, schedule, capacity]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to add class');
    }
};

// Get classes by gym ID
const getClassesByGym = async (gymId) => {
    try {
        const result = await pool.query('SELECT * FROM classes WHERE gym_id = $1', [gymId]);
        return result.rows;
    } catch (error) {
        throw new Error('Failed to fetch classes');
    }
};

// Get dashboard data for gym owner
const getGymOwnerData = async (ownerId) => {
    try {
        const gyms = await pool.query('SELECT * FROM gyms WHERE owner_id = $1', [ownerId]);
        return gyms.rows;
    } catch (error) {
        throw new Error('Failed to fetch gyms for owner');
    }
};

module.exports = { createGym, getGyms, addClassToGym, getClassesByGym, getGymOwnerData };