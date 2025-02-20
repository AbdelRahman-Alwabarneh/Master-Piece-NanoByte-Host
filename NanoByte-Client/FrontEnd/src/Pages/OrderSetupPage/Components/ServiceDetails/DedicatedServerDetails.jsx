function DedicatedServerDetails({ serviceDetails, AnimatePresence, motion }) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-nano-bg-additional-200 rounded-lg p-6 shadow-2xl space-y-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-nano-text-100 border-b border-nano-border-200 pb-3">
            ملخص الطلب
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-nano-text-100">
                أسم الخطة:
              </span>
              <span className="text-nano-text-100">
                {serviceDetails.planTitle}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-nano-text-100">
                وصف الخطة:
              </span>
              <span className="text-nano-text-100">
                {serviceDetails.secondaryTitle}
              </span>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-nano-text-100">
                تفاصيل الخطة:
              </span>
              <p className="whitespace-pre-wrap text-nano-text-100 bg-nano-bg-additional-700 bg-opacity-30 p-3 rounded-md">
                {serviceDetails.planDescription}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default DedicatedServerDetails;
