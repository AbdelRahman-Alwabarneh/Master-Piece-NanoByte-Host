const express = require("express");
const mongoose = require("./Config/config"); // استيراد إعدادات الاتصال بقاعدة البيانات
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:1000", // استبدل بعنوان النطاق المسموح به
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // السماح بطرق معينة
    allowedHeaders: ["Content-Type", "Authorization"], // السماح برؤوس معينة
    credentials: true,
  })
);

// نقطة النهاية الأساسية
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const signupRoutes = require("./Routes/signupRoutes");

app.use("/api/users", signupRoutes);

const loginRoutes = require("./Routes/loginRoutes");

app.use("/api/login", loginRoutes);

const googleAuthRoutes = require("./Routes/googleAuthRoutes");

app.use("/api/googleAuth", googleAuthRoutes);


const discordAuthRoutes = require("./Routes/discordRoutes");

app.use("/api/discordAuth", discordAuthRoutes);

// بدء تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
