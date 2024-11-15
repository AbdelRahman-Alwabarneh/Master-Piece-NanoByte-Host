import React, { useState, useEffect } from "react";
import { Save, X, ToggleLeft, ToggleRight } from "lucide-react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import axios from "axios";

const WebsiteHostingDetails = () => {
  const [isUnlimited, setIsUnlimited] = useState(true);
  const { id } = useParams();

  const [plan, setPlan] = useState({
    planName: "",
    subtitle: "",
    subscriptionOptions: {
      oneMonth: { price: "", enabled: true },
      twoMonths: { price: "", enabled: true },
      threeMonths: { price: "", enabled: true },
      fourMonths: { price: "", enabled: true },
      fiveMonths: { price: "", enabled: true },
      sixMonths: { price: "", enabled: true },
    },
    setupCost: "",
    availableQuantity: null,
    unlimited: true,
    description: "",
    hidden: false,
    link: "",
    operatingSystem: "Linux",
  });

  useEffect(() => {
    if (id) {
      fetchWebsiteHostingDetails(id);
    }
  }, [id]);

  const fetchWebsiteHostingDetails = async (hostingId) => {
    try {
      const response = await axios.get(
        `http://localhost:2100/api/websiteHosting/${hostingId}`
      );
      const hostingData = response.data.WebsiteHostingDetails;
      setPlan(hostingData);
      setIsUnlimited(hostingData.unlimited);
    } catch (error) {
      console.error("Error fetching website hosting details:", error);
    }
  };

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
      subscriptionOptions: {
        ...prev.subscriptionOptions,
        [duration]: {
          ...prev.subscriptionOptions[duration],
          price: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد تحديث تفاصيل استضافة الموقع؟",
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
        const response = await axios.put(
          `http://localhost:2100/api/websiteHosting/${id}`,
          { serverData: plan }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "تم التحديث!",
            text: "تم تحديث تفاصيل استضافة الموقع بنجاح.",
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
          fetchWebsiteHostingDetails(id);
        } else {
          throw new Error("حدث خطأ أثناء التحديث");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ!",
        text: "حدث خطأ أثناء تحديث البيانات. الرجاء المحاولة مرة أخرى.",
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
      console.error("Error:", error);
    }
  };

  const handleToggleUnlimited = () => {
    setPlan((prev) => ({
      ...prev,
      unlimited: !prev.unlimited,
    }));
    setIsUnlimited(!isUnlimited);
  };

  return (
    <div className="min-h-screen  text-white font-cairo">
    <Sidebar />
    <div className="p-2 sm:p-4 md:mr-64 mr-[75px] text-sm mt-2">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-950 bg-opacity-30 hover:shadow-blue-800/10 rounded p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl"
      >
     <div className="flex justify-between border-b border-blue-700 pb-2 mb-4">
            <h2 className="text-lg font-semibold">تفاصيل استضافة الموقع</h2>
          </div>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-xs font-medium text-gray-300 mb-1">
              اسم الخطة
            </label>
            <input
              type="text"
              name="planName"
              value={plan.planName}
              onChange={handleChange}
              className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
              placeholder="أدخل اسم الخطة"
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-xs font-medium text-gray-300 mb-1">
              العنوان الفرعي
            </label>
            <input
              type="text"
              name="subtitle"
              value={plan.subtitle}
              onChange={handleChange}
              className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
              placeholder="أدخل العنوان الفرعي"
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-xs font-medium text-gray-300 mb-1">
              الأسعار حسب المدة
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(plan.subscriptionOptions).map(
                ([duration, { price, enabled }], index) => (
                  <div key={duration} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs text-white/60">
                        {index === 0
                          ? "الشهر الأول"
                          : index === 1
                          ? "الشهر الثاني"
                          : index === 2
                          ? "الشهر الثالث"
                          : index === 3
                          ? "الشهر الرابع"
                          : index === 4
                          ? "الشهر الخامس"
                          : index === 5
                          ? "الشهر السادس"
                          : ""}
                      </label>
                    </div>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => handlePriceChange(duration, e.target.value)}
                      className={`w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200 ${
                        !enabled ? "opacity-50" : ""
                      }`}
                      placeholder="السعر"
                      disabled={!enabled}
                      required={index === 0}
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-xs font-medium text-gray-300 mb-1">
              رسوم الإعداد
            </label>
            <input
              type="number"
              name="setupCost"
              value={plan.setupCost}
              onChange={handleChange}
              className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
              placeholder="أدخل رسوم الإعداد"
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-xs font-medium text-gray-300 mb-1">
              الكمية المتاحة
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="availableQuantity"
                value={plan.availableQuantity}
                onChange={handleChange}
                className={`w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200 ${
                  isUnlimited ? "cursor-not-allowed" : ""
                }`}
                placeholder="أدخل الكمية المتاحة"
                disabled={isUnlimited}
              />
     <div
                    onClick={handleToggleUnlimited}
                    className={`flex items-center space-x-2 text-sm cursor-pointer rounded mr-1 ${
                      isUnlimited ? 'bg-green-600/90 hover:bg-green-600' : 'bg-gray-600/90 hover:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`flex items-center gap-2 px-2 py-2 rounded transition-colors ${
                        isUnlimited ? "text-white/100" : "text-white/80"
                      } whitespace-nowrap`}
                    >
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
            <label className="block text-xs font-medium text-gray-300 mb-1">
              وصف الخطة
            </label>
            <textarea
              name="description"
              value={plan.description}
              onChange={handleChange}
              className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
              placeholder="أدخل وصف الخطة"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-xs font-medium text-gray-300 mb-1">
              رابط المنتج
            </label>
            <input
              type="text"
              name="link"
              value={plan.link}
              onChange={handleChange}
              className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
              placeholder="https://example.com/(product)"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
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
            </div>
      </form>
    </div>
  </div>
  
  );
};

export default WebsiteHostingDetails;