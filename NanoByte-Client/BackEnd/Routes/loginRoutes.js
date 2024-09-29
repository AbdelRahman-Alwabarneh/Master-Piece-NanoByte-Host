
const express = require('express');
const router = express.Router();
const loginControllers = require('../Controllers/loginControllers');

router.post('/', loginControllers.login);

module.exports = router;
