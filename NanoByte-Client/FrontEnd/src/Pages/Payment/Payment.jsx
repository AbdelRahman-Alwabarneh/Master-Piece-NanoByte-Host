import React, { useState } from "react";
import { CreditCard, ChevronDown, ExternalLink } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [paymentError, setPaymentError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("تم تقديم نموذج الدفع");
  };

  const planName = Cookies.get("planName");
  const Price = parseFloat(Cookies.get("Price")).toFixed(2);
  const discountAmount = parseFloat(Cookies.get("discountAmount")).toFixed(2);
  const setupFee = parseFloat(Cookies.get("setupFee")).toFixed(2);

  if (!planName || isNaN(Price) || isNaN(setupFee)) {
    navigate("/");
  }

  const totalPrice = (parseFloat(Price) + parseFloat(setupFee)).toFixed(2);

  const onPayPalApprove = async (data, actions) => {
    try {
      const captureResponse = await actions.order.capture();
      const paymentData = {
        planName,
        orderNumber: captureResponse.id,
        amount: parseFloat(totalPrice),
        paymentMethod: "PayPal",
      };

      await axios.post("http://localhost:2000/api/payment", paymentData, {
        withCredentials: true,
      });
      navigate(`/InvoicePage/${captureResponse.id}`);
    } catch (error) {
      setPaymentError("حدث خطأ أثناء معالجة الدفع");
      console.error("Payment Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] mt-[72px] [direction:rtl] text-white p-4 md:p-8 font-cairo">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          الدفع
        </h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8">
            <div className="bg-[#1E3A9F] bg-opacity-50 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 border-b border-blue-400 pb-2 text-blue-100">
                معلومات الدفع
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block mb-2 font-semibold text-blue-100"
                  >
                    طريقة الدفع:
                  </label>
                  <div className="relative">
                    <select
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="block w-full bg-[#2A4BB4] border border-blue-400 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
                    >
                      <option value="credit-card">بطاقة الائتمان</option>
                      <option value="paypal">PayPal</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {paymentMethod === "credit-card" && (
                  <>
                    <div>
                      <label
                        htmlFor="cardName"
                        className="block mb-1 text-blue-100"
                      >
                        اسم حامل البطاقة
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        className="w-full bg-[#2A4BB4] border border-blue-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-blue-300"
                        placeholder="أدخل اسم حامل البطاقة"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block mb-1 text-blue-100"
                      >
                        رقم البطاقة
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          className="w-full bg-[#2A4BB4] border border-blue-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-blue-300"
                          placeholder="xxxx xxxx xxxx xxxx"
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="expiryDate"
                          className="block mb-1 text-blue-100"
                        >
                          تاريخ انتهاء البطاقة
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          className="w-full bg-[#2A4BB4] border border-blue-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-blue-300"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="cvv"
                          className="block mb-1 text-blue-100"
                        >
                          (CVV) رمز الأمان
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          className="w-full bg-[#2A4BB4] border border-blue-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white placeholder-blue-300"
                          placeholder="xxx"
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === "paypal" && (
                  <div className="bg-[#2A4BB4] rounded-lg p-6 shadow-lg">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-blue-100 mb-2">
                        الدفع عبر PayPal
                      </h3>
                      <p className="text-blue-100 mb-4">
                        اضغط على الزر أدناه لإكمال عملية الدفع بواسطة PayPal
                      </p>
                      <ul className="list-disc text-right list-inside mb-6 space-y-2 text-blue-100">
                      <li>حماية المشتري على مشترياتك المؤهلة</li>
                      <li>إتمام عملية الدفع بنقرات قليلة</li>
                      <li>لا حاجة لإدخال تفاصيل بطاقتك في كل مرة</li>
                    </ul>
                    </div>

                    {paymentError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {paymentError}
                      </div>
                    )}
                     
                     <PayPalScriptProvider
                    
                    options={{
                      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    }}
                  >
                <PayPalButtons
  className="paypal-button w-full"
  style={{
    layout: "horizontal",
    shape: "rect",
    color: "blue",
    tagline: false,
  }}
  createOrder={(data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice,
          },
        },
      ],
    });
  }}
  onApprove={onPayPalApprove} // تأكد من أن هنا تمرر الدالة المعدلة
  onError={(err) => setPaymentError("فشل الدفع: " + err.message)}
/>

                  </PayPalScriptProvider>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4 mb-8">
            <div className="bg-[#1E3A9F] bg-opacity-50 rounded-lg p-6 shadow-lg sticky top-20">
              <h2 className="text-2xl font-semibold mb-4 border-b border-blue-400 pb-2 text-blue-100">
                ملخص الطلب
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-blue-100">
                  <span>{planName}</span>
                  <span className="font-bold">${Price}</span>
                </div>
                {discountAmount !== (0).toFixed(2) ? (
                  <div className="flex justify-between text-blue-100">
                    <span>الخصم المطبق</span>
                    <span className="font-bold">-${discountAmount}</span>
                  </div>
                ) : null}
                <div className="flex justify-between text-blue-100">
                  <span>رسوم الإعداد</span>
                  <span className="font-bold">${setupFee}</span>
                </div>
              </div>
              <div className="border-t border-blue-400 pt-3">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-white">
                    الإجمالي المطلوب
                  </span>
                  <span className="text-2xl font-bold text-white">
                    ${totalPrice}
                  </span>
                </div>
              </div>
              {paymentMethod === "credit-card" && (
                <button
                  type="submit"
                  className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-3 px-4 rounded transition duration-300 text-sm shadow-md"
                >
                  إكمال الشراء
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
