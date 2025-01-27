import React, { useState } from "react";
import { X, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";

const AddDedicatedServer = () => {
  const navigate = useNavigate();
  const [isUnlimited, setIsUnlimited] = useState(true);
  
  const [plan, setPlan] = useState({
    planTitle: "",
    secondaryTitle: "",
    subscriptionDurations: {
      oneMonth: { price: "", enabled: true },
      twoMonths: { price: "", enabled: true },
      threeMonths: { price: "", enabled: true },
      fourMonths: { price: "", enabled: true },
      fiveMonths: { price: "", enabled: true },
      sixMonths: { price: "", enabled: true },
    },
    setupFee: "",
    quantity: null,
    isUnlimited: true,
    planDescription: "",
    isHidden: false,
    productLink: "",
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlan((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePriceChange = (duration, value) => {
    setPlan((prev) => ({
      ...prev,
      subscriptionDurations: {
        ...prev.subscriptionDurations,
        [duration]: {
          ...prev.subscriptionDurations[duration],
          price: value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد إضافة خطة الخادم المركزي الجديدة؟",
        icon: "warning",
        iconColor: "#ffcc00",
        background: "#18296C",
        color: "#ffffff",
        showCancelButton: true,
        confirmButtonColor: "#1E38A3",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
      });
  
      if (result.isConfirmed) {
        // إرسال البيانات إلى الـ API باستخدام axios
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL_ADMIN}/api/DedicatedServerManagement`,
            { serverData: plan } // تمرير plan داخل كائن serverData
          );
  
        // تحقق من نجاح العملية
        if (response.status === 201) {
            const newServerId = response.data.server._id; // افتراض أن الخادم يرجع الـ id في هذا المسار
            Swal.fire({
              title: "تمت الإضافة!",
              text: "تم إضافة خطة الخادم المركزي بنجاح.",
              icon: "success",
              iconColor: "#28a745",
              background: "#18296C",
              color: "#ffffff",
              confirmButtonColor: "#1E38A3",
              confirmButtonText: "موافق",
            }).then(() => {
              navigate(`/DedicatedServerDetails/${newServerId}`);
            });
        } else {
          throw new Error("حدث خطأ أثناء الإضافة");
        }
      }
    } catch (error) {
      // عرض رسالة خطأ في حالة الفشل
      Swal.fire({
        title: "خطأ!",
        text: "حدث خطأ أثناء إرسال البيانات. الرجاء المحاولة مرة أخرى.",
        icon: "error",
        iconColor: "#ff0000",
        background: "#18296C",
        color: "#ffffff",
        confirmButtonColor: "#1E38A3",
        confirmButtonText: "موافق",
      });
      console.error("Error:", error);
    }
  };
  

  const handleToggleUnlimited = () => {
    setPlan((prev) => ({
      ...prev,
      isUnlimited: !prev.isUnlimited,
      quantity: !prev.isUnlimited ? null : prev.quantity
    }));
    setIsUnlimited(!isUnlimited);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white font-cairo">
    <Sidebar />
    <div className="p-2 sm:p-4 md:mr-64 mr-[75px] text-sm mt-2">
      <div className="max-w-full mx-auto">
        <div className="bg-blue-950 bg-opacity-30 hover:shadow-blue-800/10 rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="flex justify-between border-b border-blue-700 pb-2 mb-4">
            <h2 className="text-lg font-semibold">إضافة خطة خادم مركزي جديدة</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">عنوان الخطة</label>
                <input
                  type="text"
                  name="planTitle"
                  value={plan.planTitle ?? ""}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل عنوان الخطة"
                  required
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">العنوان الثانوي</label>
                <input
                  type="text"
                  name="secondaryTitle"
                  value={plan.secondaryTitle ?? ""}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل العنوان الثانوي"
                  required
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">الأسعار حسب المدة</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(plan.subscriptionDurations).map(([duration, { price, enabled }]) => (
                    <div key={duration} className="flex flex-col">
                      <label className="text-xs text-white/60 mb-1">
                        {duration === 'oneMonth' ? 'شهر' : `${duration.replace('Months', '')} أشهر`}
                      </label>
                      <input
                        type="number"
                        value={price ?? ""}
                        onChange={(e) => handlePriceChange(duration, e.target.value)}
                        className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                        placeholder="السعر"
                        disabled={!enabled}
                        required={enabled}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">رسوم الإعداد</label>
                <input
                  type="number"
                  name="setupFee"
                  value={plan.setupFee ?? ""}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل رسوم الأعداد"
                  required
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">الكمية</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="quantity"
                    value={plan.quantity ?? ""}
                    onChange={handleChange}
                    className={`${isUnlimited ? "cursor-not-allowed" : ""} w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200`}
                    placeholder="أدخل الكمية"
                    disabled={isUnlimited}
                    readOnly={isUnlimited}
                  />
                  <div
                    onClick={handleToggleUnlimited}
                    className={`flex items-center space-x-2 text-sm cursor-pointer rounded mr-1 ${
                      isUnlimited ? 'bg-green-600/90 hover:bg-green-600' : 'bg-gray-600/90 hover:bg-gray-600'
                    }`}
                  >
                    <span className={`flex items-center gap-2 px-2 py-2 rounded transition-colors ${
                      isUnlimited ? "text-white/100" : "text-white/80"
                    } whitespace-nowrap`}>
                      {isUnlimited ? (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          <span>لانهائي</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>لانهائي</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">وصف الخطة</label>
                <textarea
                  name="planDescription"
                  value={plan.planDescription ?? ""}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل وصف الخطة"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">رابط المنتج</label>
                <input
                  type="text"
                  name="productLink"
                  value={plan.productLink ?? ""}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="https://example.com/(product)"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600/90 hover:bg-gray-600 rounded flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                حفظ الخطة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddDedicatedServer;