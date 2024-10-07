const mongoose = require("mongoose");

const vpsSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  cpu: {
    type: String,
    required: true,
  },
  storage: {
    type: String,
    required: true,
  },
  connectionSpeed: {
    type: String,
    required: true,
  },
  security: {
    type: String,
    required: true,
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
    type: Number, // لدعم الأرقام أو الكميات اللانهائية (null)
    default: null,
  },
  isUnlimited: {
    type: Boolean,
    default: true,
  },
  productLink: {
    type: String,
    unique: true,
    required: true,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true, // تحديد الفئة مثل "Intel" أو "AMD"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VPS", vpsSchema, "VPS_Plans");
