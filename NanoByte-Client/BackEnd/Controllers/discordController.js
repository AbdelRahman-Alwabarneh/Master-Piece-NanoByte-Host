// controllers/authController.js
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../Models/usersModels");
const config = require("../Config/configDiscord");
const bcrypt = require("bcrypt");
// وظيفة بدء تسجيل الدخول مع Discord
const loginWithDiscord = (req, res) => {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
    config.discord.clientId
  }&redirect_uri=${encodeURIComponent(
    config.discord.redirectUri
  )}&response_type=code&scope=identify email`;
  res.redirect(discordAuthUrl);
};

// وظيفة معالجة الرد من Discord
const handleDiscordCallback = async (req, res) => {
  const { code } = req.query;

  try {
    // طلب الوصول إلى التوكن باستخدام الـ code
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: config.discord.clientId,
        client_secret: config.discord.clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: config.discord.redirectUri,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;
    if (!access_token) {
      throw new Error("Failed to obtain access token");
    }

    // طلب بيانات المستخدم من Discord
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { id, username, global_name, email, avatar } = userResponse.data;

    if (!id || !username || !global_name || !email || !avatar) {
      throw new Error("Failed to obtain user data");
    }
    const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
    // التحقق مما إذا كان المستخدم موجود بالفعل أو إنشاؤه
    let user = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(id, salt);
    if (!user) {
      user = await User.create({
        firstName: global_name,
        usernameDiscord: username,
        email,
        password: hashedPassword,
        discordId: id,
        profileImage: avatarUrl,
      });
    }

    // إنشاء JWT token
    const payloadJwt = {
      id: user._id,
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT secret key is not defined");
    }
    const token = jwt.sign(payloadJwt, secretKey, { expiresIn: "2h" });

    // إعداد الكوكي
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, // ساعتين
    });

    // توجيه المستخدم إلى صفحة مناسبة بعد تسجيل الدخول
    res.redirect("http://localhost:1000/?login=true"); // استبدل هذا بالمسار الذي تريده
  } catch (error) {
    console.error(
      "Error during Discord authentication:",
      error.response ? error.response.data : error.message
    );
    res.redirect("http://localhost:1000/signup");
    res.status(500).send("Authentication failed.");
  }
};

module.exports = { loginWithDiscord, handleDiscordCallback };
