
const express = require('express');
const router = express.Router();
const invoicesControllers = require('../Controllers/orderControllers');

router.post('/Status/:orderStatus', invoicesControllers.OrdersData);
router.post('/:orderNumber', invoicesControllers.getOrderByOrderNumber);
router.patch('/:orderNumber', invoicesControllers.updateOrderStatusByOrderNumber);

module.exports = router;
