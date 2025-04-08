
const express = require('express');
const router = express.Router();
const invoicesControllers = require('../../Controllers/Invoices_Controllers/invoicesControllers');
const authMiddleware = require('../../Middlewares/authMiddleware');
const authTokenParams = require('../../Middlewares/authTokenParams');


router.get('/', authMiddleware,invoicesControllers.getPaymentsByUserId);
router.get('/getPayments', authMiddleware,invoicesControllers.getPayments);
router.post('/:orderNumber', authMiddleware,invoicesControllers.getPaymentByOrderNumber);
router.post('/PrintInvoice/:orderNumber', authTokenParams,invoicesControllers.getPaymentByOrderNumberToPrintInvoice);

module.exports = router;
