
const express = require('express');
const router = express.Router();
const vpsDetailsControllers = require('../Controllers/vpsDetailsControllers');

router.get('/:productLink', vpsDetailsControllers.vpsDetails);


module.exports = router;
