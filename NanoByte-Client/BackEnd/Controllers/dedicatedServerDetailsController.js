const DedicatedServer = require("../Models/dedicatedServerModel");

exports.DedicatedServerDetails = async (req, res) => {
  try {
    
    const DedicatedServerDetails = await DedicatedServer.findOne({
        productLink: req.params.productLink,
        isHidden: false,
    });

    res.status(200).json({ DedicatedServerDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.dedicatedServerQuantity = async (req, res) => {
  const { productLink } = req.body;
  if (!productLink) {
    return res.status(400).json({ error: "Invalid Product Link" });
  }

  try {
    const dedicatedServer = await DedicatedServer.findOne({ productLink });

    if (!dedicatedServer) {
      return res.status(404).json({ error: "Dedicated server not found" });
    }

    if (!dedicatedServer.isUnlimited && dedicatedServer.quantity > 0) {
      dedicatedServer.quantity -= 1;

      await dedicatedServer.save();
    }

    res.status(200).json({ dedicatedServer });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
