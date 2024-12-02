const pool = require('../config/db');

/**
 * Add a booking for a user, ensuring class capacity constraints are respected
 * and updating the class capacity after a successful booking.
 */
const addBooking = async (userId, gymId, classId) => {
    const client = await pool.connect(); // Use a transaction for consistency

    try {
        await client.query('BEGIN'); // Start the transaction

        // Check if class exists and get current capacity
        const classDetails = await client.query(
            'SELECT capacity FROM classes WHERE id = $1 FOR UPDATE', // Lock the row for updates
            [classId]
        );

        if (classDetails.rows.length === 0) {
            throw new Error('Class not found');
        }

        const currentCapacity = classDetails.rows[0].capacity;

        if (currentCapacity <= 0) {
            throw new Error('Class is fully booked');
        }

        // Add the booking
        await client.query(
            'INSERT INTO bookings (user_id, gym_id, class_id) VALUES ($1, $2, $3)',
            [userId, gymId, classId]
        );

        // Decrease the class capacity
        await client.query(
            'UPDATE classes SET capacity = capacity - 1 WHERE id = $1',
            [classId]
        );

        await client.query('COMMIT'); // Commit the transaction
        return { success: true, message: 'Booking successful!' };
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        return { success: false, message: error.message };
    } finally {
        client.release(); // Release the client back to the pool
    }
};

module.exports = { addBooking };