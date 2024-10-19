
const express = require('express');
const router = express.Router();
const invoicesControllers = require('../Controllers/invoicesControllers');
const authMiddleware = require('../Middlewares/authMiddleware');


router.get('/', authMiddleware,invoicesControllers.getPaymentsByUserId);
router.post('/:orderNumber', invoicesControllers.getPaymentByOrderNumber);

module.exports = router;
