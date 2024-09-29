import axios from "axios";
import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Loading/Loading";
import services_svg from "../../Assets/Photo/svgexport-16 2.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/Slice/profileSlice";
const ControlPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.profile);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    } else if (status === "failed") {
      navigate("/Signup");
    }
  }, [dispatch, status, navigate]);

  const [showAllStats, setShowAllStats] = useState(false);

  const handleShowAllStats = () => {
    setShowAllStats(!showAllStats);
  };

  const statistics = [
    {
      title: "عدد الخوادم النشطة",
      description: "عدد الخوادم النشطة",
      value: "0",
    },
    {
      title: "إجمالي المستخدمين",
      description: "إجمالي عدد المستخدمين",
      value: "0",
    },
    {
      title: "التخزين المستخدم",
      description: "حجم التخزين المستخدم",
      value: "0 GB",
    },
    { title: "عرض النطاق", description: "استهلاك عرض النطاق", value: "0 MB" },
    {
      title: "المهام المكتملة",
      description: "عدد المهام المكتملة",
      value: "0",
    },
    { title: "وقت التشغيل", description: "متوسط وقت التشغيل", value: "100%" },
  ];
  const formatEmail = (email) => {
    // الحصول على الجزء قبل علامة @
    const [localPart, domainPart] = email.split("@");

    // أول 3 أحرف من الجزء المحلي
    const firstPart = localPart.slice(0, 3);

    // آخر حرفين من الجزء المحلي
    const lastPart = localPart.slice(-2);

    // ثلاث نجوم
    const stars = "***";

    // إعادة تركيب البريد الإلكتروني
    return `${firstPart}${stars}${lastPart}@${domainPart}`;
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:2000/api/LogOut",{}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("خطأ في تسجيل الخروج", error);
    }
  };
  return (
    <>
      <title>منطقة العمل - NanoByte</title>
      <Header />
      {status === "loading"? <Loading /> :<div className="bg-blue-900 p-6 text-white font-cairo mt-[72px]">
        <h1 className="text-3xl mb-1 text-right">لوحة التحكم</h1>
        <p className="mb-4 text-right">منطقة العميل</p>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Section */}
          <div className="flex-grow order-2 lg:order-1">
            {/* Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {/* For small screens */}
              <div className="lg:hidden">
                {statistics.slice(0, 1).map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white text-black p-4 rounded-lg shadow"
                  >
                    <p className="text-xl mb-2 text-right font-bold">
                      {stat.title}
                    </p>
                    <p className="text-sm mb-2 text-right">
                      {stat.description}
                    </p>
                    <p className="text-3xl font-bold text-right">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              {/* For large screens */}
              <div className="hidden lg:contents">
                {statistics.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white text-black p-4 rounded-lg shadow"
                  >
                    <p className="text-xl mb-2 text-right font-bold">
                      {stat.title}
                    </p>
                    <p className="text-sm mb-2 text-right">
                      {stat.description}
                    </p>
                    <p className="text-3xl font-bold text-right">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Show all stats button for small screens */}
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm w-full lg:hidden"
              onClick={handleShowAllStats}
            >
              {showAllStats ? "إخفاء الإحصائيات" : "عرض جميع الإحصائيات"}
            </button>
            {/* Additional stats for small screens when button is clicked */}
            {showAllStats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 lg:hidden">
                {statistics.slice(1).map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white text-black p-4 rounded-lg shadow"
                  >
                    <p className="text-xl mb-2 text-right font-bold">
                      {stat.title}
                    </p>
                    <p className="text-sm mb-2 text-right">
                      {stat.description}
                    </p>
                    <p className="text-3xl font-bold text-right">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-white text-black p-4 rounded-lg shadow mb-4 mt-4">
              <h2 className="text-xl mb-2 font-bold text-right pb-2 border-b-[2px] border-b-[solid] border-b-[black]">
                المنتجات / الخدمات الفعالة
              </h2>
              <div className="flex justify-center py-24 flex-col items-center h-24 font-bold">
                <img src={services_svg} alt="Placeholder" className="mr-2" />
                <p className="text-gray-500 mt-2">
                  لا توجد منتجات أو خدمات فعالة
                </p>
                <Link
                  to="/VpsServer"
                  className="text-gray-500 hover:text-blue-500 mt-1"
                >
                  طلب خدمات جديدة
                </Link>
              </div>
            </div>
            <div className="bg-white text-black p-4 rounded-lg shadow font-bold">
              <h2 className="text-xl mb-2 text-right font-bold pb-2 border-b-[2px] border-b-[solid] border-b-[black]">
                احصائيات اخر 5 طلبات خوادم / نطاقات
              </h2>
              <div className="flex justify-center py-24 flex-col items-center h-24">
                <img src={services_svg} alt="Placeholder" className="mr-2" />
                <p className="text-gray-500 mt-2">
                  لا تمتلك طلبات خوادم / نطاقات
                </p>
                <Link
                  to="/VpsServer"
                  className="text-gray-500 hover:text-blue-500 mt-1"
                >
                  طلب خدمات جديدة
                </Link>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className=" order-1 lg:order-2">
            <div className="bg-white text-black p-4 rounded-lg shadow mb-4">
              <div className="flex justify-end mb-4">
                <img
                  src={user ? user.UsersData[0].profileImage : null}
                  alt=""
                  className="h-16 w-16 rounded-full"
                />
              </div>
              <p className="text-right font-bold mb-4">
                {user && user.UsersData[0].firstName ? (
                  user.UsersData[0].firstName.match(/[\u0600-\u06FF]/) ? (
                    <>
                      اسم المستخدم :<span> {user.UsersData[0].firstName}</span>
                    </>
                  ) : (
                    <>
                      <span> {user.UsersData[0].firstName} </span>: اسم المستخدم
                    </>
                  )
                ) : null}
              </p>

              <p className="text-right font-bold mb-4">
                {user && user.UsersData && user.UsersData[0]
                  ? formatEmail(user.UsersData[0].email)
                  : null}
                : البريد الألكتروني
              </p>

              <p className="text-right font-bold mb-8">
                رقم الهاتف :
                <span>
                  {" "}
                  {user && user.UsersData[0].phoneNumber
                    ? user.UsersData[0].phoneNumber
                    : "لا يوجد رقم هاتف"}
                </span>
              </p>

              <div className="flex justify-end space-x-2">
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
                  تسجيل خروج
                </button>
                <Link to="/UserProfile" className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm">
                  تحديث
                </Link>
              </div>
            </div>
            <div className="bg-white text-black p-4 rounded-lg shadow mb-4 font-bold">
              <h2 className="text-xl mb-2 text-right pb-2 border-b-[2px] border-b-[solid] border-b-[black]">
                جديد التذاكر
              </h2>
              <div className="flex justify-center py-24 flex-col items-center h-24">
                <img src={services_svg} alt="Placeholder" className="mr-2" />
                <p className="text-gray-500 mt-2">
                  لا تمتلك طلبات خوادم / نطاقات
                </p>
                <Link
                  to="/VpsServer"
                  className="text-gray-500 hover:text-blue-500 mt-1"
                >
                  فتح تذكرة جديدة
                </Link>
              </div>
            </div>
            <div className="bg-white text-black p-4 rounded-lg shadow font-bold">
              <h2 className="text-xl mb-2 text-right pb-2 border-b-[2px] border-b-[solid] border-b-[black]">
                مكتبة الشروجات
              </h2>
              <div className="flex justify-center py-24 flex-col items-center h-24">
                <img src={services_svg} alt="Placeholder" className="mr-2" />
                <p className="text-gray-500 mt-2">لا يوجد شروحات حاليا</p>
              </div>
            </div>
          </div>
        </div>
      </div>}
      
      <Footer />
    </>
  );
};

export default ControlPanel;
