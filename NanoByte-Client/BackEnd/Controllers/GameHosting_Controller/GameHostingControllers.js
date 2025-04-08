const GameHosting = require("../../Models/GameHostingModels");

exports.gameServerPlanDetails = async (req, res) => {
  try {
    const serviceDetailsPlan = await GameHosting.findOne({
      productLink: req.params.productLink,
      isHidden: false,
    }).select(
      "subscriptionDurations planName ram cpu storage connectionSpeed security databases productLink groupName setupFee"
    );;

    res.status(200).json({ serviceDetailsPlan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.gameServerDetailsPayment = async (req, res) => {
  const { duration } = req.params;
  try {
    const serviceDetailsPlan = await GameHosting
      .findOne({
        productLink: req.params.productLink,
        isHidden: false,
      })
      .select(`subscriptionDurations.${duration}.price planName setupFee`);
    res.status(200).json({ serviceDetailsPlan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.gameServerPlanQuantity = async (req, res) => {
  const { Product_Link } = req.body;

  if (!Product_Link) {
    return res.status(400).json({ error: "Invalid Product Link" });
  }

  try {
    const gameServerDetailsPlan = await GameHosting.findOne({
      productLink: Product_Link,
    }).select("quantity isUnlimited");;

    if (!gameServerDetailsPlan) {
      return res.status(404).json({ error: "VPS plan not found" });
    }

    if (!gameServerDetailsPlan.isUnlimited && gameServerDetailsPlan.quantity > 0) {
      gameServerDetailsPlan.quantity -= 1;
      await gameServerDetailsPlan.save();
    }

    res.status(200).json("Quantity has been modified");
  } catch (error) {
    console.error("Error while updating game Server plan quantity:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.checkServiceAvailability = async (req, res) => {
  const { Product_Link } = req.body;

  if (!Product_Link) {
    return res.status(400).json({ error: "Invalid Product Link" });
  }

  try {
    const gameServerDetailsPlan = await GameHosting.findOne({
      productLink: Product_Link,
    }).select("quantity isUnlimited isHidden groupId").populate("groupId", "isVisible users");

    if (!gameServerDetailsPlan) {
      return res.status(404).json({ error: "Game Server plan not found" });
    }

    if(gameServerDetailsPlan.isHidden){
      return res.status(400).json({ error: "This product is not available" });
    }

    if (!gameServerDetailsPlan.isUnlimited && gameServerDetailsPlan.quantity <= 0) {
        return res.status(400).json({ error: "Out of stock" });
    }
    const group = gameServerDetailsPlan.groupId;
    if (!group || !group.isVisible) {
      return res.status(400).json({ error: "This product is not available" });
    }
    const groupUsers = group.users; 
    const currentUserId = req.user?.id;
    if (groupUsers.length > 0) {
      if (!currentUserId || !groupUsers.includes(currentUserId)) {
        return res.status(400).json({ error: "This product is not available" });
      }
    }
    res.status(200).json("Available");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

