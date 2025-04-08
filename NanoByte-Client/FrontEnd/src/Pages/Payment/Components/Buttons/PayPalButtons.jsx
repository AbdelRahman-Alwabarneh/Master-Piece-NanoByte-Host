import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import axios from "axios";
function PayPalButton({ onPayPalApprove, totalPrice, validateConsent,Product_Link, Service_Type, setPaymentError}) {
  const [buttonStyle, setButtonStyle] = useState({
    layout: "horizontal",
    shape: "rect",
    color: "blue",
    tagline: false,
  });


const handleCreateOrder = async (data, actions) => {
    if (!validateConsent()) {
      return false;
    }
    
  try {
    const authRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/checkAuth`,
      { withCredentials: true }
    );

    if (!authRes.data.authenticated) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      window.location.href = "/LogIn";
      return false;
    }
  } catch (error) {
    setPaymentError("فشل التحقق من تسجيل الدخول. الرجاء تسجيل الدخول للمواصلة.");
    return false;
  }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${Service_Type}/checkServiceAvailability`,
        { Product_Link },
        { withCredentials: true }
      );
      
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: totalPrice.toFixed(2),
            },
            custom_id: "new_order",
          },
        ],
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 && error.response.data.error === "Out of stock") {
          setPaymentError("عذراً، هذا المنتج غير متوفر حالياً (نفذت الكمية)");
        } else if (error.response.status === 404) {
          setPaymentError("عذراً، لم يتم العثور على المنتج المطلوب");
        } else {
          setPaymentError("حدث خطأ أثناء التحقق من توفر المنتج: " + (error.response.data.error || error.response.data.message || "خطأ غير معروف"));
        }
      } else {
        setPaymentError("حدث خطأ في الاتصال بالخادم");
      }
      
      return false;
    }
  };

  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        }}
      >
      <div>
          <PayPalButtons
            className={`paypal-button w-full`}
            style={buttonStyle}
            createOrder={handleCreateOrder}
          onApprove={async (data, actions) => {
            try {
              const availabilityCheck = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/${Service_Type}/checkServiceAvailability`,
                { Product_Link },
                { withCredentials: true }
              );
              
              const captureResult = await actions.order.capture();
              return onPayPalApprove(data, actions);
            } catch (error) {
              if (error.response && error.response.status === 400 && error.response.data.error === "Out of stock") {
                setPaymentError("عذراً، لقد نفذت الكمية من هذا المنتج أثناء عملية الدفع. الرجاء المحاولة لاحقاً.");
              } else {
                setPaymentError("فشل إتمام عملية الدفع: " + (error.response?.data?.error || error.message || "خطأ غير معروف"));
              }
              
              return false;
            }
          }}
          onError={(err) => {
            if (err.message && err.message.includes("Expected an order id to be passed")) {
              setPaymentError("فشل الدفع")
              return;
            }
          
            setPaymentError("فشل الدفع: " + (err.message || "خطأ غير معروف"));
          }}
          
        />
        </div>
      </PayPalScriptProvider>
    </>
  );
}

export default PayPalButton;
