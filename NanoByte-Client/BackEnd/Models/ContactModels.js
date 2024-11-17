const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    
    },
    adminReply: {
      type: String,
      default: '', // الرد الافتراضي يكون فارغ
  
    },
    status: {
      type: String,
      enum: ['قيد الانتظار', 'تم الرد'],
      default: 'قيد الانتظار',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema, 'Contacts');
