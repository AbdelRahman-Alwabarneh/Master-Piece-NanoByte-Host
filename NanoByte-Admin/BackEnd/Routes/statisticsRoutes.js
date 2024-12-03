
const express = require('express');
const router = express.Router();
const statisticsControllers = require('../Controllers/statisticsControllers');

router.post('/count', statisticsControllers.getStatistics);

module.exports = router;
