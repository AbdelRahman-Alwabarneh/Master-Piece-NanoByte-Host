const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
    },
    purchasePrice: {
      oneYear: { type: Number, required: true },
      twoYears: { type: Number },
      threeYears: { type: Number },
    },
    renewalPrice: {
      oneYear: { type: Number, required: true },
      twoYears: { type: Number },
      threeYears: { type: Number },
    },
    transferPrice: {
      oneYear: { type: Number, required: true },
      twoYears: { type: Number },
      threeYears: { type: Number },
    },
    setupFee: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("DomainService", domainSchema,"DomainServices");
