
const express = require('express');
const router = express.Router();
const invoicesControllers = require('../Controllers/orderControllers');

router.post('/Status/:orderStatus', invoicesControllers.OrdersData);
router.post('/:orderNumber', invoicesControllers.getOrderByOrderNumber);
router.post('/UserOrders/:userId', invoicesControllers.getOrdersByUserId);
router.patch('/:orderNumber', invoicesControllers.updateOrderStatusByOrderNumber);
router.patch('/updateOrder/:orderNumber', invoicesControllers.updateOrder);

module.exports = router;
