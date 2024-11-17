const GameHosting = require("../Models/GameHostingModels");


exports.gameServerPlanQuantity = async (req, res) => {
    const { productLink } = req.body;
    
    if (!productLink) {
      return res.status(400).json({ error: "Invalid Product Link" });
    }
  
    try {
      // البحث عن خطة الخادم باستخدام الرابط المنتج
      const gameServerDetailsPlan = await GameHosting.findOne({ productLink });
  
      if (!gameServerDetailsPlan) {
        return res.status(404).json({ error: "Game server plan not found" });
      }
  
      // التحقق من أن الخطة لا تحتوي على "isUnlimited" وأن الكمية أكبر من 0
      if (!gameServerDetailsPlan.isUnlimited && gameServerDetailsPlan.quantity > 0) {
        gameServerDetailsPlan.quantity -= 1; // تقليل الكمية
  
        await gameServerDetailsPlan.save(); // حفظ التعديلات
      }
  
      res.status(200).json({ gameServerDetailsPlan });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
  exports.gameServerPlanData = async (req, res) => {
    try {
      const gameServer = await GameHosting.find({
         isHidden: false,
      });
  
      res.status(200).json({ gameServer });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  