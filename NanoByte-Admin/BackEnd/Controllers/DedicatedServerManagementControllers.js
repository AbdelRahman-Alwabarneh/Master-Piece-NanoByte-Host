const DedicatedServer = require('../Models/dedicatedServerModel'); // استدعاء الموديل

exports.createDedicatedServer = async (req, res) => {
  try {
    const { serverData } = req.body;

    if (
      !serverData.planTitle ||
      !serverData.secondaryTitle ||
      !serverData.planDescription ||
      !serverData.productLink
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDedicatedServer = await DedicatedServer.create({
      planTitle: serverData.planTitle,
      secondaryTitle: serverData.secondaryTitle,
      planDescription: serverData.planDescription,
      productLink: serverData.productLink,
      quantity: serverData.quantity || 0,
      isUnlimited: serverData.isUnlimited ?? true,
      isHidden: serverData.isHidden ?? false,
      subscriptionDurations: {
        oneMonth: { price: serverData.subscriptionDurations.oneMonth.price || null },
        twoMonths: { price: serverData.subscriptionDurations.twoMonths.price || null },
        threeMonths: { price: serverData.subscriptionDurations.threeMonths.price || null },
        fourMonths: { price: serverData.subscriptionDurations.fourMonths.price || null },
        fiveMonths: { price: serverData.subscriptionDurations.fiveMonths.price || null },
        sixMonths: { price: serverData.subscriptionDurations.sixMonths.price || null },
      },
    });

    res.status(201).json({
      message: "Dedicated Server Plan created successfully",
      server: newDedicatedServer,
    });
  } catch (error) {

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
    console.log({ message: "Internal server error", error: error.message });
  }
};

exports.DedicatedServerData = async (req, res) => {
    try {
      const DedicatedServerData = await DedicatedServer.find();
  
      res.status(200).json({ DedicatedServerData });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.DedicatedServerDetails= async (req, res) => {
    try {
      const DedicatedServerDetails = await DedicatedServer.findById(req.params.id);
  
      res.status(200).json({ DedicatedServerDetails });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  
  exports.updateDedicatedServer = async (req, res) => {
    try {
      const { id } = req.params; // نأخذ الـ id من الـ URL
      const { serverData } = req.body;
  
      if (
        !serverData.planTitle ||
        !serverData.secondaryTitle ||
        !serverData.planDescription ||
        !serverData.productLink
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const updatedServer = await DedicatedServer.findByIdAndUpdate(
        id, // تحديد الخطة باستخدام ID
        {
          planTitle: serverData.planTitle,
          secondaryTitle: serverData.secondaryTitle,
          planDescription: serverData.planDescription,
          productLink: serverData.productLink,
          quantity: serverData.quantity || 0,
          isUnlimited: serverData.isUnlimited ?? true,
          isHidden: serverData.isHidden ?? false,
          subscriptionDurations: {
            oneMonth: { price: serverData.subscriptionDurations.oneMonth.price || null },
            twoMonths: { price: serverData.subscriptionDurations.twoMonths.price || null },
            threeMonths: { price: serverData.subscriptionDurations.threeMonths.price || null },
            fourMonths: { price: serverData.subscriptionDurations.fourMonths.price || null },
            fiveMonths: { price: serverData.subscriptionDurations.fiveMonths.price || null },
            sixMonths: { price: serverData.subscriptionDurations.sixMonths.price || null },
          },
        },
        { new: true } // إرجاع الخطة بعد التحديث
      );
  
      if (!updatedServer) {
        return res.status(404).json({ message: "Server plan not found" });
      }
  
      res.status(200).json({
        message: "Dedicated Server Plan updated successfully",
        server: updatedServer,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
      console.log({ message: "Internal server error", error: error.message });
    }
  };
  

  exports.HiddenDedicatedServer = async (req, res) => {
    try {    
      const HiddenDedicated = await DedicatedServer.findById(req.params.id);
      if (!HiddenDedicated) {
        return res.status(404).json({ message: 'Dedicated Server not found' });
      }
      HiddenDedicated.isHidden = !HiddenDedicated.isHidden;
      await HiddenDedicated.save();
  
      res.status(200).json({ message: 'Hidden Dedicated Server successfully', HiddenDedicated });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };