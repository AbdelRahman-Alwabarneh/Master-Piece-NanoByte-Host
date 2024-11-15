import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";

const DomainServiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [domain, setDomain] = useState({
    planName: "",
    purchasePrice: {
      oneYear: "",
      twoYears: "",
      threeYears: ""
    },
    renewalPrice: {
      oneYear: "",
      twoYears: "",
      threeYears: ""
    },
    transferPrice: {
      oneYear: "",
      twoYears: "",
      threeYears: ""
    },
    setupFee: "",
    quantity: null,
    isUnlimited: true,
    productLink: ""
  });

  useEffect(() => {
    const fetchDomainDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:2100/api/DomainService/${id}`);
        if (response.status === 200) {
          setDomain(response.data.DomainServiceDetails);
        }
      } catch (error) {
        Swal.fire({
          title: "خطأ!",
          text: "حدث خطأ أثناء جلب البيانات",
          icon: "error",
          iconColor: "#ff0000",
          background: "#18296C",
          color: "#ffffff",
          confirmButtonColor: "#1E38A3",
          confirmButtonText: "موافق"
        });
        console.error("Error fetching domain details:", error);
      }
    };

    fetchDomainDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setDomain(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setDomain(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد تحديث تفاصيل النطاق؟",
        icon: "warning",
        iconColor: "#ffcc00",
        background: "#18296C",
        color: "#ffffff",
        showCancelButton: true,
        confirmButtonColor: "#1E38A3",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء"
      });

      if (result.isConfirmed) {
        const response = await axios.put(
          `http://localhost:2100/api/DomainService/${id}`,
          { planData: domain }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "تم التحديث!",
            text: "تم تحديث تفاصيل النطاق بنجاح.",
            icon: "success",
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "موافق"
          });
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
        confirmButtonText: "موافق"
      });
      console.error("Error:", error);
    }
  };

  const handleToggleUnlimited = () => {
    setDomain((prev) => ({
      ...prev,
      isUnlimited: !prev.isUnlimited,
      quantity: !prev.isUnlimited ? null : prev.quantity
    }));
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
              تفاصيل النطاق
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
                value={domain.planName}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="أدخل اسم الخطة"
                required
              />
            </div>

            <div className="grid grid-cols-1 col-span-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  سعر الشراء (سنة واحدة)
                </label>
                <input
                  type="number"
                  name="purchasePrice.oneYear"
                  value={domain.purchasePrice?.oneYear}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل سعر الشراء (سنة)"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  سعر الشراء (سنتان)
                </label>
                <input
                  type="number"
                  name="purchasePrice.twoYears"
                  value={domain.purchasePrice?.twoYears}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل سعر الشراء (سنتان)"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  سعر الشراء (ثلاث سنوات)
                </label>
                <input
                  type="number"
                  name="purchasePrice.threeYears"
                  value={domain.purchasePrice?.threeYears}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل سعر الشراء (ثلاث سنوات)"
                />
              </div>
            </div>
            
           <div className="grid grid-cols-1 col-span-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  سعر التجديد (سنة واحدة)
                </label>
                <input
                  type="number"
                  name="renewalPrice.oneYear"
                  value={domain.renewalPrice?.oneYear}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل سعر التجديد (سنة)"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  سعر التجديد (سنتان)
                </label>
                <input
                  type="number"
                  name="renewalPrice.twoYears"
                  value={domain.renewalPrice?.twoYears}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل سعر التجديد (سنتان)"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  سعر التجديد (ثلاث سنوات)
                </label>
                <input
                  type="number"
                  name="renewalPrice.threeYears"
                  value={domain.renewalPrice?.threeYears}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل سعر التجديد (ثلاث سنوات)"
                />
              </div>
           </div>

            <div className="grid grid-cols-1 col-span-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  سعر النقل (سنة واحدة)
                </label>
                <input
                  type="number"
                  name="transferPrice.oneYear"
                  value={domain.transferPrice?.oneYear}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل سعر النقل (سنة)"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  سعر النقل (سنتان)
                </label>
                <input
                  type="number"
                  name="transferPrice.twoYears"
                  value={domain.transferPrice?.twoYears}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل سعر النقل (سنتان)"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  سعر النقل (ثلاث سنوات)
                </label>
                <input
                  type="number"
                  name="transferPrice.threeYears"
                  value={domain.transferPrice?.threeYears}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل سعر النقل (ثلاث سنوات)"
                />
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                رسوم التنصيب
              </label>
              <input
                type="number"
                name="setupFee"
                value={domain.setupFee}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="أدخل رسوم التنصيب"
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
                    name="quantity"
                    value={domain.quantity || ''}
                    onChange={handleChange}
                    className={`w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200 ${domain.isUnlimited ? 'cursor-not-allowed' : ''}`}
                    placeholder="أدخل الكمية المتاحة"
                    disabled={domain.isUnlimited}
                  />
                </div>
                <div
                  onClick={handleToggleUnlimited}
                  className={`flex items-center space-x-2 cursor-pointer px-4 py-3 rounded-lg ${
                    domain.isUnlimited ? "bg-green-500" : "bg-white/5"
                  }`}
                >
                  <span className={`text-sm font-medium ${domain.isUnlimited ? "text-white" : "text-white/80"} whitespace-nowrap`}>
                    {domain.isUnlimited ? "لا نهائي" : "محدود"}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                رابط المنتج
              </label>
              <input
                type="text"
                name="productLink"
                value={domain.productLink}
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
              className="w-full sm:w-auto px-6 py-2 border border-white/30 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200 flex items-center justify-center ml-2"
            >
              <X className="w-5 h-5 ml-2" />
              رجوع
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
            >
              <Save className="w-5 h-5 ml-2" />
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DomainServiceDetails;