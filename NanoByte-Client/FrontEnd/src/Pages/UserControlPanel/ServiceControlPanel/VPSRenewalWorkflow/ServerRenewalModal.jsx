import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PaymentSuccess } from './PaymentSuccess';
import ConfirmationModal from './ConfirmationModal';
import RenewalDetailsModal from './RenewalDetailsModal';
import PaymentMethodModal from './PaymentMethodModal';

const ServerRenewalModal = ({ serviceData }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(null);
  const [renewalDetails, setRenewalDetails] = useState(null);
  
  useEffect(() => {
    if (serviceData?.status === 'expired') {
      setCurrentStep('confirmation');
    }
  }, [serviceData]);

  const handleConfirmationClose = () => {
    
    navigate('/Services/VPS', { state: { onClose: true } });
  };

  const handleConfirmationConfirm = () => {
    setCurrentStep('renewal-details');
  };

  const handleRenewalDetailsConfirm = (months, originalPrice, finalPrice, discountDetails) => {
    setRenewalDetails({
      months,
      originalPrice,
      finalPrice,
      discountDetails
    });
    setCurrentStep('payment-method');
  };

  const handlePaymentMethodSelect = async (method) => {
    try {
      setRenewalDetails(prev => ({
        ...prev,
        paymentMethod: method
      }));

      // إظهار رسالة النجاح
      toast.success('تم تجديد الخدمة بنجاح! 🎉', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      // إعادة تعيين الحالة وإغلاق جميع النوافذ المنبثقة
      setCurrentStep(null);
      // setTimeout(() => {
      //   navigate('/Services/VPS');
      // }, 1500);

    } catch (error) {
      toast.error('حدث خطأ أثناء عملية التجديد', {
        position: "top-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <PaymentSuccess />
      <ConfirmationModal 
        isOpen={currentStep === 'confirmation'}
        onClose={handleConfirmationClose}
        onConfirm={handleConfirmationConfirm}
      />
      <RenewalDetailsModal 
        isOpen={currentStep === 'renewal-details'}
        onClose={handleConfirmationClose}
        serviceData={serviceData}
        onRenewalConfirm={handleRenewalDetailsConfirm}
      />
      <PaymentMethodModal 
        isOpen={currentStep === 'payment-method'}
        onClose={handleConfirmationClose}
        onPaymentSelect={handlePaymentMethodSelect}
        totalPrice={renewalDetails?.finalPrice || 0}
      />
    </>
  );
};

export default ServerRenewalModal;