
const express = require('express');
const router = express.Router();
const userProfileControllers = require('../Controllers/userProfileControllers');

router.put("/", userProfileControllers.updateProfile);

module.exports = router;
