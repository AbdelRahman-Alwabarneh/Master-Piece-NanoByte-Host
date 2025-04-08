const mongoose = require("mongoose");

const prerenderPageSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isHidden: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const PrerenderPage = mongoose.model("PrerenderPage", prerenderPageSchema, "PrerenderPages");

module.exports = PrerenderPage;