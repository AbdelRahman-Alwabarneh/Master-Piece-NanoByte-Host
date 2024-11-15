const WebsiteHosting = require("../Models/WebsiteHostingModels");


exports.createWebsiteHostingPlan = async (req, res) => {
    try {
      const { hostingData } = req.body;
  
      if (
        !hostingData.planName ||
        !hostingData.subtitle ||
        !hostingData.description ||
        !hostingData.link 
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newWebsiteHosting = await WebsiteHosting.create({
        planName: hostingData.planName,
        subtitle: hostingData.subtitle,
        description: hostingData.description,
        link: hostingData.link,
        setupCost: hostingData.setupCost || 0,
        availableQuantity: hostingData.availableQuantity || 0,
        unlimited: hostingData.unlimited ?? true,
        hidden: hostingData.hidden ?? false,
        subscriptionOptions: {
          oneMonth: { 
            price: hostingData.subscriptionOptions.oneMonth.price || null,
            enabled: hostingData.subscriptionOptions.oneMonth.enabled ?? true,
          },
          twoMonths: { 
            price: hostingData.subscriptionOptions.twoMonths.price || null,
            enabled: hostingData.subscriptionOptions.twoMonths.enabled ?? true,
          },
          threeMonths: { 
            price: hostingData.subscriptionOptions.threeMonths.price || null,
            enabled: hostingData.subscriptionOptions.threeMonths.enabled ?? true,
          },
          fourMonths: { 
            price: hostingData.subscriptionOptions.fourMonths.price || null,
            enabled: hostingData.subscriptionOptions.fourMonths.enabled ?? true,
          },
          fiveMonths: { 
            price: hostingData.subscriptionOptions.fiveMonths.price || null,
            enabled: hostingData.subscriptionOptions.fiveMonths.enabled ?? true,
          },
          sixMonths: { 
            price: hostingData.subscriptionOptions.sixMonths.price || null,
            enabled: hostingData.subscriptionOptions.sixMonths.enabled ?? true,
          },
        },
      });
  
      res.status(201).json({
        message: "Website Hosting Plan created successfully",
        server: newWebsiteHosting,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
      console.log({ message: "Internal server error", error: error.message });
    }
  };
  
  exports.WebsiteHostingPlanDetails= async (req, res) => {
    try {
      const WebsiteHostingDetails = await WebsiteHosting.findById(req.params.id);
  
      res.status(200).json({ WebsiteHostingDetails });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.HiddenWebsiteHostingPlan = async (req, res) => {
    try {    
      const HiddenWebsiteHosting = await WebsiteHosting.findById(req.params.id);
      if (!HiddenWebsiteHosting) {
        return res.status(404).json({ message: 'Website Hosting Server not found' });
      }
      HiddenWebsiteHosting.hidden = !HiddenWebsiteHosting.hidden;
      await HiddenWebsiteHosting.save();
  
      res.status(200).json({ message: 'Hidden Dedicated Server successfully', HiddenWebsiteHosting });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.WebsiteHostingPlanData = async (req, res) => {
    try {
      const WebsiteHostingData = await WebsiteHosting.find();
  
      res.status(200).json({ WebsiteHostingData });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.updateWebsiteHostingPlan = async (req, res) => {
    try {
      const { id } = req.params; // نأخذ الـ id من الـ URL
      const { serverData } = req.body;
  
      if (
        !serverData.planName ||
        !serverData.subtitle ||
        !serverData.description ||
        !serverData.link 
      ) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }
  
      const updatedPlan = await WebsiteHosting.findByIdAndUpdate(
        id, // تحديد الخطة باستخدام ID
        {
          planName: serverData.planName,
          subtitle: serverData.subtitle,
          description: serverData.description,
          link: serverData.link,
          setupCost: serverData.setupCost || 0,
          availableQuantity: serverData.availableQuantity || null,
          unlimited: serverData.unlimited ?? true,
          hidden: serverData.hidden ?? false,
          subscriptionOptions: {
            oneMonth: { price: serverData.subscriptionOptions.oneMonth.price || null },
            twoMonths: { price: serverData.subscriptionOptions.twoMonths.price || null },
            threeMonths: { price: serverData.subscriptionOptions.threeMonths.price || null },
            fourMonths: { price: serverData.subscriptionOptions.fourMonths.price || null },
            fiveMonths: { price: serverData.subscriptionOptions.fiveMonths.price || null },
            sixMonths: { price: serverData.subscriptionOptions.sixMonths.price || null },
          },
        },
        { new: true } // إرجاع الخطة بعد التحديث
      );
  
      if (!updatedPlan) {
        return res.status(404).json({ message: "Hosting plan not found" });
      }
  
      res.status(200).json({
        message: "Website Hosting Plan updated successfully",
        plan: updatedPlan,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
      console.log({ message: "Internal server error", error: error.message });
    }
  };
  