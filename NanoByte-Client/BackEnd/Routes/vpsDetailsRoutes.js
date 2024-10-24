
const express = require('express');
const router = express.Router();
const vpsDetailsControllers = require('../Controllers/vpsDetailsControllers');

router.get('/:productLink', vpsDetailsControllers.vpsDetails);
router.post('/', vpsDetailsControllers.vpsPlanQuantity);


module.exports = router;
