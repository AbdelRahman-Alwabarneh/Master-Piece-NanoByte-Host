const emailLog = require('../Models/emailLogModels');

exports.emailLogData = async (req, res) => {
    try {
        // الحصول على الصفحة والحد الافتراضي
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit);

        // حساب العدد المراد تخطيه بناءً على الصفحة الحالية والحد
        const skip = (page - 1) * limit;

        // جلب البيانات مع الباجينيشن
        const totalCount = await emailLog.countDocuments({ userId: req.user.id });
        const emailLogData = await emailLog
          .find({ userId: req.user.id })
          .select('emailSubject senderName senderEmail createdAt')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
        
        res.status(200).json({
          emailLogData,
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: totalCount,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

  exports.emailLogDataDetails = async (req, res) => {
    const { logEmailId } = req.params;
    try {
      const emailLogDataDetails = await emailLog.findById(logEmailId).populate('userId', 'firstName email');
  
      res.status(200).json({ emailLogDataDetails });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
};
