const User = require("../Models/usersModels");
const bcrypt = require("bcrypt");
exports.updateProfile = async (req, res) => {
  const { Data } = req.body;

  try {
    // Find user by ID
    const user = await User.findOne({ email: Data.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    (user.firstName = Data.firstName),
      (user.lastName = Data.lastName),
      (user.usernameDiscord = Data.discordUsername),
      (user.email = Data.email),
      (user.phoneNumber = Data.phoneNumber),
      (user.companyName = Data.companyName),
      (user.streetAddress = Data.streetAddress),
      (user.city = Data.city),
      (user.country = Data.country),
      (user.profileImage = Data.profileImage);

    // // Hash new password if provided
    if (Data.confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Data.confirmPassword, salt);
      user.password = hashedPassword;
    }

    // Save updated user
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};
