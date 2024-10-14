
const express = require('express');
const router = express.Router();
const vpsPlansControllers = require('../Controllers/vpsPlansControllers');

router.get('/', vpsPlansControllers.vpsData);


module.exports = router;
