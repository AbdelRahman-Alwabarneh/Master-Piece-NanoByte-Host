import React from 'react';
import Swal from 'sweetalert2';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './style/CustomSwal.css';

const PaymentMethodModal = ({ isOpen, onClose, onPaymentSelect, totalPrice }) => {
  const SwalCustom = Swal.mixin({
    customClass: {
      popup: 'custom-swal2'
    }
  });

  const showPaymentModal = async () => {
    if (!isOpen) return;

    const { value: paymentMethod, dismiss } = await SwalCustom.fire({
      title: 'اختر طريقة الدفع',
      input: 'select',
      inputOptions: {
        paypal: 'باي بال',
        visa: 'بطاقة فيزا (غير متوفر حالياً)',
        NanobyteWallet: 'محفظة نانوبايت (غير متوفر حالياً)'
      },
      inputPlaceholder: 'اختر طريقة الدفع',
      showCancelButton: true,
      cancelButtonText: 'إغلاق',
      confirmButtonText: 'متابعة',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.getContainer().style.direction = 'rtl';
        const select = Swal.getPopup().querySelector('select');
        if (select) {
          // تعطيل زر المتابعة مبدئياً
          Swal.getConfirmButton().disabled = true;
          
          select.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            // تمكين زر المتابعة فقط إذا تم اختيار PayPal
            Swal.getConfirmButton().disabled = selectedValue !== 'paypal';
            
            // إظهار رسالة إذا تم اختيار خيار غير متاح
            if (selectedValue === 'visa' || selectedValue === 'NanobyteWallet') {
              Swal.showValidationMessage('هذه الطريقة غير متوفرة حالياً');
            } else {
              Swal.resetValidationMessage();
            }
          });
        }
      }
    });

    if (dismiss === 'cancel') {
      onClose();
      return;
    }

    if (paymentMethod === 'paypal') {
      const { dismiss: paypalDismiss } = await SwalCustom.fire({
        title: ' PayPal الدفع عبر ',
        html: `
          <div class="text-right mb-4" dir="rtl">
            <p class="text-sm text-gray-600 mb-2">🔒 دفع آمن وسريع عبر PayPal</p>
            <p class="text-sm text-gray-600 mb-2">✓ حماية المشتري</p>
            <p class="text-sm text-gray-600">💳 استخدم رصيد PayPal أو بطاقتك</p>
          </div>
          <div id="paypal-button-container" style="min-height: 55px;"></div>
        `,
        width: 400,
        padding: '1rem',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'إلغاء',
        cancelButtonColor: '#d33',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          const paypalContainer = document.getElementById('paypal-button-container');
          const root = createRoot(paypalContainer);
          root.render(
            <PayPalScriptProvider
              options={{
                "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
              }}
            >
              <PayPalButtons
                className="paypal-button w-full"
                style={{
                  layout: "horizontal",
                  shape: "rect",
                  color: "blue",
                  tagline: false,
                  height: 45
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  onPaymentSelect('paypal', data);
                  Swal.close();
                }}
                onError={(err) => {
                  SwalCustom.fire({
                    icon: 'error',
                    title: 'خطأ في الدفع',
                    text: err.message,
                  });
                }}
              />
            </PayPalScriptProvider>
          );
        },
        willClose: () => {
          const paypalContainer = document.getElementById('paypal-button-container');
          if (paypalContainer) {
            ReactDOM.unmountComponentAtNode(paypalContainer);
          }
        }
      });

      if (paypalDismiss === 'cancel') {
        onClose();
        return;
      }
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      showPaymentModal();
    }
  }, [isOpen, totalPrice]);

  return null;
};

export default PaymentMethodModal;