
const express = require('express');
const router = express.Router();
const dedicatedServerDetailsController = require('../Controllers/dedicatedServerDetailsController');

router.get('/:productLink', dedicatedServerDetailsController.DedicatedServerDetails);


module.exports = router;
