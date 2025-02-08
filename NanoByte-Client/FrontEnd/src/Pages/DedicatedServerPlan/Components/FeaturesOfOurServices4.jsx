import services_svg2 from "../../../Assets/Photo/Security.svg";

function FeaturesOfOurServices4({motion, useInView}) {
  const { ref: imgRef, inView: imgVisible } = useInView({
    triggerOnce: true, 
    threshold: 0.2
  });
  const { ref: textRef, inView: textVisible } = useInView({
    triggerOnce: true, 
    threshold: 0.2
  });
  return (
    <>
      <div className="font-cairo sm:flex items-center justify-center max-w-screen-xl mx-auto">
      <motion.div
          ref={textRef}
          className="sm:w-1/2 p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: textVisible ? 1 : 0,
            y: textVisible ? 0 : 10
          }}
          transition={{ duration: 1 }}
        >
          <div className="text-right">
            <span className="text-white border-b-2 border-white uppercase">
              نانوبايت هوست
            </span>
            <h2 className="my-4 font-bold text-3xl text-white sm:text-4xl">
              نظام حماية من هجمات DDoS عالي الكفاءة
            </h2>
            <p className="text-white">
              <span className="font-bold">
                نحن نقدم نظام حماية DDoS من Arbor عالي الكفائة.
              </span>
              <br />
              <br />
              <span className="font-semibold">
                تعاوننا مع شركة Arbor يتيح لنا حماية شبكتنا من هجمات إيقاف
                الخدمة (DDoS) لضمان أمان خدمات عملائنا. <br /> نظام الحماية
                لدينا قادر على التصدي لهجمات تصل قوتها إلى 2.5 تيرابايت في
                الثانية الواحدة.
              </span>
            </p>
          </div>
        </motion.div>
        <motion.div
          ref={imgRef}
          className="sm:w-1/2 p-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: imgVisible ? 1 : 0,
            y: imgVisible ? 0 : 10
          }}
          transition={{ duration: 1 }}
        >
          <div className="image object-center text-center">
            <img alt="نظام حماية من هجمات DDoS عالي الكفاءة" src={services_svg2} />
          </div>
        </motion.div>
      </div>
    </>
  );
}
export default FeaturesOfOurServices4;
