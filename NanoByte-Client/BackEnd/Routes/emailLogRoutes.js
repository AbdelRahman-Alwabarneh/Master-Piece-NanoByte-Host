
const express = require('express');
const router = express.Router();
const emailLogControllers = require('../Controllers/emailLogControllers');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/', authMiddleware,emailLogControllers.emailLogData);
router.post('/logId/:logEmailId', emailLogControllers.emailLogDataDetails);


module.exports = router;
