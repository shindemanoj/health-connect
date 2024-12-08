const express = require('express');
const { fetchGyms, getGymAndClasses } = require('../controllers/gymController');
const {authenticateRole} = require("../middleware/auth");

const router = express.Router();

router.get('/',  authenticateRole('customer'), fetchGyms);
router.get('/:gymId', getGymAndClasses);

module.exports = router;