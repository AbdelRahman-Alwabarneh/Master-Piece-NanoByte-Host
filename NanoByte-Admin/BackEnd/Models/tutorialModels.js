const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    visibleToRegisteredOnly: {
      type: Boolean,
      default: false,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Group",
    },
    groupName: {
      type: String,
      default: null,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    Link: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema, "Tutorials");

module.exports = Tutorial;
