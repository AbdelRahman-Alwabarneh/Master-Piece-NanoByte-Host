
const express = require('express');
const router = express.Router();
const ContactControllers = require('../Controllers/ContactControllers');

router.post('/', ContactControllers.createContact);


module.exports = router;
