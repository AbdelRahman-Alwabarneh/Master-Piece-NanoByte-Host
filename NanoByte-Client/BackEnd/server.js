const express = require("express");
const mongoose = require("./Config/config"); // استيراد إعدادات الاتصال بقاعدة البيانات
require("dotenv").config();
const app = express();
const passport = require("passport");
require("./Config/passport");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());
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

const githubAuthRoutes = require("./Routes/githubRoutes");

app.use("/api/githubAuth", githubAuthRoutes);

const userDataRoutes = require("./Routes/userDataRoutes");

app.use("/api/userData", userDataRoutes);

const logOutRoutes = require("./Routes/logOutRoutes");

app.use("/api/LogOut", logOutRoutes);

const userProfileRoutes = require("./Routes/userProfileRoutes");

app.use("/api/updateProfile", userProfileRoutes);

const vpsGroupRoutes = require("./Routes/VPS_Routes/vpsGroupRoutes");

app.use("/api/vpsGroup", vpsGroupRoutes);

const vpsDetailsRoutes = require("./Routes/VPS_Routes/vpsDetailsRoutes");

app.use("/api/vpsDetails", vpsDetailsRoutes);

const dedicatedServerPlansRoutes = require("./Routes/dedicatedServer_Routes/dedicatedServerPlansRoutes");

app.use("/api/dedicatedServerPlans", dedicatedServerPlansRoutes);

const dedicatedServerDetailsRoutes = require("./Routes/dedicatedServer_Routes/dedicatedServerDetailsRoutes");

app.use("/api/dedicatedServerDetails", dedicatedServerDetailsRoutes);

const discountCodeRoutes = require("./Routes/DiscountCode_Routes/discountCodeRoutes");

app.use("/api/discountCode", discountCodeRoutes);

const ordersRoutes = require("./Routes/Orders_Routes/ordersRoutes");

app.use("/api/orders", ordersRoutes);

const invoicesRoutes = require("./Routes/Invoices_Routes/invoicesRoutes");

app.use("/api/invoices", invoicesRoutes);

const ServiceRoutes = require("./Routes/Service_Routes/ServiceRoutes");

app.use("/api/service", ServiceRoutes);

const checkAuthRoutes = require("./Routes/CheckAuth_Routes/checkAuthRoutes");

app.use("/api/checkAuth", checkAuthRoutes);

const emailLogRoutes = require("./Routes/emailLogRoutes");

app.use("/api/emailLog", emailLogRoutes);

const tutorialGroupRoutes = require("./Routes/tutorialGroupRoutes");

app.use("/api/tutorialGroup", tutorialGroupRoutes);

const tutorialRoutes = require("./Routes/tutorialRoutes");

app.use("/api/tutorial", tutorialRoutes);

const GroupGameHostingRoutes = require("./Routes/GameHosting_Routes/GroupGameHostingRoutes");

app.use("/api/GroupGameHosting", GroupGameHostingRoutes);

const GameHostingRoutes = require("./Routes/GameHosting_Routes/GameHostingRoutes");

app.use("/api/GameHosting", GameHostingRoutes);

const ContactRoutes = require("./Routes/ContactRoutes");

app.use("/api/Contact", ContactRoutes);

const paypalRoutes = require("./Routes/Paypal_Routes/paypalRoutes");

app.use("/api/paypal-webhook", paypalRoutes);

const InvoicePDFRoutes = require("./Routes/InvoicePDF_Routes/InvoicePDFRoutes");

app.use("/api/InvoicePDF", InvoicePDFRoutes);

const prerenderRoutes = require("./Routes/Prerender_Routes/prerenderRoutes");

app.use("/api/prerender", prerenderRoutes);

// بدء تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
