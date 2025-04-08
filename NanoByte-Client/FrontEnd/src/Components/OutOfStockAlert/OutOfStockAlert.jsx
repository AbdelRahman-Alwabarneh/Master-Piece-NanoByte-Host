import { useEffect,useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './style/OutOfStockAlert.css';

const PlanChecker = ({ Product_Link, Service_Type, redirectTo }) => {
  const navigate = useNavigate();
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    const checkAvailability = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/${Service_Type}/checkServiceAvailability`,
          { Product_Link },
          { withCredentials: true }
        );

        if (res.data === "Available") return;

      } catch (error) {
        if (
          error.response &&
          error.response.status === 400 &&
          (
            error.response.data.error === "Out of stock" ||
            error.response.data.error === "This product is not available"
          )
        ) {
            if (!isMountedRef.current) return;
          Swal.fire({
            title: 'الخطة غير متوفرة حالياً',
            text: 'يرجى اختيار خطة أخرى أو المحاولة لاحقاً.',
            icon: 'error',
            confirmButtonText: 'رجوع',
            background: '#1A2738', // nano-bg-200
            color: '#F0F0F0',     // nano-text-200
            confirmButtonColor: '#F44336', // nano-error-100
            customClass: {
              container: 'out-of-stock-blur',
              popup: 'font-cairo',
              title: 'font-cairo text-lg',
              htmlContainer: 'font-cairo',
              confirmButton: 'font-cairo',
              
            },
          }).then(() => {
            navigate(redirectTo);
          });
        } else {
          console.error('خطأ أثناء التحقق:', error);
        }
      }
    };

    checkAvailability();
    return () => {
        isMountedRef.current = false; 
        if (Swal.isVisible()) {
          Swal.close(); 
        }
      };
    }, [Product_Link, Service_Type, navigate, redirectTo]);
  
    return null;
};

export default PlanChecker;
