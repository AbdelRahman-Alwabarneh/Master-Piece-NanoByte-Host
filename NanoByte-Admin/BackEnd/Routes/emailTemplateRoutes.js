
const express = require('express');
const router = express.Router();
const EmailTemplateControllers = require('../Controllers/EmailTemplateControllers');

router.post('/', EmailTemplateControllers.createEmailTemplate);
router.post('/:id', EmailTemplateControllers.EmailTemplatesDetails);
router.get('/', EmailTemplateControllers.getEmailTemplates);
router.patch('/UpdateEmailTemplate/:EmailTemplateId', EmailTemplateControllers.UpdateEmailTemplate);
router.patch('/:id', EmailTemplateControllers.HiddenEmailTemplates);

module.exports = router;
