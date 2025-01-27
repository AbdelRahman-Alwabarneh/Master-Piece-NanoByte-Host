import React, { useState, useEffect } from "react";
import { X, Save, ToggleLeft, ToggleRight } from 'lucide-react';
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/DomainService/${id}`);
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
          `${import.meta.env.VITE_API_URL_ADMIN}/api/DomainService/${id}`,
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
    <div className="min-h-screen text-white font-cairo">
      <Sidebar />
      <div className="p-2 sm:p-4 md:mr-64 mr-[75px] text-sm mt-2">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-950 bg-opacity-30 hover:shadow-blue-800/10 rounded p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="flex justify-between border-b border-blue-700 pb-2 mb-4">
            <h2 className="text-lg font-semibold">تفاصيل النطاق</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                اسم الخطة
              </label>
              <input
                type="text"
                name="planName"
                value={domain.planName}
                onChange={handleChange}
                className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                placeholder="أدخل اسم الخطة"
                required
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                سعر الشراء
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    name="purchasePrice.oneYear"
                    value={domain.purchasePrice?.oneYear}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="سنة واحدة"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="purchasePrice.twoYears"
                    value={domain.purchasePrice?.twoYears}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="سنتان"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="purchasePrice.threeYears"
                    value={domain.purchasePrice?.threeYears}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="ثلاث سنوات"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                سعر التجديد
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    name="renewalPrice.oneYear"
                    value={domain.renewalPrice?.oneYear}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="سنة واحدة"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="renewalPrice.twoYears"
                    value={domain.renewalPrice?.twoYears}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="سنتان"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="renewalPrice.threeYears"
                    value={domain.renewalPrice?.threeYears}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="ثلاث سنوات"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                سعر النقل
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    name="transferPrice.oneYear"
                    value={domain.transferPrice?.oneYear}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="سنة واحدة"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="transferPrice.twoYears"
                    value={domain.transferPrice?.twoYears}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="سنتان"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="transferPrice.threeYears"
                    value={domain.transferPrice?.threeYears}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="ثلاث سنوات"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                رسوم التنصيب
              </label>
              <input
                type="number"
                name="setupFee"
                value={domain.setupFee}
                onChange={handleChange}
                className="w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                placeholder="أدخل رسوم التنصيب"
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
                  name="quantity"
                  value={domain.quantity || ''}
                  onChange={handleChange}
                  className={`w-full bg-gray-400/10 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200 ${domain.isUnlimited ? 'cursor-not-allowed' : ''}`}
                  placeholder="أدخل الكمية المتاحة"
                  disabled={domain.isUnlimited}
                />
                <div
                  onClick={handleToggleUnlimited}
                  className={`flex items-center space-x-2 text-sm cursor-pointer rounded mr-1 ${
                    domain.isUnlimited ? 'bg-green-600/90 hover:bg-green-600' : 'bg-gray-600/90 hover:bg-gray-600'
                  }`}
                >
                  <span
                    className={`flex items-center gap-2 px-2 py-2 rounded transition-colors ${
                      domain.isUnlimited ? "text-white/100" : "text-white/80"
                    } whitespace-nowrap`}
                  >
                    {domain.isUnlimited ? (
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
                رابط المنتج
              </label>
              <input
                type="text"
                name="productLink"
                value={domain.productLink}
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

export default DomainServiceDetails;