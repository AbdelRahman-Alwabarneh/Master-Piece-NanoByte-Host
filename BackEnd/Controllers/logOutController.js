exports.LogOut = async (req, res) => {
  try {
    res.clearCookie("authToken");

    res.status(200).json({ message: "You have successfully logged out" });
  } catch (err) {
    console.error("Error in logged out:", err.message);
  }
};
