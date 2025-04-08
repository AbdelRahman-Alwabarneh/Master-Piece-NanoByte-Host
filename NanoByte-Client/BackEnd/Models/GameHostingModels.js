const mongoose = require("mongoose");

const gameServerSchema = new mongoose.Schema(
  {
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
    databases: {
      // عدد قواعد البيانات المتاحة
      type: Number,
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
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "GameHostingGroup",
    },
    groupName: {
      type: String,
      default: null,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "GameHosting",
  gameServerSchema,
  "GamesHosting"
);
