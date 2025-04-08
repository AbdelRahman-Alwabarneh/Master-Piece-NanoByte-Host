import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './style/ServiceFetchErrorAlert.css';

const ServiceFetchErrorAlert = ({ hasError, redirectTo }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (hasError) {
      Swal.fire({
        title: 'الخدمة غير متوفرة حالياً',
        text: 'حدث خطأ أثناء تحميل تفاصيل الخدمة. يرجى المحاولة لاحقاً.',
        icon: 'error',
        confirmButtonText: 'رجوع',
        background: '#1A2738',
        color: '#F0F0F0',
        confirmButtonColor: '#F44336',
        customClass: {
          container: 'fetch-error-blur',
          popup: 'font-cairo',
          title: 'font-cairo text-lg',
          htmlContainer: 'font-cairo',
          confirmButton: 'font-cairo',
        },
      }).then(() => {
        navigate(redirectTo);
      });
    }
  }, [hasError, navigate, redirectTo]);

  return null;
};

export default ServiceFetchErrorAlert;
