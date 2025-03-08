import axios from "axios";

const handlePayPalApprove = (
  SelectedComponent,
  Service_Id,
  DurationText,
  Discount_Code,
  Service_Type,
  totalPrice,
  Product_Link,
  SelectedServiceType,
  setPaymentError,
  navigate
) => {
  
  const onPayPalApprove = async (data, actions) => {
    try {
      const captureResponse = await actions.order.capture();
      const paymentData = {
        SelectedComponent,
        Service_Id,
        orderNumber: captureResponse.id,
        DurationText,
        Discount_Code,
        Service_Type,
        SelectedServiceType,
        amount: parseFloat(totalPrice),
        paymentMethod: "PayPal",
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        paymentData,
        {
          withCredentials: true,
        }
      );
      const receivedOrderID = response.data._id;

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${Service_Type}`,
        { Product_Link },
        { withCredentials: true }
      );
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service`,
        { orderNumber: captureResponse.id, receivedOrderID, SelectedServiceType },
        { withCredentials: true }
      );
      if (Discount_Code && Discount_Code !== "null") {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/discountCode/useDiscountCode`,
          { codeName: Discount_Code },
          { withCredentials: true }
        );
      }

      navigate(`/InvoicePage/${captureResponse.id}`);
    } catch (error) {
      setPaymentError("حدث خطأ أثناء معالجة الدفع");
      console.error("Payment Error:", error);
    }
  };

  return onPayPalApprove;
};

export default handlePayPalApprove;
