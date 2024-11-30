const express = require('express');
const { fetchGyms } = require('../controllers/gymController');

const router = express.Router();

router.get('/', fetchGyms);

module.exports = router;