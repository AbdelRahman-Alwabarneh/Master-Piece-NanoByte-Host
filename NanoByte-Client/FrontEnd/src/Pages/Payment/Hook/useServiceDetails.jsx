import { useState, useEffect } from "react";
import axios from "axios";

const useServiceDetails = ({ serviceType, productLink, duration }) => {
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/api/${serviceType}/${productLink}/${duration}` // تم تعديل الرابط ليشمل نوع الخدمة
        );
        setServiceDetails(response.data.serviceDetailsPlan); // تم تعديل المفتاح ليكون متناسب مع الخدمة
      } catch (error) {
        console.error(`خطأ في جلب تفاصيل ${serviceType}:`, error);
      }
    };

    fetchServiceDetails();
  }, [productLink, serviceType]);

  return { serviceDetails };
};

export default useServiceDetails;
