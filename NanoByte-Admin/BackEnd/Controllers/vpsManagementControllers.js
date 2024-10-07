const VPSPlan = require("../Models/vpsModels");

exports.createVPSPlan = async (req, res) => {
  try {
    const { vpsData } = req.body;

    if (
      !vpsData.name ||
      !vpsData.ram ||
      !vpsData.processor ||
      !vpsData.storage ||
      !vpsData.connectionSpeed ||
      !vpsData.protection ||
      !vpsData.productLink
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVPSPlan = await VPSPlan.create({
      planName: vpsData.name,
      ram: vpsData.ram,
      cpu: vpsData.processor,
      storage: vpsData.storage,
      connectionSpeed: vpsData.connectionSpeed,
      security: vpsData.protection,
      subscriptionDurations: {
        oneMonth: { price: vpsData.prices.find(p => p.duration === 1)?.price || null },
        twoMonths: { price: vpsData.prices.find(p => p.duration === 2)?.price || null },
        threeMonths: { price: vpsData.prices.find(p => p.duration === 3)?.price || null },
        fourMonths: { price: vpsData.prices.find(p => p.duration === 4)?.price || null },
        fiveMonths: { price: vpsData.prices.find(p => p.duration === 5)?.price || null },
        sixMonths: { price: vpsData.prices.find(p => p.duration === 6)?.price || null },
      },
      quantity:vpsData.quantity || 0,
      isUnlimited:vpsData.isUnlimited,
      productLink:vpsData.productLink,
    });

    res
      .status(201)
      .json({ message: "VPSPlan created successfully", VPS: newVPSPlan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.VPSPlanSData = async (req, res) => {
  try {
    const VPSPlanData = await VPSPlan.find();

    res.status(200).json({ VPSPlanData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.VPSDetails= async (req, res) => {
  try {
    const VPSDetails = await VPSPlan.findById(req.params.id);

    res.status(200).json({ VPSDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


exports.updateVPSPlan = async (req, res) => {
  const { vpsData } = req.body;

  try {
    // Find VPS plan by ID
    const vpsPlan = await VPSPlan.findById(req.params.id); // تأكد من أن لديك نموذج VPS

    if (!vpsPlan) {
      return res.status(404).json({ message: "VPS plan not found" });
    }

    // Update the VPS plan properties
    vpsPlan.planName = vpsData.name || vpsPlan.planName;
    vpsPlan.ram = vpsData.ram || vpsPlan.ram;
    vpsPlan.cpu = vpsData.processor || vpsPlan.cpu;
    vpsPlan.storage = vpsData.storage || vpsPlan.storage;
    vpsPlan.connectionSpeed = vpsData.connectionSpeed || vpsPlan.connectionSpeed;
    vpsPlan.security = vpsData.protection || vpsPlan.security;
    vpsPlan.quantity = vpsData.quantity || vpsPlan.quantity;
    vpsPlan.isUnlimited = vpsData.isUnlimited;
    vpsPlan.productLink = vpsData.productLink || vpsPlan.productLink;

    // Update subscription durations
    const subscriptionDurations = ['oneMonth', 'twoMonths', 'threeMonths', 'fourMonths', 'fiveMonths', 'sixMonths'];

    subscriptionDurations.forEach(duration => {
      if (vpsData.subscriptionDurations[duration]) {
        vpsPlan.subscriptionDurations[duration] = {
          price: vpsData.subscriptionDurations[duration].price || vpsPlan.subscriptionDurations[duration].price,
        };
      }
    });

    // Save updated VPS plan
    await vpsPlan.save();

    res.status(200).json({ message: "VPS plan updated successfully", vpsPlan });
  } catch (error) {
    res.status(500).json({ message: "Error updating VPS plan", error });
  }
};

// Update VPSPlan status and send email
exports.HiddenVPSPlan = async (req, res) => {
  try {    
    const HiddenPlan = await VPSPlan.findById(req.params.id);
    if (!HiddenPlan) {
      return res.status(404).json({ message: 'VPS Plan not found' });
    }
    HiddenPlan.isHidden = !HiddenPlan.isHidden;
    await HiddenPlan.save();

    res.status(200).json({ message: 'Hidden VPS Plan successfully', HiddenPlan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};