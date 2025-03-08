const vpsModels = require("../../Models/vpsModels");

exports.vpsDetails = async (req, res) => {
  try {
    const serviceDetailsPlan = await vpsModels
      .findOne({
        productLink: req.params.productLink,
      })
      .select(
        "subscriptionDurations planName ram cpu storage connectionSpeed security productLink groupName setupFee"
      );

    res.status(200).json({ serviceDetailsPlan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.vpsDetailsPayment = async (req, res) => {
  const { duration } = req.params;
  try {
    const serviceDetailsPlan = await vpsModels
      .findOne({
        productLink: req.params.productLink,
      })
      .select(`subscriptionDurations.${duration}.price planName setupFee`);

    res.status(200).json({ serviceDetailsPlan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.vpsPlanQuantity = async (req, res) => {
  const { Product_Link } = req.body;

  if (!Product_Link) {
    return res.status(400).json({ error: "Invalid Product Link" });
  }

  try {
    const vpsDetailsPlan = await vpsModels.findOne({
      productLink: Product_Link,
    });

    if (!vpsDetailsPlan) {
      return res.status(404).json({ error: "VPS plan not found" });
    }

    if (!vpsDetailsPlan.isUnlimited && vpsDetailsPlan.quantity > 0) {
      vpsDetailsPlan.quantity -= 1;
      await vpsDetailsPlan.save();
    }

    res.status(200).json({ vpsDetailsPlan });
  } catch (error) {
    console.error("Error while updating VPS plan quantity:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
