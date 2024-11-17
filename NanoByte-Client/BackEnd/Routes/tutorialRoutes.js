
const express = require('express');
const router = express.Router();
const tutorialControllers = require('../Controllers/tutorialControllers');
const userIdMiddleware = require('../Middlewares/userIdMiddleware');

router.post('/:Link', userIdMiddleware,tutorialControllers.GetTutorialByLink);

module.exports = router;
