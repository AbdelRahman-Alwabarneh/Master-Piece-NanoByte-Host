function SectionDedicatedServer({ AnimatePresence, motion }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 "
      >
        <h2 className="mb-5 text-2xl sm:text-3xl lg:text-4xl tracking-tight font-extrabold text-white">
          إستضافة خوادم مركزية
          <span className="inline-block mx-1">( Dedicated )</span>
        </h2>
        <p className="mb-5 font-light text-white text-sm sm:text-base lg:text-xl">
          استعد لتجربة استثنائية ومتميزة مع نانوبايت هوست.
          <br />
          نقدم لك خدماتنا عالية الجودة لتلبية احتياجاتك بكفاءة واحترافية.
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default SectionDedicatedServer;
