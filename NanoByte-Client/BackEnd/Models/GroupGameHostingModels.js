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
      ref: "GameHosting",
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

const Group = mongoose.model("GameHostingGroup", groupSchema, "GameHostingGroups");
module.exports = Group;
