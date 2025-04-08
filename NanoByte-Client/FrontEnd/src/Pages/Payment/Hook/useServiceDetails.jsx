import { useState, useEffect } from "react";
import axios from "axios";

const useServiceDetails = ({ serviceType, productLink, duration }) => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/api/${serviceType}/${productLink}/${duration}`, // تم تعديل الرابط ليشمل نوع الخدمة
          {},
          { withCredentials: true }
        );

        const details = response.data?.serviceDetailsPlan;

        if (!details || !details.subscriptionDurations?.[duration]?.price) {
          throw new Error("تفاصيل الخطة غير كاملة أو غير موجودة");
        }
        setServiceDetails(details);
        setFetchError(false);
      } catch (error) {
        setFetchError(true);
      }
    };
    fetchServiceDetails();
  }, [productLink, serviceType]);

  return { serviceDetails, fetchError };
};

export default useServiceDetails;
