import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalButton({ onPayPalApprove, totalPrice }) {
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
          onApprove={onPayPalApprove}
          onError={(err) => setPaymentError("فشل الدفع: " + err.message)}
        />
      </PayPalScriptProvider>
    </>
  );
}

export default PayPalButton;
