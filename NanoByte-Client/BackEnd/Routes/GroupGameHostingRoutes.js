
const express = require('express');
const router = express.Router();
const GroupGameHostingControllers = require('../Controllers/GroupGameHostingControllers');
const userIdMiddleware = require('../Middlewares/userIdMiddleware');
router.get('/', userIdMiddleware,GroupGameHostingControllers.GroupsData);


module.exports = router;
