const tutorialGroup = require("../Models/tutorialGroupModels");
const Tutorial = require("../Models/tutorialModels");


exports.GetTutorialGroup = async (req, res) => {
    try {
      const userId = req.user?.id; // معرفة إذا كان المستخدم مسجلًا
        
      const AllTutorialGroup = await tutorialGroup.find({
        $and: [
          { isVisible: true }, // يجب أن تكون المجموعة مرئية
          {
            $or: [
              { visibleToRegisteredOnly: false }, // مرئية للجميع
              { visibleToRegisteredOnly: true, $expr: { $ne: [null, userId] } }, // فقط للمسجلين
            ],
          },
        ],
      })
      res.status(200).json({ AllTutorialGroup });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  
  exports.GetTutorialAndTutorialGroup = async (req, res) => {
    try {
      const userId = req.user?.id; // معرفة إذا كان المستخدم مسجلًا
  
      const AllTutorialGroup = await tutorialGroup.find({
        $and: [
          { isVisible: true }, // يجب أن تكون المجموعة مرئية
          { Link: req.params.Link },
          {
            $or: [
              { visibleToRegisteredOnly: false }, // مرئية للجميع
              { visibleToRegisteredOnly: true, $expr: { $ne: [null, userId] } }, // فقط للمسجلين
            ],
          },
        ],
      }).populate({
        path: "Tutorial",
        match: {
          $and: [
            { isHidden: false }, // التحقق من رؤية التوتوريال
            {
              $or: [
                { visibleToRegisteredOnly: false }, // مرئي للجميع
                { visibleToRegisteredOnly: true, $expr: { $ne: [null, userId] } }, // فقط للمسجلين
              ],
            },
          ],
        },
        select: "title createdAt isHidden visibleToRegisteredOnly Link body",
      });
  
      res.status(200).json({ AllTutorialGroup });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  