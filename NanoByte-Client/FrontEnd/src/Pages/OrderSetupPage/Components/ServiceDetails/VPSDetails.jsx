function serviceDetails({ serviceDetails, AnimatePresence, motion }) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-nano-bg-additional-200 rounded-lg p-4 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 border-b border-nano-border-200 pb-2">
            ملخص الطلب
          </h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex justify-between">
                <span className="text-nano-text-200">المعالج:</span>
                <span className="text-nano-text-100">{serviceDetails.cpu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nano-text-200">الذاكرة:</span>
                <span className="text-nano-text-100">{serviceDetails.ram}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nano-text-200">التخزين:</span>
                <span className="text-nano-text-100">
                  {serviceDetails.storage}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-nano-text-200">سرعة الاتصال:</span>
                <span className="text-nano-text-100">
                  {serviceDetails.connectionSpeed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-nano-text-200">الحماية:</span>
                <span className="text-nano-text-100">
                  {serviceDetails.security}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default serviceDetails;
