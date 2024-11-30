const { getGyms } = require('../models/gymModel');

const fetchGyms = async (req, res) => {
    try {
        const gyms = await getGyms();
        res.status(200).json(gyms);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch gyms' });
    }
};

module.exports = { fetchGyms };