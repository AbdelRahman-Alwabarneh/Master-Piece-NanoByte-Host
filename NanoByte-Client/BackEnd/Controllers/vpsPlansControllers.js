const vpsModels = require("../Models/vpsModels");

exports.vpsData = async (req, res) => {
  try {
    const vpsDataPlans = await vpsModels.find({
       isHidden: false,
    });

    res.status(200).json({ vpsDataPlans });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
