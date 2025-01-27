const mongoose = require("mongoose");

const RenewalInvoiceSchema = new mongoose.Schema(
  {
    mainOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainOrder",
      required: true,
    },
    Subscriptionduration: {
      type: String,
      enum: [
        "شهر واحد",
        "شهرين",
        "ثلاثة أشهر",
        "أربعة أشهر",
        "خمسة أشهر",
        "ستة أشهر",
      ],
      required: true,
    },
    renewalFee: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Cancelled", "Refound"],
      default: "Pending",
      required: true,
    },
    InvoiceStatus: {
      type: String,
      enum: ["Pending", "Active", "Cancelled", "Fraud"], // حالات الطلب
      default: "Pending",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Visa / MasterCard", "PayPal"],
      required: true,
    },
    discountCode: {
      type: String,
    },
    InvoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    isRenewal: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RenewalInvoice",
  RenewalInvoiceSchema,
  "RenewalInvoices"
);
