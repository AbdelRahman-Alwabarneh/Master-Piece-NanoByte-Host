
const express = require('express');
const router = express.Router();
const ContactControllers = require('../Controllers/ContactControllers');

router.post('/', ContactControllers.GetContacts);
router.post('/:messageId', ContactControllers.updateAdminReplyAndSendEmail);


module.exports = router;
