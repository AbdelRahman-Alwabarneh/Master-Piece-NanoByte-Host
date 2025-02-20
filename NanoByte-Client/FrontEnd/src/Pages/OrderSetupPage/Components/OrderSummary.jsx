import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function OrderSummary({
  serviceDetails,
  totalPrice,
  discountCode,
  discountAmount,
  selectedDuration,
  serviceType,
  getDurationText,
  AnimatePresence,
  motion,
}) {
  const navigate = useNavigate();
  const total = totalPrice + serviceDetails.setupFee - discountAmount;

  const handlePayment = () => {
    Cookies.set("Service_Id", serviceDetails._id, { expires: 1 });
    Cookies.set("Subscription_Duration", selectedDuration, { expires: 1 });
    Cookies.set("Discount_Code", discountCode, { expires: 1 });
    Cookies.set("Service_Type", serviceType, { expires: 1 });
    Cookies.set("Product_Link", serviceDetails.productLink, { expires: 1 });
    navigate("/Payment");
  };
  const componentMap = {
    vpsDetails: ` استضافة خوادم مشتركة - ${serviceDetails.planName}`,
    dedicatedServerDetails: serviceDetails.planTitle,
  };

  const SelectedComponent = componentMap[serviceType] || null;
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/3 px-4 mb-8 order-1 lg:order-2"
        >
          <div
            style={{ top: "80px" }}
            className="bg-nano-bg-additional-200 rounded-lg p-4 shadow-lg sticky top-4"
          >
            <h2 className="text-2xl font-semibold mb-4 border-b border-nano-border-200 pb-2">
              ملخص الطلب
            </h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-nano-text-200">{SelectedComponent}</span>
                <span className="font-semibold text-nano-text-100">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-nano-success-100">
                  <span>الخصم المطبق</span>
                  <span className="font-semibold">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-nano-text-200">رسوم الإعداد</span>
                <span className="font-semibold text-nano-text-100">
                  ${serviceDetails.setupFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-nano-text-200">مدة الأشتراك</span>
                <span className="font-semibold text-nano-text-100">
                  {getDurationText(selectedDuration)}
                </span>
              </div>
            </div>
            <div className="border-t border-nano-border-200 pt-3">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-nano-text-200 text-base">
                  الإجمالي المطلوب
                </span>
                <span className="text-2xl font-bold text-nano-text-100">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handlePayment}
                className="w-full bg-nano-success-100 hover:bg-nano-success-200 text-nano-text-100 font-bold py-3 px-4 rounded transition duration-300 text-sm shadow-md"
              >
                الاستمرار للدفع
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default OrderSummary;
