const DedicatedServer = require("../../Models/dedicatedServerModel");

exports.DedicatedServerDetails = async (req, res) => {
  try {
    const serviceDetailsPlan = await DedicatedServer.findOne({
      productLink: req.params.productLink,
      isHidden: false,
    });

    res.status(200).json({ serviceDetailsPlan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.DedicatedServerDetailsPayment = async (req, res) => {
  const { duration } = req.params;
  try {
    const serviceDetailsPlan = await DedicatedServer.findOne({
      productLink: req.params.productLink,
      isHidden: false,
    }).select(`subscriptionDurations.${duration}.price planTitle setupFee`);;

    res.status(200).json({ serviceDetailsPlan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.dedicatedServerQuantity = async (req, res) => {
  const { Product_Link } = req.body;
  if (!Product_Link) {
    return res.status(400).json({ error: "Invalid Product Link" });
  }

  try {
    const dedicatedServer = await DedicatedServer.findOne({ productLink: Product_Link });

    if (!dedicatedServer) {
      return res.status(404).json({ error: "Dedicated server not found" });
    }

    if (!dedicatedServer.isUnlimited && dedicatedServer.quantity > 0) {
      dedicatedServer.quantity -= 1;
      await dedicatedServer.save();
    }

    res.status(200).json({ dedicatedServer });
  } catch (error) {
    console.error("Error while updating dedicated server quantity:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
