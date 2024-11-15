import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Search, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Trash } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const DomainServiceManagement = () => {
  const [domainData, setDomainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDomainData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2100/api/DomainService"
        );
        setDomainData(response.data.DomainServiceData);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchDomainData();
  }, []);

  const handleIsHiddenPlan = async (id, isHidden) => {
    const actionText = isHidden ? "إظهار" : "إخفاء";
    const successText = isHidden ? "تم إظهار" : "تم إخفاء";
    const confirmText = isHidden ? "هل تريد إظهار" : "هل تريد إخفاء";

    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: `${confirmText} خطة خدمة النطاق؟`,
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
          `http://localhost:2100/api/DomainService/${id}`
        );

        if (response.status !== 200) {
          throw new Error("Failed to update the plan");
        }

        setDomainData((plans) =>
          plans.map((plan) =>
            plan._id === id ? { ...plan, isHidden: !isHidden } : plan
          )
        );

        Swal.fire({
          title: `${successText}!`,
          text: `تم ${successText} خطة خدمة النطاق بنجاح.`,
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
          text: `حدث خطأ أثناء ${actionText} الخطة.`,
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

  const DomainServiceDetails = (DomainServiceId) => {
    navigate(`/DomainServiceDetails/${DomainServiceId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NoDataFound message={error} />;
  }

  if (!domainData.length) {
    return <NoDataFound />;
  }

  return (
    <div className="flex min-h-screen text-white font-cairo">
      <Sidebar />

      <div className="flex-grow p-2 sm:p-4 md:p-6 md:mr-64 mr-[75px] overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          إدارة خدمات النطاقات
        </h1>

        <div className="mb-5 flex justify-between items-center flex-wrap">
          <Link
            to="/AddDomainService"
            className="bg-gradient-to-r mt-3 sm:mt-0 from-[#1E38A3] to-[#2f64bb] hover:to-[#1E90FF] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-200"
          >
            + إضافة خطة جديدة
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="hidden md:table min-w-full bg-[#1E38A3] rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#2f64bb] text-white">
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">الرابط</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">اسم الخطة</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">رسوم الإعداد</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">سعر سنة واحدة</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {domainData.map((plan) => (
                <tr
                  key={plan._id}
                  className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center"
                >
                  <td
                    onClick={() => DomainServiceDetails(plan._id)}
                    className="p-2 sm:p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer"
                  >
                    {plan.productLink}
                  </td>
                  <td
                    onClick={() => DomainServiceDetails(plan._id)}
                    className="p-2 sm:p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer"
                  >
                    {plan.planName}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    ${plan.setupFee}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    ${plan.purchasePrice.oneYear}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm flex items-center justify-center">
                    <button
                      onClick={() => handleIsHiddenPlan(plan._id, plan.isHidden)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                        plan.isHidden
                          ? "bg-gray-600/90 hover:bg-gray-600"
                          : "bg-green-600/90 hover:bg-green-600"
                      }`}
                    >
                      {plan.isHidden ? (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>معطل</span>
                        </>
                      ) : (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          <span>فعال</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden grid grid-cols-1 gap-4">
          {domainData.map((plan) => (
            <div
              key={plan._id}
              className="bg-[#1E38A3] rounded-lg shadow-lg p-3 sm:p-4"
            >
              <p
                onClick={() => DomainServiceDetails(plan._id)}
                className="mb-2 text-sm hover:text-[#2fceff] cursor-pointer"
              >
                <span className="font-bold">الرابط: </span>
                {plan.productLink}
              </p>
              <p
                onClick={() => DomainServiceDetails(plan._id)}
                className="mb-2 text-sm hover:text-[#2fceff] cursor-pointer"
              >
                <span className="font-bold">اسم الخطة: </span>
                {plan.planName}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">رسوم الإعداد: </span>
                ${plan.setupFee}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">سعر سنة واحدة: </span>
                ${plan.purchasePrice.oneYear}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">تاريخ الإنشاء: </span>
                {new Date(plan.createdAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
              <button
                onClick={() => handleIsHiddenPlan(plan._id, plan.isHidden)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                  plan.isHidden
                    ? "bg-gray-600/90 hover:bg-gray-600"
                    : "bg-green-600/90 hover:bg-green-600"
                }`}
              >
                {plan.isHidden ? (
                  <>
                    <ToggleLeft className="w-4 h-4" />
                    <span>معطل</span>
                  </>
                ) : (
                  <>
                    <ToggleRight className="w-4 h-4" />
                    <span>فعال</span>
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

export default DomainServiceManagement;