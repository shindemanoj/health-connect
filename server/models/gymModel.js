const pool = require('../config/db');

const getGyms = async () => {
    const result = await pool.query('SELECT * FROM gyms');
    return result.rows;
};

module.exports = { getGyms };