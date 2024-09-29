
const express = require('express');
const router = express.Router();
const userDataController = require('../Controllers/userDataController');
const authMiddleware = require('../Middlewares/authMiddleware');
router.get('/', authMiddleware,userDataController.UserData);


module.exports = router;
