import { useState } from "react";
import { Link } from "react-router-dom";
import PayPalButton from "./Buttons/PayPalButtons";
import CreditCardButton from "./Buttons/CreditCardButton";

function PaymentOrderSummary({
  totalPrice,
  discountInfo,
  paymentError,
  serviceDetails,
  paymentMethod,
  price,
  onPayPalApprove,
  SelectedComponent,
  DurationText,
  motion,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [showConsentAlert, setShowConsentAlert] = useState(false);
  
  const handlePaymentClick = (callback) => {
    if (!isChecked) {
      setShowConsentAlert(true);
      return false;
    }
    
    if (typeof callback === 'function') {
      callback();
    }
    return true;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-1/3 px-4 mb-8"
      >
        <div className="bg-nano-bg-additional-200 rounded-lg p-6 shadow-lg sticky top-20">
          <h2 className="text-2xl font-semibold mb-4 border-b border-nano-border-100 pb-2 text-nano-text-200">
            ملخص الطلب
          </h2>
          <div className="space-y-3 mb-4 text-sm">
                      {/* رسالة التنبيه اللطيفة */}
          {showConsentAlert && (
            <div className="bg-nano-warning-300/80 border border-nano-primary-200 text-white px-4 py-3 rounded-lg relative mb-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                <span>يرجى الموافقة على اتفاقية الخدمة قبل المتابعة</span>
              </div>
            </div>
          )}
            <div className="flex justify-between text-nano-text-200">
              <span>{SelectedComponent}</span>
              <span className="font-semibold">${price.toFixed(2)}</span>
            </div>
            {discountInfo && (
              <div className="flex justify-between text-nano-success-100">
                <span>الخصم المطبق</span>
                <span className="font-semibold">
                  -${discountInfo.discountValue.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-nano-text-200">
              <span>رسوم الإعداد</span>
              <span className="font-semibold">
                ${serviceDetails.setupFee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-nano-text-200">
              <span>مدة الأشتراك</span>
              <span className="font-semibold">{DurationText}</span>
            </div>
          </div>
          <div className="border-t border-nano-border-100 pt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-nano-text-100">
                الإجمالي المطلوب
              </span>
              <span className="text-2xl font-bold text-nano-text-100">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <label className="flex items-center space-x-2 mb-4 text-sm">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked, setShowConsentAlert(false))}
                className="rounded w-5 h-4 text-nano-primary-300 focus:ring-0"
              />

              <span
                style={{ userSelect: "none" }}
                className="text-nano-text-200"
              >
                قرأت الإتفاقية وأوافق عليها
                <Link
                  to="/"
                  className="text-nano-primary-800 hover:underline px-[3px]"
                >
                  إتفاقية الخدمة
                </Link>
              </span>
            </label>
          </div>
          
          {paymentError && (
            <div className="bg-nano-error-100 border border-nano-error-200 text-white px-4 py-3 rounded relative mb-4">
              {paymentError}
            </div>
          )}
          {paymentMethod === "paypal" && (
            <div onClick={() => handlePaymentClick()}>
              <PayPalButton
                totalPrice={totalPrice}
                onPayPalApprove={onPayPalApprove}
                validateConsent={handlePaymentClick}
              />
            </div>
          )}
          
          {paymentMethod === "credit-card" && (
            <div onClick={() => handlePaymentClick()}>
              <CreditCardButton validateConsent={handlePaymentClick} />
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default PaymentOrderSummary;