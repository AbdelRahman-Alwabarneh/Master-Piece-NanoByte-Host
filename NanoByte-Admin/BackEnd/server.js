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

const orderRoutes = require("./Routes/orderRoutes");

app.use("/api/order", orderRoutes);

const ServiceRoutes = require("./Routes/ServiceRoutes");

app.use("/api/service", ServiceRoutes);

const emailTemplateRoutes = require("./Routes/emailTemplateRoutes");

app.use("/api/emailTemplate", emailTemplateRoutes);

const SendEmailRoutes = require("./Routes/SendEmailRoutes");

app.use("/api/SendEmail", SendEmailRoutes);

const emailLogRoutes = require("./Routes/emailLogRoutes");

app.use("/api/emailLog", emailLogRoutes);

const websiteHostingRoutes = require("./Routes/websiteHostingRoutes");

app.use("/api/websiteHosting", websiteHostingRoutes);

const GroupGameHostingRoutes = require("./Routes/GroupGameHostingRoutes");

app.use("/api/GroupGameHosting", GroupGameHostingRoutes);

const GameHostingRoutes = require("./Routes/GameHostingRoutes");

app.use("/api/GameHosting", GameHostingRoutes);

const DomainServiceRoutes = require("./Routes/DomainServiceRoutes");

app.use("/api/DomainService", DomainServiceRoutes);

const tutorialGroupRoutes = require("./Routes/tutorialGroupRoutes");

app.use("/api/tutorialGroup", tutorialGroupRoutes);

const tutorialRoutes = require("./Routes/tutorialRoutes");

app.use("/api/tutorial", tutorialRoutes);

const ContactRoutes = require("./Routes/ContactRoutes");

app.use("/api/Contact", ContactRoutes);

const statisticsRoutes = require("./Routes/statisticsRoutes");

app.use("/api/statistics", statisticsRoutes);

// بدء تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
