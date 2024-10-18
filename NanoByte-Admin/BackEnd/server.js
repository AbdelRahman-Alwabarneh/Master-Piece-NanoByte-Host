const mongoose = require("./Config/config");
const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
app.use(express.json());
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:1100", // استبدل بعنوان النطاق المسموح به
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // السماح بطرق معينة
    allowedHeaders: ["Content-Type", "Authorization"], // السماح برؤوس معينة
    credentials: true,
  })
);
app.use(cookieParser());
// نقطة النهاية الأساسية
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const usersRoutes = require("./Routes/usersDataRoutes");

app.use("/api/usersData", usersRoutes);

const vpsManagementRoutes = require("./Routes/vpsManagementRoutes");

app.use("/api/vpsManagement", vpsManagementRoutes);

const vpsGroupRoutes = require("./Routes/vpsGroupRoutes");

app.use("/api/vpsGroup", vpsGroupRoutes);

const DedicatedServerManagementRoutes = require("./Routes/DedicatedServerManagementRoutes");

app.use("/api/DedicatedServerManagement", DedicatedServerManagementRoutes);

const discountCodeRoutes = require("./Routes/discountCodeRoutes");

app.use("/api/discountCode", discountCodeRoutes);

// بدء تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
