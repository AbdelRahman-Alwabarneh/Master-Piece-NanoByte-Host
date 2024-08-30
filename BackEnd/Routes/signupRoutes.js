
const express = require('express');
const router = express.Router();
const usersControllers = require('../Controllers/signupControllers');

router.post('/', usersControllers.createUser);

module.exports = router;
