const mongoose = require("mongoose");

// تعريف سكيما الدفع
const OrdersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    Servicetype: {
      type: String,
      enum: ['VPS', 'DedicatedServer'],
      required: true,
    },
    Subscriptionduration: {
      type: String,
      enum: ["شهر واحد", "شهرين", "ثلاثة أشهر", "أربعة أشهر", "خمسة أشهر", "ستة أشهر"],
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Visa", "PayPal"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Cancelled", "Refound"], // حالات الدفع
      default: "Pending",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Active", "Cancelled", "Fraud"], // حالات الطلب
      default: "Pending",
      required: true,
    },
    discountCode: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    renewalFee: {
      type: Number,
      required: true,
      min: 0,
    },
    nextPaymentDate: {
      type: Date,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    vpsId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "VPS", 
      required: function() {
        return this.serviceType === 'VPS';
      },
    },
    dedicatedServerId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "DedicatedServer", 
      required: function() {
        return this.serviceType === 'DedicatedServer'; 
      },
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrdersSchema, "Orders");
