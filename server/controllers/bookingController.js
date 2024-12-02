// controllers/bookingController.js
const bookingModel = require('../models/bookingModel');

// Handle booking creation
const createBooking = async (req, res) => {
    const { userId, gymId, classId } = req.body;

    // Validate input
    if (!userId || !gymId || !classId) {
        return res.status(400).json({ error: 'userId, gymId, and classId are required.' });
    }

    try {
        const result = await bookingModel.addBooking(userId, gymId, classId);

        if (result.success) {
            return res.status(201).json({ message: result.message });
        } else {
            return res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ error: 'An error occurred while processing the booking.' });
    }
};

module.exports = { createBooking };