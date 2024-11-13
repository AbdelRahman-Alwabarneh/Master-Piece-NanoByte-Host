const EmailTemplate = require('../Models/emailTemplate');

exports.createEmailTemplate = async (req, res) => {
  try {
    const { templateName, senderName, senderEmail, emailSubject, emailBody, isActive } = req.body;

    // التحقق من الحقول المطلوبة
    if (!templateName || !senderName || !senderEmail || !emailSubject || !emailBody) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // إنشاء قالب البريد الإلكتروني الجديد
    const newTemplate = await EmailTemplate.create({
      templateName,
      senderName,
      senderEmail,
      emailSubject,
      emailBody,
      isActive: isActive || false // التأكد من أن isActive لديها قيمة افتراضية false إذا لم تُرسل
    });

    res.status(201).json({ message: "Email template created successfully", template: newTemplate });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
    console.error({ message: "Internal server error", error: error.message });
  }
};

exports.getEmailTemplates = async (req, res) => {
  try {
    // جلب فقط الحقول المطلوبة من قاعدة البيانات
    const emailTemplates = await EmailTemplate.find().select('templateName senderName senderEmail emailSubject isActive');

    res.status(200).json({ emailTemplates });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
    console.error({ message: "Internal server error", error: error.message });
  }
};

exports.EmailTemplatesDetails = async (req, res) => {
    try {
      const EmailTemplatesDetails = await EmailTemplate.findById(req.params.id);
  
      res.status(200).json({ EmailTemplatesDetails });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

exports.HiddenEmailTemplates = async (req, res) => {
    try {    
      const HiddenEmailTemplate = await EmailTemplate.findById(req.params.id);
      if (!HiddenEmailTemplate) {
        return res.status(404).json({ message: 'Email Templates not found' });
      }
      HiddenEmailTemplate.isActive = !HiddenEmailTemplate.isActive;
      await HiddenEmailTemplate.save();
  
      res.status(200).json({ message: 'Hidden Email Templates successfully', HiddenEmailTemplate });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.UpdateEmailTemplate = async (req, res) => {
    const {
        templateName,
        senderName,
        senderEmail,
        emailSubject,
        emailBody,
        isActive,
    } = req.body;
    console.log(templateName);
    
    try {
      // Find Email Template by ID
      const EmailTemplateUpdate = await EmailTemplate.findById(req.params.EmailTemplateId);
  
      if (!EmailTemplateUpdate) {
        return res.status(404).json({ message: "Email Template not found" });
      }
      
      // Update fields individually
      if (req.body.hasOwnProperty("templateName")) EmailTemplateUpdate.templateName = templateName;
      if (req.body.hasOwnProperty("senderName")) EmailTemplateUpdate.senderName = senderName;
      if (req.body.hasOwnProperty("senderEmail")) EmailTemplateUpdate.senderEmail = senderEmail;
      if (req.body.hasOwnProperty("emailSubject")) EmailTemplateUpdate.emailSubject = emailSubject;
      if (req.body.hasOwnProperty("emailBody")) EmailTemplateUpdate.emailBody = emailBody;
      if (req.body.hasOwnProperty("isActive")) EmailTemplateUpdate.isActive = isActive;
   
      // Save the updated Email TemplateId
      await EmailTemplateUpdate.save();
  
      res.status(200).json({
        message: "Email Template updated successfully",
        EmailTemplateUpdate,
      });
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({
        message: "Failed to update Email Template",
        error: error.message,
      });
    }
  };
  