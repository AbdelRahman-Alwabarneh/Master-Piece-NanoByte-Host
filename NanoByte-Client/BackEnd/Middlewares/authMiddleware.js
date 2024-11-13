const jwt = require('jsonwebtoken');

// Middleware للتحقق من JWT
const auth = (req, res, next) => {
  // الحصول على التوكن من الكوكيز
  const token = req.cookies.authToken; // تأكد من أن اسم الكوكيز يتوافق مع الاسم الذي تستخدمه

  if (!token) {
    return res.status(401).json({authenticated: false, message: 'Access denied. No token provided.' });
  }

  try {
    // فك التوكن باستخدام السر الموجود في .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // إضافة المستخدم الذي تم فك تشفيره إلى الطلب
    req.user = decoded;
    // متابعة التنفيذ
    next();
  } catch (err) {
    // في حال وجود مشكلة في التوكن
    res.status(400).json({authenticated: false, message: 'Invalid token.' });
  }
};

module.exports = auth;
