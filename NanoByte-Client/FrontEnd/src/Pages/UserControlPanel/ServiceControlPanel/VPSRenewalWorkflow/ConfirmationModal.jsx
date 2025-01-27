import React from 'react';
import Swal from 'sweetalert2';
import './style/CustomSwal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const SwalCustom = Swal.mixin({
    customClass: {
      popup: 'custom-swal2'
    }
  });

  React.useEffect(() => {
    const handleBackButton = () => {
      Swal.close();
      onClose();
    };

    if (isOpen) {
      // إضافة مستمع لحدث popstate (زر الرجوع)
      window.addEventListener('popstate', handleBackButton);

      SwalCustom.fire({
        title: 'تحذير',
        text: 'الخادم الخاص بك منتهي. هل تريد التجديد؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'متابعة',
        cancelButtonText: 'الذهاب إلى الخدمات',
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#ef4444',
        reverseButtons: true,
        backdrop: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm();
        } else if (
          result.dismiss === Swal.DismissReason.cancel || 
          result.dismiss === Swal.DismissReason.backdrop
        ) {
          onClose();
        }
      });
    }

    // تنظيف المستمع عند unmount المكون
    return () => {
      window.removeEventListener('popstate', handleBackButton);
      Swal.close();
    };
  }, [isOpen, onClose, onConfirm]);

  return null;
};

export default ConfirmationModal;

