const jwt = require('jsonwebtoken');


exports.checkAuth = async (req, res) => {
    const token = req.cookies.authToken; // الحصول على التوكن من الكوكيز

    if (!token) {
      return res.status(401).json({ authenticated: false, message: 'No token provided.' });
    }
  
    try {
      // التحقق من صحة التوكن
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.status(200).json({ authenticated: true, user: decoded });
    } catch (err) {
      res.status(401).json({ authenticated: false, message: 'Invalid token.' });
    }
  };
  