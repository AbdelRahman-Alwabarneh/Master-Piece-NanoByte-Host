
const express = require('express');
const router = express.Router();
const discountCodeControllers = require('../../Controllers/DiscountCode_Controllers/discountCodeControllers');
const useDiscountCodeControllers = require('../../Controllers/DiscountCode_Controllers/useDiscountCode');
const userIdMiddleware = require('../../Middlewares/userIdMiddleware');

router.post('/', userIdMiddleware,discountCodeControllers.DiscountCodeData);
router.post('/useDiscountCode', userIdMiddleware,useDiscountCodeControllers.useDiscountCode);


module.exports = router;
