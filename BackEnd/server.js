const express = require("express");
const mongoose = require("./Config/config"); // استيراد إعدادات الاتصال بقاعدة البيانات
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:1000', // استبدل بعنوان النطاق المسموح به
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // السماح بطرق معينة
  allowedHeaders: ['Content-Type', 'Authorization'], // السماح برؤوس معينة
  credentials: true,
}));

// نقطة النهاية الأساسية
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const userRoutes = require('./Routes/signupRoutes');

app.use('/api/users', userRoutes);


const loginRoutes = require('./Routes/loginRoutes');

app.use('/api/login', loginRoutes);

// بدء تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
