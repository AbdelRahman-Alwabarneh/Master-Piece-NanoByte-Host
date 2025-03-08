const express = require("express");
const router = express.Router();
const GroupGameHostingControllers = require("../../Controllers/GameHosting_Controller/GroupGameHostingControllers");
const userIdMiddleware = require("../../Middlewares/userIdMiddleware");
router.get("/", userIdMiddleware, GroupGameHostingControllers.GroupsData);

module.exports = router;
