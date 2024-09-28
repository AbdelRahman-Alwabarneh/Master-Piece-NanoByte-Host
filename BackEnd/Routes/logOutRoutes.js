
const express = require('express');
const router = express.Router();
const logOutController = require('../Controllers/logOutController');
router.post('/', logOutController.LogOut);

module.exports = router;
