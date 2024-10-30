import React, { useState, useEffect } from "react";
import { Save, X, Calendar, Filter } from "lucide-react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import UserSidebar from "../../../Components/UserSidebar/UserSidebar";
import Loading from "../../../Components/Loading/Loading";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
const ServiceManagement = () => {
  const [serviceData, setServiceData] = useState({
    orderNumber: "",
    bookingDate: "",
    initialPayment: "",
    renewalAmount: "",
    nextPaymentDate: "",
    expiryDate: "",
    billingCycle: "",
    paymentMethod: "",
    discountCode: "",
    productType: "",
    domain: "",
    ipAddress: "",
    username: "",
    password: "",
    status: "",
    operatingSystem: "Windows-Server-2019",
    adminNotes: "",
  });

  const { id, OrderNumber } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [discountCodes, setDiscountCodes] = useState([]);
  const [isLoadingDiscounts, setIsLoadingDiscounts] = useState(false);
  const [hasInitialDiscountCode, setHasInitialDiscountCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // تنسيق التاريخ للـ datetime-local
  const formatDateTimeLocal = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  // جلب بيانات الخدمة
  const fetchServiceData = async () => {
    if (!id || !OrderNumber) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:2100/api/service/getService/${id}/${OrderNumber}`
      );

      if (response.data && response.data.service) {
        const serviceInfo = response.data.service;

        setServiceData((prev) => ({
          ...prev,
          serviceId: serviceInfo._id || "",
          orderNumber: serviceInfo.OrderNumber || "",
          domain: serviceInfo.domain || "",
          ipAddress: serviceInfo.privateIP || "", // تم تغيير من ipAddress إلى privateIP
          username: serviceInfo.username || "",
          password: serviceInfo.password || "",
          status: serviceInfo.status || "",
          operatingSystem: serviceInfo.operatingSystem || "Windows-Server-2019",
          adminNotes: serviceInfo.adminNotes || "",
        }));

        // بعد نجاح جلب بيانات الخدمة، نقوم بجلب بيانات الطلب
        await fetchOrderData();
      } else {
        throw new Error("No service data found");
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
      setError("فشل في جلب بيانات الخدمة");
    } finally {
      setIsLoading(false);
    }
  };

  // جلب بيانات الطلب
  const fetchOrderData = async () => {
    if (!OrderNumber) return;

    try {
      const response = await axios.post(
        `http://localhost:2100/api/order/${OrderNumber}`
      );
      const orderData = response.data;

      if (orderData) {
        setServiceData((prev) => ({
          ...prev,
          orderNumber: orderData.orderNumber || "",
          bookingDate: formatDateTimeLocal(orderData.createdAt),

          initialPayment: orderData.amount || "",
          renewalAmount: orderData.renewalFee || "",
          nextPaymentDate: orderData.nextPaymentDate
            ? new Date(orderData.nextPaymentDate).toISOString().split("T")[0]
            : "",
          expiryDate: orderData.expirationDate
            ? new Date(orderData.expirationDate).toISOString().split("T")[0]
            : "",
          billingCycle: orderData.Subscriptionduration || "",
          paymentMethod: orderData.paymentMethod || "",
          discountCode: orderData.discountCode || "",
          productType: orderData.planName || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  // جلب أكواد الخصم
  const fetchDiscountCodes = async () => {
    setIsLoadingDiscounts(true);
    try {
      const response = await axios.get(import.meta.env.VITE_DISCOUNT_CODE);
      setDiscountCodes(response.data.DiscountCodeData);
      
      // إذا كان هناك كود خصم موجود، ابحث عن تفاصيله
      if (serviceData.discountCode) {
        const matchingCode = response.data.DiscountCodeData.find(
          code => code.codeName === serviceData.discountCode
        );
        if (matchingCode) {
          // هنا يمكنك تحديث أي معلومات إضافية متعلقة بالخصم
          setServiceData(prev => ({
            ...prev,
            discountValue: matchingCode.discountValue
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching discount codes:", error);
    } finally {
      setIsLoadingDiscounts(false);
    }
  };

  // Effects
  useEffect(() => {
    fetchServiceData();
  }, [id, OrderNumber]);

  useEffect(() => {
    if (serviceData.discountCode) {
      fetchDiscountCodes();
    }
  }, [serviceData.discountCode]);

  const handleDiscountDropdownClick = () => {
    if (!hasInitialDiscountCode && discountCodes.length === 0) {
      fetchDiscountCodes();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد تعديل بيانات الخدمة؟",
        icon: "warning",
        iconColor: "#ffcc00",
        background: "#18296C",
        color: "#ffffff",
        showCancelButton: true,
        confirmButtonColor: "#1E38A3",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، قم بالتعديل",
        cancelButtonText: "إلغاء"
      });
  
      if (result.isConfirmed) {
        const response = await axios.patch(
          `http://localhost:2100/api/service/${serviceData.serviceId}`,
          {
            userId: id,
            OrderNumber,
            domain: serviceData.domain,
            ipAddress: serviceData.ipAddress, // سيتم إرساله كـ privateIP في الباك اند
            username: serviceData.username,
            password: serviceData.password,
            status: serviceData.status,
            operatingSystem: serviceData.operatingSystem,
            adminNotes: serviceData.adminNotes,
          }
        );
  
        if (response.status === 200) {
          Swal.fire({
            title: 'تم بنجاح!',
            text: 'تم تعديل بيانات الخدمة بنجاح.',
            icon: 'success',
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: 'حسناً'
          });
        } else {
          throw new Error("حدث خطأ أثناء التعديل");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ!",
        text: "فشل في تعديل بيانات الخدمة.",
        icon: "error",
        iconColor: "#ff0000",
        background: "#18296C",
        color: "#ffffff",
        confirmButtonColor: "#1E38A3",
        confirmButtonText: "موافق"
      });
      console.error("Error updating service:", error);
    }
  };

  const operatingSystems = ["Windows-Server-2019", "Windows-Server-2012"];

  const statusOptions = [
    { value: "pending", label: "قيد الأنشاء" },
    { value: "active", label: "نشط" },
    { value: "expired", label: "منتهي" },
    { value: "cancelled", label: "ملغي" },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NoDataFound />;
  }
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white p-2 sm:p-4 font-cairo md:mr-64 mr-[75px] text-sm mt-6">
        <div className="max-w-7xl mx-auto">
          <UserSidebar />
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header Section */}
            <div className="bg-blue-900 bg-opacity-70 rounded-lg p-3 sm:p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center border-b border-blue-700 pb-2">
                إدارة الخدمات
              </h2>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Order Information Section */}
                <div className="lg:col-span-2 bg-blue-800 bg-opacity-50 rounded-lg p-3 sm:p-4 shadow-lg">
                  <h3 className="text-sm font-semibold mb-3 flex items-center border-b border-blue-700 pb-2">
                    معلومات الطلب
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        رقم الطلب
                      </label>
                      <div className="flex items-center bg-blue-900 bg-opacity-50 rounded border border-blue-700 px-2">
                        <input
                          type="text"
                          name="orderNumber"
                          value={serviceData.orderNumber}
                          onChange={handleChange}
                          onBlur={(e) => fetchOrderData(e.target.value)}
                          className="w-full bg-transparent focus:outline-none text-xs py-1.5"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        تاريخ الحجز
                      </label>
                      <div className="relative">
                        <input
                          type="datetime-local"
                          name="bookingDate"
                          value={serviceData.bookingDate}
                          onChange={handleChange}
                          className="w-full [&::-webkit-calendar-picker-indicator]:opacity-0 bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                          required
                        />
                        <Calendar
                          className="absolute top-2.5 right-3 h-3 w-3 text-white/50 cursor-pointer"
                          onClick={() =>
                            document
                              .querySelector('input[name="bookingDate"]')
                              .showPicker()
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        قيمة أول دفعة
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="initialPayment"
                          value={serviceData.initialPayment}
                          onChange={handleChange}
                          className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs pl-2 pr-10 py-1.5 transition-all"
                          required
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                          USD
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        قيمة التجديد
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="renewalAmount"
                          value={serviceData.renewalAmount}
                          onChange={handleChange}
                          className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs pl-2 pr-10 py-1.5 transition-all"
                          required
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                          USD
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        تاريخ الدفع القادم
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="nextPaymentDate"
                          value={serviceData.nextPaymentDate}
                          onChange={handleChange}
                          className="w-full [&::-webkit-calendar-picker-indicator]:opacity-0 bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                          required
                        />
                        <Calendar
                          className="absolute top-2.5 right-3 h-3 w-3 text-white/50 cursor-pointer"
                          onClick={() =>
                            document
                              .querySelector('input[name="nextPaymentDate"]')
                              .showPicker()
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        تاريخ الانتهاء
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="expiryDate"
                          value={serviceData.expiryDate}
                          onChange={handleChange}
                          className="w-full [&::-webkit-calendar-picker-indicator]:opacity-0 bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                          required
                        />
                        <Calendar
                          className="absolute top-2.5 right-3 h-3 w-3 text-white/50 cursor-pointer"
                          onClick={() =>
                            document
                              .querySelector('input[name="expiryDate"]')
                              .showPicker()
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information Section */}
                <div className="bg-blue-800 bg-opacity-50 rounded-lg p-3 sm:p-4 shadow-lg">
                  <h3 className="text-sm font-semibold mb-3 flex items-center border-b border-blue-700 pb-2">
                    معلومات الدفع
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        دورة الفواتير
                      </label>
                      <select
                        name="billingCycle"
                        value={serviceData.billingCycle}
                        onChange={handleChange}
                        className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                        required
                      >
                        <option value="شهر واحد">شهر واحد</option>
                        <option value="شهرين">شهرين</option>
                        <option value="ثلاثة أشهر">ثلاثة أشهر</option>
                        <option value="أربعة أشهر">أربعة أشهر</option>
                        <option value="خمسة أشهر">خمسة أشهر</option>
                        <option value="ستة أشهر">ستة أشهر</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        طريقة الدفع
                      </label>
                      <select
                        name="paymentMethod"
                        value={serviceData.paymentMethod}
                        onChange={handleChange}
                        className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                        required
                      >
                        <option value="PayPal">PayPal</option>
                        <option value="Visa / MasterCard">
                          Visa / MasterCard
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        كود الخصم
                      </label>
                      <select
                        name="discountCode"
                        value={serviceData.discountCode}
                        onChange={handleChange}
                        onClick={handleDiscountDropdownClick}
                        className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                      >
                        <option value="">اختر كود الخصم</option>
                        {isLoadingDiscounts ? (
                          <option value="" disabled>
                            جاري التحميل...
                          </option>
                        ) : (
                          discountCodes.map((code) => (
                            <option key={code._id} value={code.codeName}>
                              {code.codeName} - {code.discountValue}%
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                {/* Server Information Section */}
                <div className="lg:col-span-3 bg-blue-800 bg-opacity-50 rounded-lg p-3 sm:p-4 shadow-lg">
                  <h3 className="text-sm font-semibold mb-3 flex items-center border-b border-blue-700 pb-2">
                    معلومات الخادم
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        نوع المنتج
                      </label>
                      <input
                        type="text"
                        name="productType"
                        value={serviceData.productType}
                        onChange={handleChange}
                        className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        النطاق
                      </label>
                      <input
                        type="text"
                        name="domain"
                        value={serviceData.domain}
                        onChange={handleChange}
                        className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        IP الخاص
                      </label>
                      <input
                        type="text"
                        name="ipAddress"
                        value={serviceData.ipAddress}
                        onChange={handleChange}
                        className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        اسم المستخدم
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={serviceData.username}
                        onChange={handleChange}
                        className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        كلمة السر
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={serviceData.password}
                          onChange={handleChange}
                          className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs pl-2 pr-8 py-1.5 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs transition-colors"
                        >
                          {showPassword ? "إخفاء" : "إظهار"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        الحالة
                      </label>
                      <select
                        name="status"
                        value={serviceData.status}
                        onChange={handleChange}
                        className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        نظام التشغيل
                      </label>
                      <select
                        name="operatingSystem"
                        value={serviceData.operatingSystem}
                        onChange={handleChange}
                        className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                        required
                      >
                        {operatingSystems.map((os) => (
                          <option key={os} value={os}>
                            {os}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-xs text-gray-300 mb-1">
                      ملاحظات الإدارة
                    </label>
                    <textarea
                      name="adminNotes"
                      value={serviceData.adminNotes}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-blue-900 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
              {/* Action Buttons - Moved to bottom */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1 bg-red-600/90 hover:bg-red-600 px-3 py-1.5 rounded text-xs transition-colors"
                >
                  <X className="w-3 h-3" />
                  <span>إلغاء</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 bg-green-600/90 hover:bg-green-600 px-3 py-1.5 rounded text-xs transition-colors"
                >
                  <Save className="w-3 h-3" />
                  <span>حفظ</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ServiceManagement;
