
const express = require('express');
const router = express.Router();
const vpsDetailsControllers = require('../../Controllers/VPS_Controllers/vpsDetailsControllers');
const userIdMiddleware = require("../../Middlewares/userIdMiddleware");
const authMiddleware = require("../../Middlewares/authMiddleware");

router.get('/:productLink', vpsDetailsControllers.vpsDetails);
router.post('/:productLink/:duration', authMiddleware,vpsDetailsControllers.vpsDetailsPayment);
router.post('/', authMiddleware,vpsDetailsControllers.vpsPlanQuantity);
router.post('/checkServiceAvailability', userIdMiddleware,vpsDetailsControllers.checkServiceAvailability);


module.exports = router;
