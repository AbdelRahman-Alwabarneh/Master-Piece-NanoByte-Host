const User = require("../Models/usersModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
cookieParser = require("cookie-parser");

exports.login = async (req, res) => {
  try {
    const { Email, Password , rememberMe} = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "جميع الحقول مطلوبة" });
    }
    
    const checkRegistration = await User.findOne({ email: Email });

    if (!checkRegistration) {
      return res
        .status(401)
        .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    }

    if (checkRegistration) {

        //التحقق من كلمة المرور
      const PasswordCorrect = await bcrypt.compare(
        Password,
        checkRegistration.password
      );
      if (!PasswordCorrect) {
        return res
          .status(401)
          .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      }
      if(checkRegistration.isBanned == true){
       
        return res
        .status(401)
        .json({ message: "تم حظر المستخدم. لمزيد من التفاصيل، يُرجى التواصل مع الإدارة." });
      }
      // jwt
      const payloadJwt = {
        id: checkRegistration.id,
      };
     
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(payloadJwt, secretKey, { expiresIn: rememberMe ? "48h": "2h" });
  

      // cookie
      res.cookie("authToken", token, {
        httpOnly: true, // لا يمكن الوصول او التعديل على الكوكيز عن طريق الجافا سكربت في المتصفح
        sameSite: "strict", // يتم ارسال الكوكيز فقط مع الطلبات التي تأتي مع نفس الرابط
        maxAge:rememberMe ? 2 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000 , // مدة صلاحية الكوكيز في الملي ثانية
        
      });

      res
        .status(201)
        .json({
          message: "تم تسجيل الدخول بنجاح",
          // user: checkRegistration,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
