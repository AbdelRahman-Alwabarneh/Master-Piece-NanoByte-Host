const tutorialGroup = require("../Models/tutorialGroupModels");
const Tutorial = require("../Models/tutorialModels");


exports.GetTutorialByLink = async (req, res) => {
    try {
      const userId = req.user?.id; // معرفة إذا كان المستخدم مسجلًا
        
      const TutorialByLink = await Tutorial.find({
        $and: [
          { isHidden: false }, // يجب أن تكون المجموعة مرئية
          { Link: req.params.Link },
          {
            $or: [
              { visibleToRegisteredOnly: false }, // مرئية للجميع
              { visibleToRegisteredOnly: true, $expr: { $ne: [null, userId] } }, // فقط للمسجلين
            ],
          },
        ],
      })
      res.status(200).json({ TutorialByLink });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };