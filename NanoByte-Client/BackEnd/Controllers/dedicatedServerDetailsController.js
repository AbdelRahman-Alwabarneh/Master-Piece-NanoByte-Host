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
