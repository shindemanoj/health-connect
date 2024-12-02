const pool = require('../config/db');

const getGyms = async () => {
    const result = await pool.query('SELECT * FROM gyms');
    return result.rows;
};

// Fetch gym details by gymId
const getGymDetails = async (gymId) => {
    try {
        const gymQuery = 'SELECT id, name, location, distance, description FROM gyms WHERE id = $1';
        const gymResult = await pool.query(gymQuery, [gymId]);

        if (gymResult.rows.length === 0) {
            throw new Error('Gym not found');
        }

        return gymResult.rows[0]; // Return gym details
    } catch (error) {
        throw new Error(error.message);
    }
};

// Fetch classes available for a specific gym
const getClassesByGymId = async (gymId) => {
    try {
        const classesQuery =
            'SELECT id, name, schedule, capacity FROM classes WHERE gym_id = $1 ORDER BY schedule';
        const classesResult = await pool.query(classesQuery, [gymId]);

        return classesResult.rows; // Return list of classes
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getGyms, getGymDetails, getClassesByGymId };