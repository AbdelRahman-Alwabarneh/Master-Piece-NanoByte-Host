import React, { useState, useEffect } from "react";
import axios from "axios";

const PromoCode = ({
  serviceId,
  totalPrice,
  onDiscountChange,
  setupFee,
  AnimatePresence,
  motion,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountCode, setDiscountCode] = useState(null);

  useEffect(() => {
    if (isDiscountApplied) {
      applyDiscount(totalPrice);
    }
  }, [totalPrice]);

  const applyDiscount = async (price) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/discountCode`,
        {
          code: promoCode,
          serviceId: serviceId,
          totalPrice: price,
          setupFee,
        },
        { withCredentials: true }
      );

      const {
        newTotalPrice,
        discountValue,
        discountType,
        OriginalDiscountValue,
        codeName,
      } = response.data;
      setDiscountCode(codeName);

      if (discountType === "percentage") {
        setDiscountAmount(discountValue);
        setDiscountMessage(`تم تطبيق خصم ${OriginalDiscountValue}%`);
      } else {
        setDiscountAmount(discountValue);
        setDiscountMessage(`تم تطبيق خصم بقيمة ${OriginalDiscountValue}$`);
      }

      setIsDiscountApplied(true);
      onDiscountChange({
        amount: discountValue,
        code: codeName,
      });
    } catch (error) {
      setDiscountMessage(
        error.response?.data?.message || "حدث خطأ أثناء تطبيق كود الخصم"
      );
      setDiscountAmount(0);
      setIsDiscountApplied(false);
      onDiscountChange({ amount: 0, code: null });
    }
  };

  const togglePromoCode = () => {
    if (!/\S/.test(promoCode)) {
      setDiscountMessage("يرجى إدخال كود الخصم");
      return;
    }

    if (isDiscountApplied) {
      setIsDiscountApplied(false);
      setDiscountAmount(0);
      setDiscountMessage("");
      setPromoCode("");
      setDiscountCode(null);
      onDiscountChange({ amount: 0, code: null });
    } else {
      applyDiscount(totalPrice);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-nano-bg-additional-200 rounded-lg p-4 shadow-lg"
      >
        <label
          htmlFor="promoCode"
          className="block mb-2 font-semibold text-nano-text-100"
        >
          كود الخصم:
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            id="promoCode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-grow bg-nano-bg-additional-300 text-nano-text-100 rounded-r py-2 px-3 focus:outline-none focus:ring-2 focus:ring-nano-primary-300"
            placeholder="أدخل كود الخصم"
            disabled={isDiscountApplied}
          />
          <button
            onClick={togglePromoCode}
            className={`${
              isDiscountApplied
                ? "bg-nano-error-100 hover:bg-nano-error-200"
                : "bg-nano-primary-200 hover:bg-nano-primary-300"
            } text-nano-text-100 font-bold py-2 px-4 rounded-l transition duration-300`}
          >
            {isDiscountApplied ? "الغاء" : "تطبيق"}
          </button>
        </div>
        {discountMessage && (
          <p className="mt-2 text-sm text-nano-warning-100">
            {discountMessage}
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PromoCode;
