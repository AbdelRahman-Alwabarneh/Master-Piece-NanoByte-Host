
const express = require('express');
const router = express.Router();
const invoicesControllers = require('../Controllers/orderControllers');

router.post('/', invoicesControllers.PendingOrdersData);
router.post('/:orderNumber', invoicesControllers.getOrderByOrderNumber);

module.exports = router;
