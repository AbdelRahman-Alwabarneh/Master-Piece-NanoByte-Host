const GroupGamesHosting = require("../Models/GroupGameHostingModels");

exports.CreateGamesHostingGroup = async (req, res) => {
    try {
      const { groupName, description, isVisible, users } = req.body; // لاحظ تغيير user إلى users
      // استخدام create لإنشاء مجموعة جديدة
      const savedGroup = await GroupGamesHosting.create({
        groupName,
        description,
        isVisible,
        users, // مصفوفة من المستخدمين
      });
      res.status(201).json({
        success: true,
        message: 'تم إنشاء المجموعة بنجاح!',
        group: savedGroup,
      });
    } catch (error) {
      console.error('Error creating group:', error);
      res.status(500).json({
        success: false,
        message: 'فشل في إنشاء المجموعة.',
        error: error.message,
      });
    }
  };

  exports.GetGamesHostingGroup = async (req, res) => {
    try {
      const GamesHostingGroup = await GroupGamesHosting.find();
  
      res.status(200).json({ GamesHostingGroup });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.GetAllGamesHostingGroup = async (req, res) => {
    try {
      const GamesHostingGroup = await GroupGamesHosting.find()
        .populate({
          path: 'plans',
          select: 'planName ram cpu storage connectionSpeed isHidden'
        });
  
      res.status(200).json({ GamesHostingGroup });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  

  exports.GetDetailsGamesHostingGroup = async (req, res) => {
    try {
      const DetailsGamesHostingGroup = await GroupGamesHosting.findById(req.params.id);
  
      res.status(200).json({ DetailsGamesHostingGroup });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.updateGameHostingGroup = async (req, res) => {
    try {
      const { groupData } = req.body;
      
      // العثور على المجموعة باستخدام المعرف
      const groupDetails = await GroupGamesHosting.findById(req.params.id);
  
      if (!groupDetails) {
        return res.status(404).json({
          success: false,
          message: 'المجموعة غير موجودة.',
        });
      }
  
      // تحديث الحقول الفردية إذا كانت موجودة في الطلب
      groupDetails.groupName = groupData.groupName || groupDetails.groupName;
      groupDetails.description = groupData.description || groupDetails.description;
      groupDetails.isVisible = groupData.isVisible !== undefined ? groupData.isVisible : groupDetails.isVisible;
      
      // تحديث المستخدمين إذا كانوا موجودين في الطلب
      groupDetails.users = groupData.users || groupDetails.users;
  
      // تحديث الخطط إذا كانت موجودة في الطلب
      groupDetails.plans = groupData.plans || groupDetails.plans;
  
      // حفظ التحديثات
      const updatedGroup = await groupDetails.save();
  
      res.status(200).json({
        success: true,
        message: 'تم تحديث المجموعة بنجاح!',
        group: updatedGroup,
      });
    } catch (error) {
      console.error('Error updating group:', error);
      res.status(500).json({
        success: false,
        message: 'فشل في تحديث المجموعة.',
        error: error.message,
      });
    }
  };

exports.AddPlanToGroup = async (req, res) => {
    const { plan } = req.body;
    const planId = req.params.id;

    try {
        // إزالة الخطة من القروب القديم إذا تم تمرير oldgroupId
        if (plan.oldgroupId) {
            const oldGroupUpdate = await GroupGamesHosting.findOneAndUpdate(
                { _id: plan.oldgroupId },
                { $pull: { plans: planId } },
                { new: true }
            );

            if (!oldGroupUpdate) {
                return res.status(404).json({ message: 'Old Group not found' });
            }
        }

        // إضافة الخطة إلى القروب الجديد
        const newGroupUpdate = await GroupGamesHosting.findOneAndUpdate(
            { _id: plan.groupId },
            { $addToSet: { plans: planId } },
            { new: true }
        );

        if (!newGroupUpdate) {
            return res.status(404).json({ message: 'New Group not found' });
        }

        res.status(200).json({ message: 'Plan moved successfully', newGroup: newGroupUpdate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

