import React, { useEffect,useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchVPSData, HiddenVPSPlan} from "../../Redux/Slice/VPSManagementSlice";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Link, useNavigate } from "react-router-dom";
import { Search, Eye, Trash } from "lucide-react";
import Swal from "sweetalert2";

const VPSManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vpsList, status } = useSelector((state) => state.VPSData);


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVPSData());
    }
  }, [dispatch, status]);

  const handleVPSClick = (vpsId) => {
    navigate(`/VPSDetailsManagement/${vpsId}`);
  };

  const handleisHiddenPlan = async (id, isHidden) => {
    const actionText = isHidden ? "إخفاء" : "إظهار"; // تحديد النص بناءً على قيمة isHidden
    const successText = isHidden ? "تم إخفاء" : "تم إظهار";
    const confirmText = isHidden ? "هل تريد إخفاء" : "هل تريد إظهار";
  
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: `${confirmText} خطة الـ VPS؟`,
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
        dispatch(HiddenVPSPlan(id))
          .then(() => {
            Swal.fire({
              title: `${successText}!`,
              text: `تم ${successText} خطة الـ VPS بنجاح.`,
              icon: "success",
              iconColor: "#28a745", // لون الأيقونة (أخضر للتأكيد)
              background: "#18296C", // لون خلفية النافذة
              color: "#ffffff", // لون النص
              confirmButtonColor: "#1E38A3", // لون زر التأكيد
              confirmButtonText: "موافق",
              padding: "2em", // زيادة المساحة الداخلية قليلاً
              backdrop: "rgba(22, 30, 65, 0.8)", // خلفية مظللة
              position: "center",
            });
            dispatch(fetchVPSData()); // جلب البيانات مرة أخرى بعد الإجراء
          })
          .catch((error) => {
            Swal.fire({
              title: "خطأ!",
              text: `حدث خطأ أثناء ${actionText} الخطة.`,
              icon: "error",
              iconColor: "#ff0000", // لون الأيقونة (أحمر)
              background: "#18296C", // لون خلفية النافذة
              color: "#ffffff", // لون النص
              confirmButtonColor: "#1E38A3", // لون زر التأكيد
              confirmButtonText: "موافق",
              padding: "2em", // زيادة المساحة الداخلية قليلاً
              backdrop: "rgba(22, 30, 65, 0.8)", // خلفية مظللة
              position: "center",
            });
          });
      }
    });
  };
  
  

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed" || !vpsList || vpsList.length === 0) {
    return <NoDataFound />;
  }
  return (
    <div className="flex min-h-screen text-white font-cairo">
      <Sidebar />
      <div className="flex-grow p-2 sm:p-4 md:p-6 md:mr-64 mr-[75px] overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          جدول خطط الـ VPS
        </h1>

        {/* حقل البحث الاحترافي */}
        <div className="mb-5 flex justify-between items-center flex-wrap">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="ابحث عن خطة..."
              className="bg-[#1E38A3] border border-[#2f64bb] text-white py-2 px-4 pl-10 rounded-full shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#2f64bb] w-full"
            />
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>

          {/* زر إضافة خطة جديدة */}
          <Link
            to="/addVPSPlan"
            className="bg-gradient-to-r mt-3 sm:mt-0 from-[#1E38A3] to-[#2f64bb] hover:to-[#1E90FF] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-200"
          >
            + إضافة خطة جديدة
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="hidden md:table min-w-full bg-[#1E38A3] rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#2f64bb] text-white">
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  اسم الخطة
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  الذاكرة (RAM)
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  الأنوية (CPU)
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  التخزين
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  سرعة الاتصال
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                إخفاء/إظهار الخطة
                </th>
              </tr>
            </thead>
            <tbody>
              {vpsList.map((vpsPlan, index) => (
                <tr
                  key={vpsPlan._id}
                  className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center"
                >
                  <td className="p-2 sm:p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer">
                    <div onClick={() => handleVPSClick(vpsPlan._id)}>
                      {vpsPlan.planName}
                    </div>
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {vpsPlan.ram}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {vpsPlan.cpu}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {vpsPlan.storage}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {vpsPlan.connectionSpeed}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm flex items-center justify-center">
                    <button
                    onClick={() => handleisHiddenPlan(vpsPlan._id, vpsPlan.isHidden)}
                    className={`flex items-center justify-center space-x-1 p-2 sm:p-3 text-white rounded-md transition duration-300 
                    
                ${
                  vpsPlan.isHidden
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                    >
                      {vpsPlan.isHidden ? (
                        <>
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          {/* أيقونة الاسترجاع */}
                          <span>استرجاع</span>
                        </>
                      ) : (
                        <>
                          <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                          {/* أيقونة الحذف */}
                          <span>خذف</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {vpsList.map((vpsPlan, index) => (
            <div
              key={vpsPlan._id}
              className="bg-[#1E38A3] rounded-lg shadow-lg p-3 sm:p-4"
            >
              <p className="mb-2 text-sm">
                <span className="font-bold">المعرف: </span>
                {index + 1}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">اسم الخطة: </span>
                <span onClick={() => handleVPSClick(vpsPlan._id)}>
                  {vpsPlan.planName}
                </span>
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">الذاكرة (RAM): </span>
                {vpsPlan.ram}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">الأنوية (CPU): </span>
                {vpsPlan.cpu}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">التخزين: </span>
                {vpsPlan.storage}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">سرعة الاتصال: </span>
                {vpsPlan.connectionSpeed}
              </p>
            
              <button
                    onClick={() => handleisHiddenPlan(vpsPlan._id, vpsPlan.isHidden)}
                    className={`flex items-center justify-center space-x-1 p-2 sm:p-3 text-white rounded-md transition duration-300 
                    
                ${
                  vpsPlan.isHidden
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                    >
                      {vpsPlan.isHidden ? (
                        <>
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          {/* أيقونة الاسترجاع */}
                          <span>استرجاع</span>
                        </>
                      ) : (
                        <>
                          <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                          {/* أيقونة الحذف */}
                          <span>خذف</span>
                        </>
                      )}
                    </button>
            </div>
          ))}
        </div>

        {/* Pagination الاحترافي */}
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-1">
            <button className="bg-[#1E38A3] hover:bg-[#2f64bb] text-white py-1 px-3 rounded-md shadow-md transition duration-200 ml-1">
              السابقة
            </button>
            <button className="bg-[#1E38A3] text-white py-1 px-3 rounded-md shadow-md">
              1
            </button>
            <button className="bg-[#1E38A3] text-white py-1 px-3 rounded-md shadow-md">
              2
            </button>
            <button className="bg-[#1E38A3] text-white py-1 px-3 rounded-md shadow-md">
              3
            </button>
            <button className="bg-[#1E38A3] hover:bg-[#2f64bb] text-white py-1 px-3 rounded-md shadow-md transition duration-200">
              التالية
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default VPSManagement;
