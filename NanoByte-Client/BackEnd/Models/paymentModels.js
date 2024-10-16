const mongoose = require('mongoose');

// تعريف سكيما الدفع
const paymentSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true, 
  },
  paymentMethod: {
    type: String,
    enum: ['Visa', 'PayPal'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Cancelled','Refound'], // حالات الدفع
    default: 'Pending',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
},{ timestamps: true });


module.exports = mongoose.model('Payment', paymentSchema, 'Payments');

