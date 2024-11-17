const tutorialGroup = require("../Models/tutorialGroupModels");


exports.CreateTutorialGroup = async (req, res) => {
    try {
      const { groupName, description, isVisible, visibleToRegisteredOnly, tutorials, Link } = req.body; 

      const savedGroup = await tutorialGroup.create({
        groupName,
        description,
        isVisible,
        Link,
        visibleToRegisteredOnly,
        Tutorial: tutorials,
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
  
  exports.GetTutorialGroup = async (req, res) => {
    try {
      const AllTutorialGroup = await tutorialGroup.find().populate({
        path: 'Tutorial',
        select: 'title createdAt isHidden visibleToRegisteredOnly Link'
      });
  
      res.status(200).json({ AllTutorialGroup });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.GetDetailsTutorialGroup = async (req, res) => {
    try {
      const DetailsTutorialGroup = await tutorialGroup.findById(req.params.id);
  
      res.status(200).json({ DetailsTutorialGroup });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.UpdateTutorialGroup = async (req, res) => {
    try {
      const { groupData } = req.body;
      // العثور على المجموعة باستخدام المعرف
      const DetailsTutorialGroup = await tutorialGroup.findById(req.params.id);
  
      if (!DetailsTutorialGroup) {
        return res.status(404).json({
          success: false,
          message: 'المجموعة غير موجودة.',
        });
      }
  
      // تحديث الحقول الفردية إذا كانت موجودة في الطلب
      DetailsTutorialGroup.groupName = groupData.groupName || DetailsTutorialGroup.groupName;
      DetailsTutorialGroup.description = groupData.description || DetailsTutorialGroup.description;
      DetailsTutorialGroup.Link = groupData.Link || DetailsTutorialGroup.Link;
      DetailsTutorialGroup.isVisible = groupData.isVisible ?? DetailsTutorialGroup.isVisible;
      DetailsTutorialGroup.visibleToRegisteredOnly =
        groupData.visibleToRegisteredOnly ?? DetailsTutorialGroup.visibleToRegisteredOnly;
  
      // تحديث حقل Tutorials (إما استبدال أو الإبقاء على القيم الأصلية)
      if (groupData.Tutorial && Array.isArray(groupData.Tutorial)) {
        DetailsTutorialGroup.Tutorial = groupData.Tutorial;
      }
  
      // حفظ التحديثات
      const updatedGroup = await DetailsTutorialGroup.save();
  
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

exports.AddTutorialToGroup = async (req, res) => {
    const { tutorial } = req.body; // استلام بيانات التوتوريال
    const tutorialId = req.params.id; // ID الخاص بالتوتوريال

    try {
        // محاولة إزالة التوتوريال من القروب القديم إذا تم تمرير oldGroupId
        if (tutorial.oldGroupId) {
            const oldGroupUpdate = await tutorialGroup.findOneAndUpdate(
                { _id: tutorial.oldGroupId },
                { $pull: { Tutorial: tutorialId } }, // إزالة التوتوريال من القروب القديم
                { new: true }
            );

            // إذا كان هناك قروب قديم ولم يتم العثور عليه
            if (!oldGroupUpdate) {
                return res.status(404).json({ message: 'Old Group not found' });
            }
        }

        // إضافة التوتوريال إلى القروب الجديد
        const newGroupUpdate = await tutorialGroup.findOneAndUpdate(
            { _id: tutorial.groupId },
            { $addToSet: { Tutorial: tutorialId } }, // إضافة التوتوريال إلى القروب الجديد إذا لم يكن موجودًا
            { new: true }
        );

        if (!newGroupUpdate) {
            return res.status(404).json({ message: 'New Group not found' });
        }

        res.status(200).json({ message: 'Tutorial moved successfully', newGroup: newGroupUpdate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

