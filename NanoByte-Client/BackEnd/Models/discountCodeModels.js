const mongoose = require("mongoose");

const discountCodeSchema = new mongoose.Schema(
  {
    codeName: {
      type: String,
      required: true,
      unique: true, // لضمان عدم تكرار الأكواد
    },
    discountValue: {
      type: Number,
      required: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"], // نسبة مئوية أو مبلغ ثابت
      required: true,
    },
    authorizedUserId: [
      {
        type: mongoose.Schema.Types.ObjectId, // مصفوفة من معرفات المستخدمين
        ref: "User", // الربط بجدول المستخدمين
        default: null,
      },
    ],
    startTime: {
      type: Date,
      default: null, // إذا تُرك فارغًا، يعني لا يوجد
    },
    expiresAt: {
      type: Date,
      default: null, // إذا تُرك فارغًا، يعني لا يوجد
    },
    isActive: {
      type: Boolean,
      default: true, // لتحديد ما إذا كان الكود فعال أو منتهي
    },
    maxUsage: {
      type: Number,
      default: Infinity, // الحد الأقصى لاستخدام الكود لجميع المستخدمين
    },
    usageCount: {
      type: Number,
      default: 0, // عدد مرات الاستخدام حتى الآن
    },
    maxUsagePerUser: {
      type: Number,
      default: Infinity, // عدد المرات المسموحة لكل مستخدم (يمكن ضبطها)
    },
    applicableServiceIds: [
      {
        type: String,
      },
    ],
    adminNotes: {
      type: String, // ملاحظات الإدارة
      default: "",
    },
    usedBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        usageCount: { type: Number, default: 0 }, // عدد مرات استخدام كل مستخدم
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "DiscountCode",
  discountCodeSchema,
  "DiscountCodes"
);
