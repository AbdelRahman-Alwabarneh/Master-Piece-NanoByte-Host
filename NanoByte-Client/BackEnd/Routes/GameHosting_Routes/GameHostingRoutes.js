const express = require("express");
const router = express.Router();
const GameHostingControllers = require("../../Controllers/GameHosting_Controller/GameHostingControllers");
const userIdMiddleware = require("../../Middlewares/userIdMiddleware");
const authMiddleware = require("../../Middlewares/authMiddleware");

router.get("/:productLink", GameHostingControllers.gameServerPlanDetails);
router.post('/:productLink/:duration', authMiddleware,GameHostingControllers.gameServerDetailsPayment);
router.post('/', authMiddleware,GameHostingControllers.gameServerPlanQuantity);
router.post('/checkServiceAvailability', userIdMiddleware,GameHostingControllers.checkServiceAvailability);

module.exports = router;
