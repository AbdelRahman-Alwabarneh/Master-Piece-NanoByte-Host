const allUserData = require("../Models/usersModels");

exports.UserData = async (req, res) => {
  try {
    const UsersData = await allUserData.find({
      isBanned: false,
      _id: req.user.id,
    });

    res.status(200).json({ UsersData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
