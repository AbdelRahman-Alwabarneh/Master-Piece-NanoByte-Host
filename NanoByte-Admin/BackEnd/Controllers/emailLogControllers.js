const emailLog = require('../Models/emailLogModels');

exports.emailLogData = async (req, res) => {
    const { userId } = req.params;
    try {
      
      const emailLogData = await emailLog.find({userId}).select('emailSubject senderName senderEmail createdAt').sort({ createdAt: -1 });
  
      res.status(200).json({ emailLogData });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
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
