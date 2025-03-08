
const express = require('express');
const router = express.Router();
const OrdersController = require('../../Controllers/Orders_Controller/OrdersController');
const authMiddleware = require('../../Middlewares/authMiddleware');

router.post('/', authMiddleware,OrdersController.createOrder);

module.exports = router;
