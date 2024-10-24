
const express = require('express');
const router = express.Router();
const discountCodeControllers = require('../Controllers/discountCodeControllers');
const userIdMiddleware = require('../Middlewares/userIdMiddleware');

router.post('/', userIdMiddleware,discountCodeControllers.DiscountCodeData);
router.post('/useDiscountCode', userIdMiddleware,discountCodeControllers.useDiscountCode);


module.exports = router;
