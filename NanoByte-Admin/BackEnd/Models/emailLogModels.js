const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  emailSubject: {
    type: String,
    required: true,
  },
  emailBody: {
    type: String,
    required: true,
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
  }
}, {
  timestamps: true // إضافة تواريخ الإنشاء والتحديث التلقائية
});

module.exports = mongoose.model("EmailLog", emailLogSchema, "EmailLogs");
