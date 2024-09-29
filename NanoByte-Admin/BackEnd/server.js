const mongoose = require("./Config/config"); 
const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
app.use(express.json());
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:1100", // استبدل بعنوان النطاق المسموح به
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // السماح بطرق معينة
    allowedHeaders: ["Content-Type", "Authorization"], // السماح برؤوس معينة
    credentials: true,
  })
);
app.use(cookieParser());
// نقطة النهاية الأساسية
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// بدء تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
