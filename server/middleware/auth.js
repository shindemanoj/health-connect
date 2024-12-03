const jwt = require('jsonwebtoken');

// Middleware to authenticate role
const authenticateRole = (requiredRole) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const role = req.headers.role;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (role !== requiredRole) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { authenticateRole };