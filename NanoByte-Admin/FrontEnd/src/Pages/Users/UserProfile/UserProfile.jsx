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
    <title> الملف الشخصي - {user.UsersData.firstName}</title>
    <div className="min-h-screen font-cairo relative p-4 mt-6 md:mr-64 mr-[75px]">
        <Sidebar/>
        <UserSidebar/>
      <div className="relative z-10">
        <div className="container mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8  mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="الاسم الأول"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <InputField
                  label="الاسم الأخير"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <InputField
                label="اسم المستخدم في Discord (اختياري)"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleInputChange}
              />

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
                  <div className="space-y-2 mt-2 relative">
                    <InputField
                      label="كلمة المرور الجديدة"
                      name="newPassword"
                      type={showNewPasswordEdit ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                        <button
                      type="button"
                      onClick={showNewPassword}
                      className="absolute inset-y-0 left-0 bottom-[52px] px-3 flex items-center text-white hover:text-gray-200"
                    >
                      {showNewPasswordEdit ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <InputField
                      label="تأكيد كلمة المرور"
                      name="confirmPassword"
                      type={showConfirmationPasswordEdit ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      extraClass={!passwordMatch ? "border-red-500" : ""}
                    />
                       <button
                      type="button"
                      onClick={showConfirmationPassword}
                      className="absolute inset-y-0 left-0 top-[88px] px-3 flex items-center text-white hover:text-gray-200"
                    >
                      {showConfirmationPasswordEdit ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                   
                  </div>
                )}
                 {!passwordMatch && (
                      <p className="text-red-500 text-sm">
                        كلمة المرور غير متطابقة
                      </p>
                    )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="البريد الإلكتروني"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="space-y-1">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-white text-sm font-medium"
                  >
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
                    buttonClass="flex items-center bg-transparent border border-white rounded-l-md px-2 hover:bg-transparent"
                    inputStyle={{
                      width: "100%",
                      height: "37.6px",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid white",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 1rem",
                      paddingTop: "8px",
                      color: "white",
                      fontSize: "0.875rem",
                      outline: "none",
                      transition: "all 0.2s",
                      paddingLeft: "4rem",
                    }}
                    buttonStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid white",
                      borderRight: "none",
                      borderRadius: "0.5rem 0 0 0.5rem",
                      padding: "0.5rem 0.75rem",
                      marginRight: "-1px",
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
                      width: "250px",
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

              <InputField
                label="اسم الشركة (اختياري)"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />

              <InputField
                label="عنوان الشارع (اختياري)"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="المدينة (اختياري)"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <InputField
                  label="الدولة (اختياري)"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
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