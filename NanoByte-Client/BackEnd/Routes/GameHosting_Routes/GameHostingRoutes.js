const express = require("express");
const router = express.Router();
const GameHostingControllers = require("../../Controllers/GameHosting_Controller/GameHostingControllers");

router.get("/", GameHostingControllers.gameServerPlanData);

module.exports = router;
