const vpsGroup = require("../Models/vpsGroupModels");

exports.CreatevpsGroup = async (req, res) => {
    try {
      const { groupName, description, isVisible, users } = req.body; // لاحظ تغيير user إلى users
      // استخدام create لإنشاء مجموعة جديدة
      const savedGroup = await vpsGroup.create({
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

  exports.GetvpsGroup = async (req, res) => {
    try {
      const AllvpsGroup = await vpsGroup.find();
  
      res.status(200).json({ AllvpsGroup });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  
  exports.GetDetailsvpsGroup = async (req, res) => {
    try {
      const DetailsvpsGroup = await vpsGroup.findById(req.params.id);
  
      res.status(200).json({ DetailsvpsGroup });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.UpdatevpsGroup = async (req, res) => {
    try {
      const { groupData } = req.body;
      // العثور على المجموعة باستخدام المعرف
      const DetailsvpsGroup = await vpsGroup.findById(req.params.id);
  
      if (!DetailsvpsGroup) {
        return res.status(404).json({
          success: false,
          message: 'المجموعة غير موجودة.',
        });
      }
  
      // تحديث الحقول الفردية إذا كانت موجودة في الطلب
      DetailsvpsGroup.groupName = groupData.groupName || DetailsvpsGroup.groupName;
      DetailsvpsGroup.description = groupData.description || DetailsvpsGroup.description;
      DetailsvpsGroup.isVisible = groupData.isVisible;
      DetailsvpsGroup.users = groupData.users || DetailsvpsGroup.users; // التحقق من وجود المستخدمين
  
      // حفظ التحديثات
      const updatedGroup = await DetailsvpsGroup.save();
  
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
        // محاولة إزالة الخطة من القروب القديم إذا تم تمرير oldgroupId
        if (plan.oldgroupId) {
            const oldGroupUpdate = await vpsGroup.findOneAndUpdate(
                { _id: plan.oldgroupId },
                { $pull: { plans: planId } },
                { new: true }
            );

            // إذا كان هناك قروب قديم ولم يتم العثور عليه
            if (!oldGroupUpdate) {
                return res.status(404).json({ message: 'Old Group not found' });
            }
        }

        // إضافة الخطة إلى القروب الجديد
        const newGroupUpdate = await vpsGroup.findOneAndUpdate(
            { _id: plan.groupId },
            { $addToSet: { plans: planId } }, // إضافة الخطة إلى القروب الجديد إذا لم تكن موجودة
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
