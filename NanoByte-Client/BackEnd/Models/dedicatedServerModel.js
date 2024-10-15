const mongoose = require('mongoose');

const DedicatedServerSchema = new mongoose.Schema({
  planTitle: { 
    type: String, 
    required: true 
  },
  secondaryTitle: { 
    type: String, 
    required: true 
  },
  subscriptionDurations: {
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
  quantity: {
    type: Number,
    default: null,
  },
  isUnlimited: { 
    type: Boolean, 
    default: true 
  },
  planDescription: { 
    type: String, 
    required: true 
  },
  isHidden: { 
    type: Boolean, 
    default: false 
  },
  productLink: { 
    type: String, 
    required: true, 
    unique: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('DedicatedServer', DedicatedServerSchema,'DedicatedServers');
