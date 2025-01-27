import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Search, Plus, Eye, EyeOff ,ToggleLeft,ToggleRight} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const DiscountCodeManagement = () => {
  const [discountCodes, setDiscountCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscountCodes = async () => {
      try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL_ADMIN}/api/discountCode`
        );
        setDiscountCodes(response.data.DiscountCodeData);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountCodes();
  }, []);

  const handleIsActive = async (id, isActive) => {
    const actionText = isActive ? "تعطيل" : "تفعيل";
    const successText = isActive ? "تم تعطيل" : "تم تفعيل";
    const confirmText = isActive ? "هل تريد تعطيل" : "هل تريد تفعيل";

    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: `${confirmText} كود الخصم؟`,
      icon: "warning",
      iconColor: "#ffcc00",
      background: "#18296C",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#1E38A3",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
      padding: "2em",
      backdrop: "rgba(22, 30, 65, 0.8)",
      position: "center",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL_ADMIN}/api/discountCode/${id}`
        );

        if (response.status !== 200) {
          throw new Error("فشل في تحديث حالة الكود");
        }

        setDiscountCodes((codes) =>
          codes.map((code) =>
            code._id === id ? { ...code, isActive: !isActive } : code
          )
        );

        Swal.fire({
          title: `${successText}!`,
          text: `تم ${successText} كود الخصم بنجاح.`,
          icon: "success",
          iconColor: "#28a745",
          background: "#18296C",
          color: "#ffffff",
          confirmButtonColor: "#1E38A3",
          confirmButtonText: "موافق",
          padding: "2em",
          backdrop: "rgba(22, 30, 65, 0.8)",
          position: "center",
        });
      } catch (error) {
        Swal.fire({
          title: "خطأ!",
          text: `حدث خطأ أثناء ${actionText} الكود.`,
          icon: "error",
          iconColor: "#ff0000",
          background: "#18296C",
          color: "#ffffff",
          confirmButtonColor: "#1E38A3",
          confirmButtonText: "موافق",
          padding: "2em",
          backdrop: "rgba(22, 30, 65, 0.8)",
          position: "center",
        });
      }
    }
  };

  const DiscountCodeDetails = (discountCodeId) => {
    navigate(`/DetailsDiscountCode/${discountCodeId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NoDataFound message={error} />;
  }

  if (!discountCodes.length) {
    return <NoDataFound />;
  }

  return (
    <div className="flex min-h-screen text-white font-cairo">
      <Sidebar />

      <div className="flex-grow p-2 sm:p-4 md:p-6 md:mr-64 mr-[75px] overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          إدارة أكواد الخصم
        </h1>

        <div className="mb-5 flex justify-between items-center flex-wrap">
          <Link
            to="/AddDiscountCode"
            className="bg-gradient-to-r mt-3 sm:mt-0 from-[#1E38A3] to-[#2f64bb] hover:to-[#1E90FF] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-200"
          >
            + إضافة كود خصم جديد
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="hidden md:table min-w-full bg-[#1E38A3] rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#2f64bb] text-white">
                <th className="p-3 text-center text-xs sm:text-sm font-bold">
                  اسم الكود
                </th>
                <th className="p-3 text-center text-xs sm:text-sm font-bold">
                  قيمة الخصم
                </th>
                <th className="p-3 text-center text-xs sm:text-sm font-bold">
                  نوع الخصم
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                تاريخ البدء
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                تاريخ الانتهاء
                </th>
                <th className="p-3 text-center text-xs sm:text-sm font-bold">
                  الحالة
                </th>
                <th className="p-3 text-center text-xs sm:text-sm font-bold">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {discountCodes.map((code) => (
                <tr
                  key={code._id}
                  className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center"
                >
                  <td
                    onClick={() => DiscountCodeDetails(code._id)}
                    className="p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer"
                  >
                    {code.codeName}
                  </td>
                  <td className="p-3 text-xs sm:text-sm">
                    {code.discountValue}
                    {code.discountType === "percentage" ? "%" : ""}
                  </td>
                  <td className="p-3 text-xs sm:text-sm">
                    {code.discountType === "percentage"
                      ? "نسبة مئوية"
                      : "مبلغ ثابت"}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {
                        code.expiresAt ?      new Date(code.startTime).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          : "لايوجد تاريخ بدء"
                    }
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {
                        code.expiresAt ?      new Date(code.expiresAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          : "لايوجد تاريخ انتهاء"
                    }
                  </td>
                  <td className="p-3 text-xs sm:text-sm">
                    {code.isActive ? (
                      <span className="text-green-500 font-bold">نشط</span>
                    ) : (
                      <span className="text-red-500 font-bold">غير نشط</span>
                    )}
                  </td>
                  <td className="p-3 text-xs sm:text-sm flex items-center justify-center">
                    <button
                 onClick={() => handleIsActive(code._id, code.isActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                  code.isActive ? 'bg-green-600/90 hover:bg-green-600' : 'bg-gray-600/90 hover:bg-gray-600'
                }`}
              >
                {code.isActive ? (
                  <>
                    <ToggleRight className="w-4 h-4" />
                    <span>فعال</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4" />
                    <span>معطل</span>
                  </>
                )}
              </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* عرض البطاقات على الشاشات الصغيرة */}
        <div className="md:hidden grid grid-cols-1 gap-4">
  {discountCodes.map((code) => (
    <div
      key={code._id}
      className="bg-[#1E38A3] rounded-lg shadow-lg p-3 sm:p-4"
    >
      <p
        onClick={() => DiscountCodeDetails(code._id)}
        className="mb-2 text-sm hover:text-[#2fceff] cursor-pointer"
      >
        <span className="font-bold">اسم الكود: </span>
        {code.codeName}
      </p>
      <p className="mb-2 text-sm">
        <span className="font-bold">قيمة الخصم: </span>
        {code.discountValue}
        {code.discountType === "percentage" ? "%" : ""}
      </p>
      <p className="mb-2 text-sm">
        <span className="font-bold">نوع الخصم: </span>
        {code.discountType === "percentage" ? "نسبة مئوية" : "مبلغ ثابت"}
      </p>
      <p className="mb-2 text-sm">
        <span className="font-bold">تاريخ البدء: </span>
        {code.startTime ? new Date(code.startTime).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }) : "لايوجد تاريخ بدء"}
      </p>
      <p className="mb-2 text-sm">
        <span className="font-bold">تاريخ الانتهاء: </span>
        {code.expiresAt ? new Date(code.expiresAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }) : "لايوجد تاريخ انتهاء"}
      </p>
      <p className="mb-2 text-sm">
        <span className="font-bold">الحالة: </span>
        {code.isActive ? "نشط" : "غير نشط"}
      </p>
      <button
                 onClick={() => handleIsActive(code._id, code.isActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                  code.isActive ? 'bg-green-600/90 hover:bg-green-600' : 'bg-gray-600/90 hover:bg-gray-600'
                }`}
              >
                {code.isActive ? (
                  <>
                    <ToggleRight className="w-4 h-4" />
                    <span>فعال</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4" />
                    <span>معطل</span>
                  </>
                )}
              </button>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default DiscountCodeManagement;
