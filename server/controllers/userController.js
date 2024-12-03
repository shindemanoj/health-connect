const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const crypto = require('crypto');

// Helper function to hash password with SHA-256
const hashWithSHA256 = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const role = req.body.role || 'customer'; // Default to 'customer' role
    try {
        // Assume password is already hashed on the client side
        const result = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, password, role]
        );
        res.status(201).json({ message: 'User registered', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
};

// Register Gym Owner
const registerGymOwner = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Assume password is already hashed on the client side
        const result = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, password, 'gym_owner'] // Set role to 'gym_owner'
        );
        res.status(201).json({ message: 'Gym Owner registered successfully', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Gym Owner registration failed' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, hashedPassword } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Compare hashed passwords
        if (hashedPassword !== user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user.id, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = { registerUser, registerGymOwner, loginUser };