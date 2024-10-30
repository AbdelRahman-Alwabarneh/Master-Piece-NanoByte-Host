
const express = require('express');
const router = express.Router();
const ServiceControllers = require('../Controllers/ServiceControllers');

router.patch('/:serviceId', ServiceControllers.updateService);
router.post('/getService/:userId/:OrderNumber', ServiceControllers.getServiceByUserIdAndOrderNumber);

module.exports = router;
