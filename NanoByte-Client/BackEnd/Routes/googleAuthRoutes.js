
const express = require('express');
const router = express.Router();
const RegistrGoogle = require('../Controllers/googleAuthControllers');

router.post('/', RegistrGoogle.googleAuth);

module.exports = router;
