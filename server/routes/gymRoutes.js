const express = require('express');
const { fetchGyms, getGymAndClasses } = require('../controllers/gymController');

const router = express.Router();

router.get('/', fetchGyms);
router.get('/:gymId', getGymAndClasses);

module.exports = router;