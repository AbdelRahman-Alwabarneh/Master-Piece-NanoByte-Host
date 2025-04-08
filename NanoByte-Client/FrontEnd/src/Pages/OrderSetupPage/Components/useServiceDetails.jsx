import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useServiceDetails = (serviceType) => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { productLink } = useParams(); 
  const [fetchError, setFetchError] = useState(false);
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/${serviceType}/${productLink}`
        );
        const details = response.data?.serviceDetailsPlan;

        if (!details || !details.subscriptionDurations?.oneMonth?.price) {
          throw new Error("تفاصيل الخطة غير كاملة أو غير موجودة");
        }
        setServiceDetails(details);
        setTotalPrice(details.subscriptionDurations.oneMonth.price);
        setFetchError(false);
      } catch (error) {
        setFetchError(true);
      }
    };

    fetchServiceDetails();
  }, [productLink, serviceType]);

  return { serviceDetails, totalPrice, setTotalPrice, fetchError };
};

export default useServiceDetails;
