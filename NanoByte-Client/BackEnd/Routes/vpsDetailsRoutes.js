
const express = require('express');
const router = express.Router();
const vpsDetailsControllers = require('../Controllers/VPS_Controllers/vpsDetailsControllers');

router.get('/:productLink', vpsDetailsControllers.vpsDetails);
router.post('/:productLink/:duration', vpsDetailsControllers.vpsDetailsPayment);
router.post('/', vpsDetailsControllers.vpsPlanQuantity);


module.exports = router;
