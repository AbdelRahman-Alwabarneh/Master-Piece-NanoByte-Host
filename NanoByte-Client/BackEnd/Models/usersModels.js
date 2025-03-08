const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  usernameDiscord: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  companyName: {
    type: String,
    default: null,
  },
  streetAddress: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  profileImage: {
    type: String,
    default: "https://test.nanobyte.host/assets/userImg-DbP5HJok.png",
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    trim: true,
  },
  discordId: {
    type: String,
    trim: true,
  },
  githubId: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", usersSchema, "Users");
