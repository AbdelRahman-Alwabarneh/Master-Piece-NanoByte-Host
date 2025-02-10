const vpsModels = require("../../Models/vpsModels");

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

exports.vpsPlanQuantity = async (req, res) => {
  const { productLink } = req.body;
  if (!productLink) {
    return res.status(400).json({ error: "Invalid Product Link" });
  }

  try {
    const vpsDetailsPlan = await vpsModels.findOne({ productLink });

    if (!vpsDetailsPlan) {
      return res.status(404).json({ error: "VPS plan not found" });
    }

    if (!vpsDetailsPlan.isUnlimited && vpsDetailsPlan.quantity > 0) {
      vpsDetailsPlan.quantity -= 1;

      await vpsDetailsPlan.save();
    }

    res.status(200).json({ vpsDetailsPlan });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
