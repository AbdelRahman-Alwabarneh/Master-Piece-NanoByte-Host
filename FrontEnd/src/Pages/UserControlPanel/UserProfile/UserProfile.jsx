import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../../Redux/Slice/profileSlice";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import { motion } from "framer-motion"; // لم يتم استخدامه في الكود، لذا يمكنك حذفه إذا لم يكن ضروريًا
import { Camera, Edit2 } from "lucide-react"; // لم يتم استخدامه في الكود، لذا يمكنك حذفه إذا لم يكن ضروريًا
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import './UserProfileCss/customStyles.css'; // تأكد من المسار الصحيح
import { parsePhoneNumberFromString } from 'libphonenumber-js';

function UserProfile() {
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // التحقق من تطابق كلمة المرور
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    discordUsername: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    streetAddress: "",
    city: "",
    country: "",
    profileImage: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.profile);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    } else if (status === "failed") {
      navigate("/Signup");
    }
  }, [dispatch, status, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.UsersData[0].firstName || "",
        lastName: user.UsersData[0].lastName || "",
        discordUsername: user.UsersData[0].usernameDiscord || "",
        email: user.UsersData[0].email || "",
        phoneNumber: user.UsersData[0].phoneNumber || "",
        companyName: user.UsersData[0].companyName || "",
        streetAddress: user.UsersData[0].streetAddress || "",
        city: user.UsersData[0].city || "",
        country: user.UsersData[0].country || "",
        profileImage: user.UsersData[0].profileImage || "", // أضف هذا إذا كان لديك صورة
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "newPassword" || name === "confirmPassword") {
      const otherField =
        name === "newPassword" ? "confirmPassword" : "newPassword";
      const match = value === formData[otherField];
      setPasswordMatch(match);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };
  
  const togglePasswordEdit = () => {
    setShowPasswordEdit((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!passwordMatch) {
      Swal.fire({
        title: "خطأ!",
        text: "كلمات المرور غير متطابقة.",
        icon: "error",
        iconColor: "#ff0000", // لون الأيقونة (أحمر فاتح للتباين)
        background: "#18296C", // لون خلفية النافذة (اللون الداكن من موقعك)
        color: "#ffffff", // لون النص (أبيض كما طلبت)
        confirmButtonColor: "#1E38A3", // لون زر التأكيد (اللون الفاتح من موقعك)
        confirmButtonText: "موافق",
        showCloseButton: true,
        padding: "2em", // زيادة المساحة الداخلية قليلاً
        backdrop: "rgba(22, 30, 65, 0.8)", // خلفية مظللة بلون مشابه للخلفية
        position: "center",
      });
    } else {
      Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد تحديث بياناتك الشخصية؟",
        icon: "warning",
        iconColor: "#ffcc00", // لون الأيقونة (لون أصفر للتباين)
        background: "#18296C", // لون خلفية النافذة
        color: "#ffffff", // لون النص
        showCancelButton: true,
        confirmButtonColor: "#1E38A3", // لون زر التأكيد
        cancelButtonColor: "#d33", // لون زر الإلغاء
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
        padding: "2em", // زيادة المساحة الداخلية قليلاً
        backdrop: "rgba(22, 30, 65, 0.8)", // خلفية مظللة بلون مشابه للخلفية
        position: "center",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateUserProfile({ formData }))
            .unwrap()
            .then(() => {
              dispatch(fetchUserProfile());
              Swal.fire({
                title: "تم التحديث!",
                text: "تم تحديث بياناتك الشخصية بنجاح.",
                icon: "success",
                iconColor: "#28a745", // لون الأيقونة (أخضر للتأكيد)
                background: "#18296C", // لون خلفية النافذة
                color: "#ffffff", // لون النص
                confirmButtonColor: "#1E38A3", // لون زر التأكيد
                confirmButtonText: "موافق",
                padding: "2em", // زيادة المساحة الداخلية قليلاً
                backdrop: "rgba(22, 30, 65, 0.8)", // خلفية مظللة بلون مشابه للخلفية
                position: "center",
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "خطأ!",
                text: "حدث خطأ أثناء تحديث البيانات.",
                icon: "error",
                iconColor: "#ff0000", // لون الأيقونة (أحمر فاتح للتباين)
                background: "#18296C", // لون خلفية النافذة
                color: "#ffffff", // لون النص
                confirmButtonColor: "#1E38A3", // لون زر التأكيد
                confirmButtonText: "موافق",
                padding: "2em", // زيادة المساحة الداخلية قليلاً
                backdrop: "rgba(22, 30, 65, 0.8)", // خلفية مظللة بلون مشابه للخلفية
                position: "center",
              });
            });
        }
      });
    }
  };
  

  return (
    <>
      <div className="min-h-screen font-cairo relative mt-[100px]">
        <div className="absolute inset-0  opacity-50"></div>
        <div className="relative z-10">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white tracking-wide mb-2">
                  مرحبًا بك في ملفك الشخصي
                </h2>
                <p className="text-white opacity-90">
                  قم بإدارة بياناتك وتحديث معلوماتك بسهولة.
                </p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative group" onClick={handleImageClick}>
                  <img
                    src={formData.profileImage || "/placeholder-profile.jpg"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover cursor-pointer border-4 border-white shadow-lg transition-transform transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="firstName"
                      className="block text-white text-sm font-medium"
                    >
                      الاسم الأول
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="lastName"
                      className="block text-white text-sm font-medium"
                    >
                      الاسم الأخير
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="discordUsername"
                    className="block text-white text-sm font-medium"
                  >
                    اسم المستخدم في Discord (اختياري)
                  </label>
                  <input
                    id="discordUsername"
                    name="discordUsername"
                    type="text"
                    value={formData.discordUsername}
                    onChange={handleInputChange}
                    className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-white text-sm font-medium"
                  >
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value="••••••••"
                      className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={togglePasswordEdit}
                      className="absolute inset-y-0 left-0 px-3 flex items-center text-white hover:text-gray-200"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>

                  {showPasswordEdit && (
                    <div className="space-y-2 mt-2">
                      <div className="space-y-1">
                        <label
                          htmlFor="newPassword"
                          className="block text-white text-sm font-medium"
                        >
                          كلمة المرور الجديدة
                        </label>
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="confirmPassword"
                          className="block text-white text-sm font-medium"
                        >
                          تأكيد كلمة المرور
                        </label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full bg-white bg-opacity-20 border ${
                            passwordMatch ? "border-white" : "border-red-500"
                          } rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all`}
                          required
                        />
                        {!passwordMatch && (
                          <p className="text-red-500 text-sm">
                            كلمة المرور غير متطابقة
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-white text-sm font-medium"
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-white text-sm font-medium"
                    >
                      رقم الهاتف (اختياري)
                    </label>
                    <div className="flex items-center">
                      <PhoneInput
                        country={"jo"}
                        excludeCountries={['il']}
                        searchPlaceholder={"البحث عن دولة"}
                        searchNotFound={"لم يتم العثور على الدولة"}
                        enableSearch={true}
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        // disableSearchIcon={true}
                        containerClass="[direction:ltr] flex-1" // استخدم flex-1 لملء الفراغ
                        buttonClass="flex items-center bg-transparent border border-white rounded-l-md px-2 hover:bg-transparent"
                        inputStyle={{
                          width: "100%",
                          height:"37.6px",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          border: "1px solid white",
                          borderRadius: "0.5rem",
                          padding: "0.5rem 1rem", // padding متوازن
                          paddingTop:"8px",
                          color: "white",
                          fontSize: "0.875rem",
                          outline: "none",
                          transition: "all 0.2s",
                          paddingLeft: "4rem", // زيادة المسافة اليسرى
                        }}
                        buttonStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                          border: "1px solid white",
                          borderRight: "none",
                          borderRadius: "0.5rem 0 0 0.5rem",
                          padding: "0.5rem 0.75rem", // padding محسّن
                          marginRight: "-1px", // إزالة الهوامش لتجنب تداخل الحدود
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                        }}
                        dropdownStyle={{
                          top: "25px",
                          left: "0px",
                          border: "1px solid white",
                          borderRadius: "0 0 0.5rem 0.5rem",
                          color: "black",
                          width: "250px", // تعيين عرض الزر
                        }}
                        searchStyle={{
                          backgroundColor: "white",
                          color: "black",
                          padding: "0.5rem",
                          direction: "rtl",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="companyName"
                    className="block text-white text-sm font-medium"
                  >
                    اسم الشركة (اختياري)
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="streetAddress"
                    className="block text-white text-sm font-medium"
                  >
                    عنوان الشارع (اختياري)
                  </label>
                  <input
                    id="streetAddress"
                    name="streetAddress"
                    type="text"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="city"
                      className="block text-white text-sm font-medium"
                    >
                      المدينة (اختياري)
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="country"
                      className="block text-white text-sm font-medium"
                    >
                      الدولة (اختياري)
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#182D7E] text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-[#1E38A3] transition-colors text-sm"
                  >
                    حفظ التغييرات
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-white text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
        required
      />
    </div>
  );
}

export default UserProfile;