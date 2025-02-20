import { useState, useEffect } from "react";
import axios from "axios";

const useDiscount = (
  Discount_Code,
  serviceDetails,
  Service_Id,
  Subscription_Duration,
  setPaymentError
) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountInfo, setDiscountInfo] = useState(null);
  const [isLoadingDiscount, setIsLoadingDiscount] = useState(false);

  useEffect(() => {
    const fetchDiscountCode = async () => {
      if (Discount_Code && serviceDetails) {
        setIsLoadingDiscount(true);
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/discountCode`,
            {
              code: Discount_Code,
              serviceId: Service_Id,
              totalPrice:
                serviceDetails.subscriptionDurations[Subscription_Duration]
                  .price,
              setupFee: serviceDetails.setupFee || 0,
            },
            { withCredentials: true }
          );

          setDiscountInfo(response.data);
          setTotalPrice(response.data.newTotalPrice);
        } catch (error) {
          console.error("Error applying discount:", error);
          setPaymentError(
            error.response?.data?.message || "حدث خطأ في تطبيق كود الخصم"
          );
          setDiscountInfo(null);
          setTotalPrice(
            serviceDetails.subscriptionDurations[Subscription_Duration].price +
              (serviceDetails.setupFee || 0)
          );
        }
        setIsLoadingDiscount(false);
      }
    };

    if (serviceDetails) {
      if (Discount_Code && Discount_Code !== "null") {
        fetchDiscountCode();
      } else {
        setTotalPrice(
          serviceDetails.subscriptionDurations[Subscription_Duration].price +
            (serviceDetails.setupFee || 0)
        );
      }
    }
  }, [serviceDetails, Discount_Code, Service_Id, Subscription_Duration]);

  return {
    totalPrice,
    discountInfo,
    isLoadingDiscount,
  };
};

export default useDiscount;
