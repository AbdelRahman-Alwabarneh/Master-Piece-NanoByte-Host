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
  users: [
    {
      type: mongoose.Schema.Types.ObjectId, // مصفوفة من معرفات المستخدمين
      ref: "User", // الربط بجدول المستخدمين
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.model("Group", groupSchema, "Groups");
module.exports = Group;
