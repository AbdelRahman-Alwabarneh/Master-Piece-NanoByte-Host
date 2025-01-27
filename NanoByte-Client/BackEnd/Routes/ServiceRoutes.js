
const express = require('express');
const router = express.Router();
const ServiceControllers = require('../Controllers/ServiceControllers');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/', authMiddleware,ServiceControllers.createService);
router.post('/AllServiceUser', authMiddleware,ServiceControllers.getServiceByUserId);
router.post('/Controlpanel/:id/:OrderNumber',ServiceControllers.getServiceByUserIdAndOrder);
router.post('/ServiceUser/:serviceType', authMiddleware,ServiceControllers.getServiceByUserIdAndType);

module.exports = router;
