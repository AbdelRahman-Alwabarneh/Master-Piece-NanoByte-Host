import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RenewalDetailsModal = ({ isOpen, onClose, serviceData, onRenewalConfirm }) => {
  const calculatePrices = (months, discountDetails) => {
    if (!serviceData?.OrderdId?.renewalFee) return { originalPrice: 0, finalPrice: 0 };
    
    const renewalFee = serviceData.OrderdId.renewalFee;
    const calculatedPrice = renewalFee * months;
    
    if (!discountDetails) {
      return { originalPrice: calculatedPrice, finalPrice: calculatedPrice };
    }

    let discountedPrice = calculatedPrice;
    
    if (discountDetails.discountType === 'percentage') {
      discountedPrice = calculatedPrice * (1 - discountDetails.discountValue / 100);
    } else if (discountDetails.discountType === 'fixed') {
      const discountValue = Math.min(discountDetails.discountValue, calculatedPrice);
      discountedPrice = calculatedPrice - discountValue;
    }

    return { originalPrice: calculatedPrice, finalPrice: discountedPrice };
  };

  const showRenewalModal = async () => {
    let selectedMonths = 1;
    let discountDetails = null;
    let originalPrice = serviceData?.OrderdId?.renewalFee || 0;
    let finalPrice = originalPrice;

    const updatePricesDisplay = (months, discount) => {
      const prices = calculatePrices(months, discount);
      originalPrice = prices.originalPrice;
      finalPrice = prices.finalPrice;

      // تحديث عرض السعر النهائي
      const totalPriceElement = Swal.getHtmlContainer().querySelector('#totalPrice');
      if (totalPriceElement) {
        totalPriceElement.textContent = `السعر الإجمالي: ${finalPrice.toFixed(2)} دولار`;
      }

      // تحديث تفاصيل الخصم إذا كان موجوداً
      const discountInfo = Swal.getHtmlContainer().querySelector('#discountInfo');
      if (discountInfo && discount) {
        discountInfo.innerHTML = `
          <div class="mt-4 text-gray-700 text-right border-t pt-3">
            <p class="mb-2">نسبة الخصم: ${discount.discountValue}${discount.discountType === "fixed" ? "$" : "%"}</p>
            <p class="mb-2">السعر الأصلي: ${originalPrice.toFixed(2)} دولار</p>
            <p class="mb-2">السعر بعد الخصم: ${finalPrice.toFixed(2)} دولار</p>
          </div>
        `;
      }
    };

    const handleMonthsChange = (e) => {
      selectedMonths = parseInt(e.target.value);
      const monthsDisplay = Swal.getHtmlContainer().querySelector('#monthsValue');
      if (monthsDisplay) {
        monthsDisplay.textContent = selectedMonths;
      }
      updatePricesDisplay(selectedMonths, discountDetails);
    };

    const applyDiscountCode = async (code) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/discountCode`, {
          code: code,
          serviceId: serviceData.OrderdId.vpsId._id
        }, { withCredentials: true });

        const receivedDiscountCode = response.data.discountCode;
        discountDetails = {
          discountValue: receivedDiscountCode.discountValue,
          discountType: receivedDiscountCode.discountType,
          code: receivedDiscountCode.codeName
        };

        updatePricesDisplay(selectedMonths, discountDetails);
        Swal.resetValidationMessage();
        
        // تعطيل حقل الإدخال وتغيير الأزرار
        const discountInput = Swal.getHtmlContainer().querySelector('#discountInput');
        const discountButtonsContainer = Swal.getHtmlContainer().querySelector('#discountButtonsContainer');
        
        if (discountInput && discountButtonsContainer) {
          discountInput.disabled = true;
          discountButtonsContainer.innerHTML = `
            <button 
              id="cancelDiscount"
              class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              إلغاء الخصم
            </button>
          `;

          // إضافة مستمع الحدث لزر الإلغاء الجديد
          const cancelButton = discountButtonsContainer.querySelector('#cancelDiscount');
          cancelButton.onclick = () => {
            discountDetails = null;
            discountInput.value = '';
            discountInput.disabled = false;
            discountButtonsContainer.innerHTML = `
              <button 
                id="applyDiscount"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
              >
                تطبيق
              </button>
            `;
            
            // إعادة إضافة مستمع الحدث لزر التطبيق الجديد
            const newApplyButton = discountButtonsContainer.querySelector('#applyDiscount');
            newApplyButton.addEventListener('click', async () => {
              const code = discountInput.value.trim();
              if (code) {
                await applyDiscountCode(code);
              }
            });

            updatePricesDisplay(selectedMonths, null);
            const discountInfo = Swal.getHtmlContainer().querySelector('#discountInfo');
            if (discountInfo) {
              discountInfo.innerHTML = '';
            }
          };
        }
        
        return true;
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'حدث خطأ غير متوقع';
        Swal.showValidationMessage(errorMessage);
        return false;
      }
    };

    const result = await Swal.fire({
      title: 'تجديد الخدمة',
      html: `
        <div dir="rtl" class="text-right">
          <div class="mb-6 bg-gray-50 p-4 rounded-lg">
            <label class="block mb-3 font-semibold">
              اختر عدد الأشهر: <span id="monthsValue" class="text-blue-600">1</span>
            </label>
            <input 
              type="range" 
              id="monthsSlider"
              min="1" 
              max="6" 
              value="1"
              class="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer" 
            />
          </div>

          <div class="flex items-center mb-6 bg-gray-50 p-4 rounded-lg">
            <input 
              type="text" 
              id="discountInput"
              placeholder="أدخل كود الخصم (اختياري)" 
              class="flex-grow p-2 border rounded-lg ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div id="discountButtonsContainer">
              <button 
                id="applyDiscount"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
              >
                تطبيق
              </button>
            </div>
          </div>

          <div id="discountInfo" class="mb-4"></div>

          <div id="totalPrice" class="text-xl font-bold mt-4 text-blue-600 bg-blue-50 p-4 rounded-lg">
            السعر الإجمالي: ${finalPrice.toFixed(2)} دولار
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'متابعة',
      cancelButtonText: 'إغلاق',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      reverseButtons: true,
      customClass: {
        container: 'rtl',
        popup: 'swal2-rtl',
      },
      didOpen: () => {
        const monthsSlider = Swal.getHtmlContainer().querySelector('#monthsSlider');
        const applyDiscountBtn = Swal.getHtmlContainer().querySelector('#applyDiscount');
        const discountInput = Swal.getHtmlContainer().querySelector('#discountInput');

        monthsSlider.addEventListener('input', handleMonthsChange);
        
        applyDiscountBtn.addEventListener('click', async () => {
          const code = discountInput.value.trim();
          if (code) {
            await applyDiscountCode(code);
          }
        });

        discountInput.addEventListener('keypress', async (e) => {
          if (e.key === 'Enter') {
            const code = discountInput.value.trim();
            if (code) {
              await applyDiscountCode(code);
            }
          }
        });
      }
    });

    if (result.isConfirmed) {
      onRenewalConfirm(selectedMonths, originalPrice, finalPrice, discountDetails);
    } else {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      showRenewalModal();
    }
  }, [isOpen]);

  return null;
};

export default RenewalDetailsModal;