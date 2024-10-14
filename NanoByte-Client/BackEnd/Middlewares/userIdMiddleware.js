const jwt = require('jsonwebtoken'); // تأكد من أنك مثبت مكتبة jwt

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1]; // تأكد من أنك تسحب التوكن بشكل صحيح
  if (!token) {
    // إذا لم يكن هناك توكن، يمكنك الاستمرار بدون تعيين req.user
    return next();
  }

  // التحقق من صحة التوكن
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = { id: decoded.id }; // تعيين معرّف المستخدم المستخرج من التوكن
    next();
  });
};

module.exports = authMiddleware;
