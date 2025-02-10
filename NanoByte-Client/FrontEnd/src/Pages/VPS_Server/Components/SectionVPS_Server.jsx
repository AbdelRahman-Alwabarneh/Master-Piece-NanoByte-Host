function SectionVPS_Server({ motion, AnimatePresence }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-cairo mt-[100px] py-8 px-4"
      >
        <h2 className="mb-5 text-2xl sm:text-3xl lg:text-4xl tracking-tight font-extrabold text-white text-center">
          إستضافة خوادم مشتركة (VPS)
        </h2>
        <p className="mb-5 font-light text-white text-sm sm:text-base lg:text-xl text-center">
          كن مستعدًا للارتقاء بخدماتك مع نانوبايت هوست.
          <br />
          نقدم لك استضافة مشتركة عالية الأداء لضمان سرعة وأمان وموثوقية لا مثيل
          لها.
        </p>
      </motion.div>
    </>
  );
}

export default SectionVPS_Server;
