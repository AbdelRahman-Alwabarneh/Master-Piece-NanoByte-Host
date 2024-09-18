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
    type: Number,
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
    default:
      "https://cdn.discordapp.com/attachments/1250078577219600477/1282784975699181588/userImg.png?ex=66e09e1b&is=66df4c9b&hm=abe5fc2fa807935338710e8449ff4adb3c9526291e121b706fab910bbad08edc&",
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
