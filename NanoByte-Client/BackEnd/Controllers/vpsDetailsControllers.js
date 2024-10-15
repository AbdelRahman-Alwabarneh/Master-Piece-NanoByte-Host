const vpsModels = require("../Models/vpsModels");

exports.vpsDetails = async (req, res) => {
  try {
    
    const vpsDetailsPlan = await vpsModels.findOne({
        productLink: req.params.productLink,
    });

    res.status(200).json({ vpsDetailsPlan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
