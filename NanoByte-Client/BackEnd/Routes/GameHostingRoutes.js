
const express = require('express');
const router = express.Router();
const GameHostingControllers = require('../Controllers/GameHostingControllers');

router.get('/', GameHostingControllers.gameServerPlanData);


module.exports = router;
