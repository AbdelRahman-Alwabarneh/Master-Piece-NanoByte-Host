const express = require("express");
const router = express.Router();
const vpsGroupControllers = require("../Controllers/VPS_Controllers/vpsGroupControllers");
const userIdMiddleware = require("../Middlewares/userIdMiddleware");
router.get("/", userIdMiddleware, vpsGroupControllers.GroupsData);

module.exports = router;
