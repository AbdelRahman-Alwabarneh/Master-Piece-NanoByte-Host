function SectionPayPal({motion}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-nano-bg-additional-300 rounded-lg p-6 shadow-lg"
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-nano-text-200 mb-2">
            الدفع عبر PayPal
          </h3>
          <p className="text-nano-text-200 mb-4">
            اضغط على زر PayPal لإكمال عملية الدفع بواسطة PayPal
          </p>
          <ul className="list-disc text-right list-inside mb-6 space-y-2 text-nano-text-200">
            <li>حماية المشتري على مشترياتك المؤهلة</li>
            <li>إتمام عملية الدفع بنقرات قليلة</li>
            <li>لا حاجة لإدخال تفاصيل بطاقتك في كل مرة</li>
          </ul>
        </div>
      </motion.div>
    </>
  );
}

export default SectionPayPal;
