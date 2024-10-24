import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "../../Components/Loading/Loading";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const VPSOrderDetails = () => {
  const [vpsDetails, setVpsDetails] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("oneMonth");
  const [promoCode, setPromoCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountCode, setdiscountCode] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const { productLink } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVPSDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/vpsDetails/${productLink}`
        );
        setVpsDetails(response.data.vpsDetailsPlan);
        setTotalPrice(
          response.data.vpsDetailsPlan.subscriptionDurations.oneMonth.price
        );
      } catch (error) {
        console.error("خطأ في جلب تفاصيل VPS:", error);
      }
    };

    fetchVPSDetails();
  }, [productLink]);

  useEffect(() => {
    if (vpsDetails) {
      const newPrice = vpsDetails.subscriptionDurations[selectedDuration].price;
      setTotalPrice(newPrice);
      
      if (isDiscountApplied) {
        applyDiscount(newPrice);
      }
    }
  }, [selectedDuration, vpsDetails]);

  const applyDiscount = async (price) => {
    try {
      const response = await axios.post(
        "http://localhost:2000/api/discountCode",
        {
          code: promoCode,
          serviceId: vpsDetails._id,
        },
        { withCredentials: true }
      );
      const { discountCode } = response.data;
      setdiscountCode(discountCode.codeName)

      if (discountCode.discountType === "percentage") {
        const discountValue = (price * discountCode.discountValue) / 100;
        setDiscountAmount(discountValue);
        setDiscountMessage(`تم تطبيق خصم ${discountCode.discountValue}%`);
      } else {
        setDiscountAmount(discountCode.discountValue);
        setDiscountMessage(`تم تطبيق خصم بقيمة $${discountCode.discountValue}`);
      }
      setIsDiscountApplied(true);
    } catch (error) {
      setDiscountMessage(error.response?.data?.message || "حدث خطأ أثناء تطبيق كود الخصم");
      setDiscountAmount(0);
      setIsDiscountApplied(false);
    }
  };

  const togglePromoCode = () => {
    if (isDiscountApplied) {
      setIsDiscountApplied(false);
      setDiscountAmount(0);
      setDiscountMessage("");
      setPromoCode("");
    } else {
      applyDiscount(totalPrice);
    }
  };

  const handlePayment = () => {
    const Subscriptionduration = getDurationText(selectedDuration);
    
    Cookies.set("planName", `استضافة خوادم مشتركة - ${vpsDetails.planName}`, {
      expires: 1,
    });
    Cookies.set("Price", totalPrice - discountAmount, { expires: 1 });
    Cookies.set("productLink", vpsDetails.productLink, { expires: 1 });
    Cookies.set("Subscriptionduration", Subscriptionduration, { expires: 1 });
    Cookies.set("discountCode", discountCode, { expires: 1 });
    Cookies.set("discountAmount", discountAmount || 0, { expires: 1 });
    Cookies.set("setupFee", vpsDetails.setupFee || 0, { expires: 1 });
    Cookies.set("Servicetype", "VPS", { expires: 1 });
    navigate("/Payment");
  };

  const getDurationText = (key) => {
    const durationMap = {
      oneMonth: "شهر واحد",
      twoMonths: "شهرين",
      threeMonths: "ثلاثة أشهر",
      fourMonths: "أربعة أشهر",
      fiveMonths: "خمسة أشهر",
      sixMonths: "ستة أشهر",
    };
    return durationMap[key] || `${key.replace("Months", "")} أشهر`;
  };

  if (!vpsDetails) return <Loading />;
  const total = totalPrice + vpsDetails.setupFee - discountAmount;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] mt-[72px] [direction:rtl] text-white p-4 md:p-8 font-cairo text-right text-sm">
        <h1 className="text-2xl font-bold mb-8 text-center">إعداد الطلب</h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8 order-2 lg:order-1">
            <div className="space-y-6">
              {/* VPS Details */}
              <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 border-b border-blue-600 pb-2">
                  ملخص الطلب
                </h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white">المعالج:</span>
                      <span>{vpsDetails.cpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">الذاكرة:</span>
                      <span>{vpsDetails.ram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">التخزين:</span>
                      <span>{vpsDetails.storage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">سرعة الاتصال:</span>
                      <span>{vpsDetails.connectionSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">الموقع:</span>
                      <span>
                        {vpsDetails.groupName || "HEL1-DC2 (فنلندا، HEL)"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">الحماية:</span>
                      <span>{vpsDetails.security}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subscription Duration */}
              <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 shadow-lg">
                <label htmlFor="duration" className="block mb-2 font-semibold">
                  مدة الاشتراك:
                </label>
                <div className="relative">
                  <select
                    id="duration"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="block w-full bg-blue-900 border border-blue-700 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(vpsDetails.subscriptionDurations).map(
                      ([key, value]) => (
                        <option key={key} value={key}>
                          {getDurationText(key)} - ${value.price}
                        </option>
                      )
                    )}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 shadow-lg">
                <label htmlFor="promoCode" className="block mb-2 font-semibold">
                  كود الخصم:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="promoCode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow bg-blue-900 border border-blue-700 rounded-r py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل كود الخصم"
                    disabled={isDiscountApplied}
                  />
                  <button
                    onClick={togglePromoCode}
                    className={`${
                      isDiscountApplied ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white font-bold py-2 px-4 rounded-l transition duration-300`}
                  >
                    {isDiscountApplied ? 'الغاء' : 'تطبيق'}
                  </button>
                </div>
                {discountMessage && (
                  <p className="mt-2 text-sm text-yellow-300">{discountMessage}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-1/3 px-4 mb-8 order-1 lg:order-2">
            <div
              style={{ top: "80px" }}
              className="bg-blue-800 bg-opacity-50 rounded-lg p-4 shadow-lg sticky top-4"
            >
              <h2 className="text-xl font-semibold mb-4 border-b border-blue-600 pb-2">
                ملخص الطلب
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>استضافة خوادم مشتركة - {vpsDetails.planName}</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>الخصم المطبق</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>رسوم الإعداد</span>
                  <span className="font-bold">${vpsDetails.setupFee.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-blue-600 pt-3">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">الإجمالي المطلوب</span>
                  <span className="text-2xl font-bold text-white">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handlePayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 text-sm shadow-md"
                >
                  الاستمرار للدفع
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VPSOrderDetails;