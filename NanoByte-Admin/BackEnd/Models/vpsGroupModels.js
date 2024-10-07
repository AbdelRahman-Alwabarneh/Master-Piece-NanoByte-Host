const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  plans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VPS",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId, // لتحديد المجموعة بناءً على المستخدم
    ref: "User", // الربط بجدول المستخدمين
    default: null, // إذا كانت null، ستكون المجموعة مرئية للجميع
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.model("Group", groupSchema, "Groups");
module.exports = Group;
