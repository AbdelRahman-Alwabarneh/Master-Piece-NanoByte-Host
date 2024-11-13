const mongoose = require("mongoose");

const emailTemplateSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: true, // التأكد من أن الاسم مطلوب
  },
  senderName: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  emailSubject: {
    type: String,
    required: true,
  },
  emailBody: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true // تحديد ما إذا كان القالب مفعلًا أو لا
  }
}, {
  timestamps: true // إضافة تواريخ الإنشاء والتحديث التلقائية
});

module.exports = mongoose.model("EmailTemplate", emailTemplateSchema, "EmailTemplates");

