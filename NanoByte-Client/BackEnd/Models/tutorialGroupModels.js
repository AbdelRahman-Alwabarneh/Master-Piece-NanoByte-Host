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
  visibleToRegisteredOnly: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  Link: {
    type: String,
    unique: true,
    required: true,
  },
  Tutorial: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
    },
  ],
},{ timestamps: true });

const Group = mongoose.model("TutorialGroup", groupSchema, "TutorialGroups");
module.exports = Group;
