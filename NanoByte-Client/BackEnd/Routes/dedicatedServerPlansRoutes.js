const express = require("express");
const router = express.Router();
const dedicatedServerPlansController = require("../Controllers/DedicatedServer_Controllers/dedicatedServerPlansController");

router.get("/", dedicatedServerPlansController.DedicatedServerData);

module.exports = router;
