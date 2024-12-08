const { getGyms, getGymDetails, getClassesByGymId } = require('../models/gymModel');

const fetchGyms = async (req, res) => {
    try {
        const gyms = await getGyms();
        res.status(200).json(gyms);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch gyms' });
    }
};

// Get gym and class details by gymId
const getGymAndClasses = async (req, res) => {
    const { gymId } = req.params;

    try {
        // Fetch gym details
        const gym = await getGymDetails(gymId);

        // Fetch classes for the gym
        const classes = await getClassesByGymId(gymId);

        // Return gym details along with the classes
        return res.status(200).json({ gym, classes });
    } catch (error) {
        console.error('Error fetching gym and classes:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { fetchGyms, getGymAndClasses };