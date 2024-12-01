const express = require('express');
const { bookClass } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', bookClass);

module.exports = router;