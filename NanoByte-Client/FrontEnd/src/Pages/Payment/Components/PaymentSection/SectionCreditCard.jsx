function SectionCreditCard({ CreditCard, motion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div>
        <label htmlFor="cardName" className="block mb-1 text-nano-text-200">
          اسم حامل البطاقة
        </label>
        <input
          type="text"
          id="cardName"
          className="w-full bg-nano-bg-additional-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-nano-primary-300 text-nano-text-100 placeholder-nano-text-700"
          placeholder="أدخل اسم حامل البطاقة"
        />
      </div>
      <div>
        <label htmlFor="cardNumber" className="block mb-1 text-nano-text-200">
          رقم البطاقة
        </label>
        <div className="relative">
          <input
            type="text"
            id="cardNumber"
            className="w-full bg-nano-bg-additional-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-nano-primary-300 text-nano-text-100 placeholder-nano-text-700"
            placeholder="xxxx xxxx xxxx xxxx"
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nano-text-300" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <label htmlFor="expiryDate" className="block mb-1 text-nano-text-200">
            تاريخ انتهاء البطاقة
          </label>
          <input
            type="text"
            id="expiryDate"
            className="w-full bg-nano-bg-additional-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-nano-primary-300 text-nano-text-100 placeholder-nano-text-700"
            placeholder="MM / YY"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="cvv" className="block mb-1 text-nano-text-200">
            (CVV) رمز الأمان
          </label>
          <input
            type="text"
            id="cvv"
            className="w-full bg-nano-bg-additional-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-nano-primary-300 text-nano-text-100 placeholder-nano-text-700"
            placeholder="xxx"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SectionCreditCard;
