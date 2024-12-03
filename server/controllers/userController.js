const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const role = req.body.role || 'customer';  // Default to 'user' if no role is provided
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, role]
        );
        res.status(201).json({ message: 'User registered', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
};

// Gym Owner Registration
const registerGymOwner = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, 'gym_owner']  // Set role to 'gym_owner'
        );
        res.status(201).json({ message: 'Gym Owner registered successfully', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Gym Owner registration failed' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) return res.status(404).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token: token, userId:user.id, role:user.role });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = { registerUser, registerGymOwner, loginUser };