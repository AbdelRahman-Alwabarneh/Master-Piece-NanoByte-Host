const DomainService = require('../Models/DomainServiceModels');

exports.createDomainServicePlan = async (req, res) => {
    try {
      const { planData } = req.body;
  
      // التحقق من الحقول المطلوبة
      if (
        !planData.planName ||
        !planData.purchasePrice ||
        !planData.purchasePrice.oneYear ||
        !planData.renewalPrice ||
        !planData.renewalPrice.oneYear ||
        !planData.transferPrice ||
        !planData.transferPrice.oneYear ||
        !planData.productLink
      ) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }
  
      const newDomainService = await DomainService.create({
        planName: planData.planName,
        purchasePrice: {
          oneYear: planData.purchasePrice.oneYear,
          twoYears: planData.purchasePrice.twoYears || null,
          threeYears: planData.purchasePrice.threeYears || null,
        },
        renewalPrice: {
          oneYear: planData.renewalPrice.oneYear,
          twoYears: planData.renewalPrice.twoYears || null,
          threeYears: planData.renewalPrice.threeYears || null,
        },
        transferPrice: {
          oneYear: planData.transferPrice.oneYear,
          twoYears: planData.transferPrice.twoYears || null,
          threeYears: planData.transferPrice.threeYears || null,
        },
        setupFee: planData.setupFee || 0,
        quantity: planData.quantity || null,
        isUnlimited: planData.isUnlimited ?? true,
        productLink: planData.productLink,
        isHidden: planData.isHidden ?? false,
      });
  
      res.status(201).json({
        message: "Domain Service Plan created successfully",
        domainService: newDomainService,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
      console.log({ message: "Internal server error", error: error.message });
    }
  };
  
  exports.DomainServicePlanDetails= async (req, res) => {
    try {
      const DomainServiceDetails = await DomainService.findById(req.params.id);
  
      res.status(200).json({ DomainServiceDetails });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.HiddenDomainServicePlan = async (req, res) => {
    try {    
      const HiddenDomainService = await DomainService.findById(req.params.id);
      if (!HiddenDomainService) {
        return res.status(404).json({ message: 'Website Hosting Server not found' });
      }
      HiddenDomainService.isHidden = !HiddenDomainService.isHidden;
      await HiddenDomainService.save();
  
      res.status(200).json({ message: 'Hidden Dedicated Server successfully', HiddenDomainService });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.DomainServicePlanData = async (req, res) => {
    try {
      const DomainServiceData = await DomainService.find();
  
      res.status(200).json({ DomainServiceData });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.updateDomainServicePlan = async (req, res) => {
    try {
      const { id } = req.params; // أخذ ID من الـ URL
      const { planData } = req.body;
  
      // التحقق من الحقول المطلوبة
      if (
        !planData.planName ||
        !planData.purchasePrice ||
        !planData.purchasePrice.oneYear ||
        !planData.renewalPrice ||
        !planData.renewalPrice.oneYear ||
        !planData.transferPrice ||
        !planData.transferPrice.oneYear ||
        !planData.productLink
      ) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }
  
      const updatedPlan = await DomainService.findByIdAndUpdate(
        id, // تحديد الخطة باستخدام ID
        {
          planName: planData.planName,
          purchasePrice: {
            oneYear: planData.purchasePrice.oneYear,
            twoYears: planData.purchasePrice.twoYears || null,
            threeYears: planData.purchasePrice.threeYears || null,
          },
          renewalPrice: {
            oneYear: planData.renewalPrice.oneYear,
            twoYears: planData.renewalPrice.twoYears || null,
            threeYears: planData.renewalPrice.threeYears || null,
          },
          transferPrice: {
            oneYear: planData.transferPrice.oneYear,
            twoYears: planData.transferPrice.twoYears || null,
            threeYears: planData.transferPrice.threeYears || null,
          },
          setupFee: planData.setupFee || 0,
          quantity: planData.quantity || null,
          isUnlimited: planData.isUnlimited ?? true,
          productLink: planData.productLink,
          isHidden: planData.isHidden ?? false,
        },
        { new: true } // إرجاع الخطة بعد التحديث
      );
  
      if (!updatedPlan) {
        return res.status(404).json({ message: "Domain service plan not found" });
      }
  
      res.status(200).json({
        message: "Domain Service Plan updated successfully",
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
  