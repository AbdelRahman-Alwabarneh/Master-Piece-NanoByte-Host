
const express = require('express');
const router = express.Router();
const ServiceControllers = require('../Controllers/ServiceControllers');

router.patch('/:serviceId', ServiceControllers.updateService);
router.post('/getService/:userId/:OrderNumber', ServiceControllers.getServiceByUserIdAndOrderNumber);
router.post('/:userId', ServiceControllers.getLastServiceByUserId);
router.post('/AllServices/:userId', ServiceControllers.getAllServicesByUserId);


module.exports = router;
