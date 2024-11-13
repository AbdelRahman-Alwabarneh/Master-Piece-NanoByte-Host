const mongoose = require('mongoose');

const WebsiteHostingSchema = new mongoose.Schema({
  planName: { 
    type: String, 
    required: true 
  },
  subtitle: { 
    type: String, 
    required: true 
  },
  subscriptionOptions: {
    oneMonth: {
      price: { type: Number, required: true },
      enabled: { type: Boolean, default: true },
    },
    twoMonths: {
      price: { type: Number },
      enabled: { type: Boolean, default: true },
    },
    threeMonths: {
      price: { type: Number },
      enabled: { type: Boolean, default: true },
    },
    fourMonths: {
      price: { type: Number },
      enabled: { type: Boolean, default: true },
    },
    fiveMonths: {
      price: { type: Number },
      enabled: { type: Boolean, default: true },
    },
    sixMonths: {
      price: { type: Number },
      enabled: { type: Boolean, default: true },
    },
  },
  setupCost: {
    type: Number, 
    default: 0,
  },
  availableQuantity: {
    type: Number,
    default: null,
  },
  unlimited: { 
    type: Boolean, 
    default: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  hidden: { 
    type: Boolean, 
    default: false 
  },
  link: { 
    type: String, 
    required: true, 
    unique: true 
  },
  operatingSystem: { 
    type: String, 
    enum: ['Linux', 'Windows'], 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('WebsiteHosting', WebsiteHostingSchema, 'WebsiteHostingPlans');
