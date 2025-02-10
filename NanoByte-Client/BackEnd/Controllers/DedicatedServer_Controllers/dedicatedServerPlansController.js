const DedicatedServer = require("../../Models/dedicatedServerModel");

exports.DedicatedServerData = async (req, res) => {
  try {
    const DedicatedServerDataPlans = await DedicatedServer.find({
      isHidden: false,
    }).select(
      "planTitle subscriptionDurations.oneMonth secondaryTitle quantity isUnlimited planDescription productLink"
    );

    res.status(200).json({ DedicatedServerDataPlans });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
