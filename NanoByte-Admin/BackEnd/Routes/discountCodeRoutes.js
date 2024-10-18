
const express = require('express');
const router = express.Router();
const discountCodeControllers = require('../Controllers/discountCodeControllers');

router.get('/', discountCodeControllers.DiscountCodeData);
router.get('/:id', discountCodeControllers.DiscountCodeDetails);
router.put('/:id', discountCodeControllers.updateDiscountCode);
router.post('/', discountCodeControllers.createDiscountCode);
router.patch('/:id', discountCodeControllers.HiddenDiscountCode);

module.exports = router;
