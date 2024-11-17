
const express = require('express');
const router = express.Router();
const usersControllers = require('../Controllers/tutorialGroupControllers');
const userIdMiddleware = require('../Middlewares/userIdMiddleware');

router.post('/', userIdMiddleware,usersControllers.GetTutorialGroup);
router.post('/:Link', userIdMiddleware,usersControllers.GetTutorialAndTutorialGroup);

module.exports = router;
