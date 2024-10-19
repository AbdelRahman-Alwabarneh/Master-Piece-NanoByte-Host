
const express = require('express');
const router = express.Router();
const PaymentController = require('../Controllers/PaymentController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/', authMiddleware,PaymentController.createPayment);

module.exports = router;
