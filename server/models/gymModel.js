const pool = require('../config/db');

const getGyms = async () => {
    //const result = await pool.query('SELECT * FROM gyms');
    //return result.rows;
    return '{"gyms":{"name" : "test", "id": "1"}}';
};

module.exports = { getGyms };