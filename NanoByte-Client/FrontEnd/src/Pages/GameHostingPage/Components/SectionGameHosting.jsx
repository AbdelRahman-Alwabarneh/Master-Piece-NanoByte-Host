function SectionGameHosting({motion, AnimatePresence}) {
  return (
    <AnimatePresence>
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="font-cairo mt-[100px] py-8 px-4  ">
      <h2 className="mb-5 text-2xl sm:text-3xl lg:text-4xl tracking-tight font-extrabold text-white text-center">
        إستضافة خوادم الألعاب
      </h2>
        <p className="mb-5 font-light text-white text-sm sm:text-base lg:text-xl text-center">
        استعد لخوض تجربة لعب بلا حدود مع نانوبايت هوست.
          <br />
          حيث الأداء القوي والاستضافة الاحترافية لتأخذ مغامرتك إلى مستوى آخر.
        </p>
    </motion.div>
    </AnimatePresence>
  );
}

export default SectionGameHosting;
