import React, { useState, useEffect, useRef } from "react";
import { Camera, Edit2,Eye,EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import './UserProfileCss/customStyles.css'; 
import { useDispatch, useSelector } from "react-redux";
import { userDetails , updateUserProfile } from "../../../Redux/Slice/usersData";
import Loading from "../../../Components/Loading/Loading";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { useParams } from "react-router-dom";
import UserSidebar from "../../../Components/UserSidebar/UserSidebar";
import Sidebar from "../../../Components/Sidebar/Sidebar";
function UserProfile() {
  
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);
  const [showNewPasswordEdit, setshowNewPasswordEdit] = useState(false);
  const [showConfirmationPasswordEdit, setshowConfirmationPasswordEdit] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
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
    newPassword: "",
    confirmPassword: "",
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.UserData);

  useEffect(() => {
    if (id) {
      dispatch(userDetails(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (user && user.UsersData) {
      const userData = user.UsersData;
      setFormData((prevData) => ({
        ...prevData,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        discordUsername: userData.usernameDiscord || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        companyName: userData.companyName || "",
        streetAddress: userData.streetAddress || "",
        city: userData.city || "",
        country: userData.country || "",
      }));
    }
  }, [user]); // استخدم user فقط كاعتماد

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "newPassword" || name === "confirmPassword") {
      const otherField = name === "newPassword" ? "confirmPassword" : "newPassword";
      setPasswordMatch(value === formData[otherField]);
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
  const showNewPassword = () => {
    setshowNewPasswordEdit(!showNewPasswordEdit)
  };
  const showConfirmationPassword = () => {
    setshowConfirmationPasswordEdit(!showConfirmationPasswordEdit)
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
          dispatch(updateUserProfile({ formData,id }))
            .unwrap()
            .then(() => {
              dispatch(userDetails(id));
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
  
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!user || !user.UsersData || user.UsersData.length === 0) {
    return <NoDataFound />;
  }

  return (
    <>
    <title>الملف الشخصي - {user.UsersData.firstName}</title>
    <Sidebar />
    <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white p-2 sm:p-4 font-cairo md:mr-64 mr-[75px] text-sm mt-6">
      <div className="max-w-7xl mx-auto">
      <UserSidebar />
        <div className="bg-blue-900 bg-opacity-70 rounded-lg p-3 sm:p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="flex justify-between border-b border-blue-700 pb-1 mb-3">
            <h2 className="text-base sm:text-lg font-semibold flex items-center">
              الملف الشخصي
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  الاسم الأول
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  الاسم الأخير
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                اسم المستخدم في Discord (اختياري)
              </label>
              <input
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleInputChange}
                className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  value="••••••••"
                  className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                  readOnly
                />
                <button
                  type="button"
                  onClick={togglePasswordEdit}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>

              {showPasswordEdit && (
                <div className="space-y-2 mt-2">
                  <div className="relative">
                    <label className="block text-xs text-gray-300 mb-1">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type={showNewPasswordEdit ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 pr-8 py-1.5 transition-all"
                    />
                    <button
                      type="button"
                      onClick={showNewPassword}
                      className="absolute left-2 top-7 text-gray-400 hover:text-white transition-colors"
                    >
                      {showNewPasswordEdit ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <label className="block text-xs text-gray-300 mb-1">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type={showConfirmationPasswordEdit ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full bg-blue-900 bg-opacity-50 rounded border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 pr-8 py-1.5 transition-all ${
                        !passwordMatch ? "border-red-500" : "border-blue-700"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={showConfirmationPassword}
                      className="absolute left-2 top-7 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmationPasswordEdit ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {!passwordMatch && (
                    <p className="text-red-500 text-xs">كلمة المرور غير متطابقة</p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  رقم الهاتف (اختياري)
                </label>
                <PhoneInput
                  country={"jo"}
                  excludeCountries={['il']}
                  searchPlaceholder={"البحث عن دولة"}
                  searchNotFound={"لم يتم العثور على الدولة"}
                  enableSearch={true}
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  containerClass="[direction:ltr] flex-1"
                  inputStyle={{
                    width: "100%",
                    height: "32px",
                    backgroundColor: "rgba(30, 58, 138, 0.5)",
                    border: "1px solid rgb(29, 78, 216)",
                    borderRadius: "0.25rem",
                    color: "white",
                    fontSize: "0.75rem",
                    paddingLeft: "3rem",
                  }}
                  buttonStyle={{
                    backgroundColor: "rgba(30, 58, 138, 0.5)",
                    border: "1px solid rgb(29, 78, 216)",
                    borderRight: "none",
                    borderRadius: "0.25rem 0 0 0.25rem",
                  }}
                  dropdownStyle={{
                    top: "25px",
                    left: "0px",
                    border: "1px solid white",
                    borderRadius: "0 0 0.5rem 0.5rem",
                    color: "black",
                    width: "250px",
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  اسم الشركة (اختياري)
                </label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  المدينة (اختياري)
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  الدولة (اختياري)
                </label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                عنوان الشارع (اختياري)
              </label>
              <input
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="flex items-center gap-1 bg-green-600/90 hover:bg-green-600 px-3 py-1.5 rounded text-xs transition-colors"
              >
                <span>حفظ التغييرات</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}

function InputField({ label, name, value, onChange, type = "text", extraClass = "" }) {
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
        className={`w-full bg-white bg-opacity-20 border border-white rounded-lg p-2 text-white placeholder-white text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all ${extraClass}`}
      />
    </div>
  );
}

export default UserProfile;