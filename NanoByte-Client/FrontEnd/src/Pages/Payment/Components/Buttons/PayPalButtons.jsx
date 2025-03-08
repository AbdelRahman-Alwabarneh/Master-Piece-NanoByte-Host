import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

function PayPalButton({ onPayPalApprove, totalPrice, validateConsent }) {
  const [paymentError, setPaymentError] = useState(null);

  const handleCreateOrder = (data, actions) => {
    // التحقق من الموافقة قبل إنشاء الطلب
    if (validateConsent()) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: totalPrice,
            },
          },
        ],
      });
    }
    return false;
  };

  return (
    <>
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
          createOrder={handleCreateOrder}
          onApprove={(data, actions) => {
            if (validateConsent()) {
              return onPayPalApprove(data, actions);
            }
            return false;
          }}
          onError={(err) => setPaymentError("فشل الدفع: " + err.message)}
        />
      </PayPalScriptProvider>
    </>
  );
}

export default PayPalButton;
