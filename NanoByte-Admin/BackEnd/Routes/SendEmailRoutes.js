
const express = require('express');
const router = express.Router();
const sendEmailControllers = require('../Controllers/sendEmailControllers');

router.post('/', sendEmailControllers.sendEmail);


module.exports = router;
