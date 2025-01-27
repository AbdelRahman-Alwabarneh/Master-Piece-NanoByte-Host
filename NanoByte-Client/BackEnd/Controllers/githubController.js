const jwt = require('jsonwebtoken');
const User = require('../Models/usersModels');

exports.githubLogin = (req, res) => {
    res.redirect(`${process.env.API_URL}/api/githubAuth/github/callback`);
};

exports.githubCallback = (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });  
         // cookie
         res.cookie("authToken", token, {
            httpOnly: true, // لا يمكن الوصول او التعديل على الكوكيز عن طريق الجافا سكربت في المتصفح
            sameSite: "strict", // يتم ارسال الكوكيز فقط مع الطلبات التي تأتي مع نفس الرابط
            maxAge: 2 * 60 * 60 * 1000, // مدة صلاحية الكوكيز في الملي ثانية هاي المدة ساعتين
          }); 
    res.redirect(`${process.env.FRONT_END_LINK}/?login=true`);
};
