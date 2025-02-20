import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useServiceDetails = (serviceType) => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { productLink } = useParams(); // تم تعديل لاستقبال نوع الخدمة

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/${serviceType}/${productLink}` // تم تعديل الرابط ليشمل نوع الخدمة
        );
        setServiceDetails(response.data.serviceDetailsPlan); // تم تعديل المفتاح ليكون متناسب مع الخدمة
        setTotalPrice(
          response.data.serviceDetailsPlan.subscriptionDurations.oneMonth.price // نفس الفكرة ولكن مع بيانات الخدمة الجديدة
        );
      } catch (error) {
        console.error(`خطأ في جلب تفاصيل ${serviceType}:`, error);
      }
    };

    fetchServiceDetails();
  }, [productLink, serviceType]);

  return { serviceDetails, totalPrice, setTotalPrice };
};

export default useServiceDetails;
