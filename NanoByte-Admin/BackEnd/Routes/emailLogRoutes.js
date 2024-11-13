
const express = require('express');
const router = express.Router();
const emailLogControllers = require('../Controllers/emailLogControllers');

router.post('/:userId', emailLogControllers.emailLogData);
router.post('/logId/:logEmailId', emailLogControllers.emailLogDataDetails);


module.exports = router;
