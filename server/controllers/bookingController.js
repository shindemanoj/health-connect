const pool = require('../config/db');

const bookClass = async (req, res) => {
    const { userId, gymId, className } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO bookings (user_id, gym_id, class_name) VALUES ($1, $2, $3) RETURNING *',
            [userId, gymId, className]
        );
        res.status(201).json({ message: 'Class booked', booking: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Booking failed' });
    }
};

module.exports = { bookClass };