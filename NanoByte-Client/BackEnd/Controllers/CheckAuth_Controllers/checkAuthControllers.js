const jwt = require('jsonwebtoken');


exports.checkAuth = async (req, res) => {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(200).json({ authenticated: false });
    }
  
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.status(200).json({ authenticated: true });
    } catch (err) {
      res.status(401).json({ authenticated: false });
    }
  };
  