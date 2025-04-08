import axios from "axios";
import Cookies from "js-cookie";
const handlePayPalApprove = (
  SelectedComponent,
  Service_Id,
  DurationText,
  Discount_Code,
  Service_Type,
  totalPrice,
  Product_Link,
  SelectedServiceType,
  price,
  setupFee,
  appliedDiscount,
  setPaymentError,
  navigate
) => {
  
  const onPayPalApprove = async (data, actions) => {
    try {
      
      const captureResponse = await actions.order.capture();
      const paymentCaptureId = captureResponse.purchase_units[0].payments.captures[0].id;
      const paymentData = {
        SelectedComponent,
        Service_Id,
        DurationText,
        Discount_Code,
        Service_Type,
        SelectedServiceType,
        paypalResourceID: paymentCaptureId,
        amount: parseFloat(totalPrice),
        planPrice: price,
        renewalFee: price,
        setupFee,
        appliedDiscount,
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
      const receivedOrderNumber = response.data.orderNumber;
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${Service_Type}`,
        { Product_Link },
        { withCredentials: true }
      );
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service`,
        { receivedOrderNumber, receivedOrderID, SelectedServiceType },
        { withCredentials: true }
      );
      if (Discount_Code && Discount_Code !== "null") {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/discountCode/useDiscountCode`,
          { codeName: Discount_Code },
          { withCredentials: true }
        );
      }
      Cookies.remove("Service_Id");
      Cookies.remove("Subscription_Duration");
      Cookies.remove("Discount_Code");
      Cookies.remove("Service_Type");
      Cookies.remove("Product_Link");
      navigate(`/InvoicePage/${receivedOrderNumber}`);
    } catch (error) {
      setPaymentError("حدث خطأ أثناء معالجة الدفع");
    }
  };

  return onPayPalApprove;
};

export default handlePayPalApprove;
