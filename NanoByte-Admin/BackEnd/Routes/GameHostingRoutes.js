
const express = require('express');
const router = express.Router();
const GameHostingControllers = require('../Controllers/GameHostingControllers');

router.post('/', GameHostingControllers.createGameServerPlan);
router.get('/:id', GameHostingControllers.GameServerPlanDetails);
router.put('/:id', GameHostingControllers.updateGameHostingPlan);
router.patch('/:id', GameHostingControllers.HiddenGameHostingPlan);



module.exports = router;
