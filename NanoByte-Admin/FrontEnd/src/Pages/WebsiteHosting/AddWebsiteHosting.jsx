import React, { useState } from "react";
import { Save, X } from "lucide-react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";

const AddWebsiteHosting = () => {
  const navigate = useNavigate();
  const [isUnlimited, setIsUnlimited] = useState(true);
  
  const [hosting, setHosting] = useState({
    planName: "",
    subtitle: "",
    description: "",
    link: "",
    setupCost: "",
    availableQuantity: null,
    unlimited: true,
    hidden: false,
    operatingSystem: "",
    subscriptionOptions: {
      oneMonth: { price: "", enabled: true },
      twoMonths: { price: "", enabled: true },
      threeMonths: { price: "", enabled: true },
      fourMonths: { price: "", enabled: true },
      fiveMonths: { price: "", enabled: true },
      sixMonths: { price: "", enabled: true },
    }
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHosting((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePriceChange = (duration, value) => {
    setHosting((prev) => ({
      ...prev,
      subscriptionOptions: {
        ...prev.subscriptionOptions,
        [duration]: {
          ...prev.subscriptionOptions[duration],
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
        text: "هل تريد إضافة خطة استضافة المواقع الجديدة؟",
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
        const response = await axios.post(
          "http://localhost:2100/api/websiteHosting",
          { hostingData: hosting }
        );
  
        if (response.status === 201) {
          const newHostingId = response.data.server._id;
          Swal.fire({
            title: "تمت الإضافة!",
            text: "تم إضافة خطة استضافة المواقع بنجاح.",
            icon: "success",
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "موافق",
          }).then(() => {
            navigate(`/WebsiteHostingDetails/${newHostingId}`);
          });
        } else {
          throw new Error("حدث خطأ أثناء الإضافة");
        }
      }
    } catch (error) {
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
    setHosting((prev) => ({
      ...prev,
      unlimited: !prev.unlimited,
      availableQuantity: !prev.unlimited ? null : prev.availableQuantity
    }));
    setIsUnlimited(!isUnlimited);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br text-white font-cairo">
      <Sidebar />
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 md:mr-64 mr-[75px]">
        <form
          onSubmit={handleSubmit}
          className="mx-auto bg-white/5 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-4 sm:px-8 sm:py-6 border-b border-white/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              إضافة خطة استضافة مواقع جديدة
            </h2>
          </div>
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                اسم الخطة
              </label>
              <input
                type="text"
                name="planName"
                value={hosting.planName}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="أدخل اسم الخطة"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                العنوان الفرعي
              </label>
              <input
                type="text"
                name="subtitle"
                value={hosting.subtitle}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="أدخل العنوان الفرعي"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                نظام التشغيل
              </label>
              <input
                type="text"
                name="operatingSystem"
                value={hosting.operatingSystem}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="أدخل نظام التشغيل"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                الأسعار حسب المدة
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(hosting.subscriptionOptions).map(([duration, { price, enabled }]) => (
                  <div key={duration} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs text-white/60">
                        {duration === 'oneMonth' ? 'شهر' : `${duration.replace('Months', '')} أشهر`}
                      </label>
                    </div>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => handlePriceChange(duration, e.target.value)}
                      className={`w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200 ${!enabled ? 'opacity-50' : ''}`}
                      placeholder="السعر"
                      disabled={!enabled}
                      required={enabled}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                رسوم الإعداد
              </label>
              <input
                type="number"
                name="setupCost"
                value={hosting.setupCost}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="أدخل رسوم الإعداد"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                الكمية المتاحة
              </label>
              <div className="flex items-center">
                <div className="flex-grow ml-2">
                  <input
                    type="number"
                    name="availableQuantity"
                    value={hosting.availableQuantity || ''}
                    onChange={handleChange}
                    className={`w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200 ${isUnlimited ? 'cursor-not-allowed' : ''}`}
                    placeholder="أدخل الكمية المتاحة"
                    disabled={isUnlimited}
                  />
                </div>
                <div
                  onClick={handleToggleUnlimited}
                  className={`flex items-center space-x-2 cursor-pointer px-4 py-3 rounded-lg ${
                    isUnlimited ? "bg-green-500" : "bg-white/5"
                  }`}
                >
                  <span className={`text-sm font-medium ${isUnlimited ? "text-white" : "text-white/80"} whitespace-nowrap`}>
                    {isUnlimited ? "لا نهائي" : "محدود"}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                وصف الخطة
              </label>
              <textarea
                name="description"
                value={hosting.description}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="أدخل وصف الخطة"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                رابط المنتج
              </label>
              <input
                type="text"
                name="link"
                value={hosting.link}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="https://example.com/(product)"
                required
              />
            </div>
          </div>
          <div className="px-6 py-4 sm:px-8 sm:py-6 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full ml-2 sm:w-auto px-6 py-2 border border-white/30 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200 flex items-center justify-center"
            >
              <X className="w-5 h-5 ml-2" />
              إلغاء
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
            >
              <Save className="w-5 h-5 ml-2" />
              حفظ الخطة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWebsiteHosting;