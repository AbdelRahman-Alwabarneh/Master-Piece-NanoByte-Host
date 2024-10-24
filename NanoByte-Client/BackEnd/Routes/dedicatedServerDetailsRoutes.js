
const express = require('express');
const router = express.Router();
const dedicatedServerDetailsController = require('../Controllers/dedicatedServerDetailsController');

router.get('/:productLink', dedicatedServerDetailsController.DedicatedServerDetails);
router.post('/', dedicatedServerDetailsController.dedicatedServerQuantity);


module.exports = router;
