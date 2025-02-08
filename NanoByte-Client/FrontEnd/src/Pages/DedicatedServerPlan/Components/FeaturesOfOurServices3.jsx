import services_svg from "../../../Assets/Photo/server.svg";

function FeaturesOfOurServices3({motion={motion}, useInView}) {
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
      <h2 className="font-cairo text-3xl font-bold text-center text-white mb-3 mt-[100px]">
        ما الذي يميزنا
      </h2>
      <p className="font-cairo text-white text-center">
        تتميز خدماتنا بمزايا فريدة لا تتوفر لدى الاستضافات الأخرى، <br /> وذلك بفضل
        تفوق فريق العمل لدينا في تقديم تجربة مميزة تسهل أعمالك وتضفي عليها طابعًا من
        الراحة والأمان
      </p>
      <div className="font-cairo sm:flex items-center justify-center max-w-screen-xl mx-auto">
        {/* صورة السيرفر */}
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
            <img alt="ما الذي يميزنا" src={services_svg} />
          </div>
        </motion.div>
        
        {/* نص المميزات */}
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
          <div className="text">
            <span className="text-white border-b-2 border-[#fff] uppercase">
              نانوبايت هوست
            </span>
            <h2 className="my-4 font-bold text-3xl text-white sm:text-4xl">
              إستضافة خوادم مركزية
            </h2>
            <p className="text-white font-semibold">
              <i className="fa-solid fa-check ml-1"></i> أسعار تنافسية تناسب الجميع مع جودة مثالية.
              <br /><br />
              <i className="fa-solid fa-check ml-1"></i> لوحة تحكم خاصة بالخدمة سهلة وسلسة
              <br /><br />
              <i className="fa-solid fa-check ml-1"></i> تركيب السيرفر المخصص وضمان تشغيله بكفاءة عالية
              <br /><br />
              <i className="fa-solid fa-check ml-1"></i> تنوع في أنظمة التشغيل ودعم لجميع أنظمة اللينيكس والويندوز
              <br /><br />
              كل ما تحتاجه للحصول على سيرفر مخصص هو النقر على زر الطلب. قدّم طلبك الآن، وستتلقى الخدمة المطلوبة بسرعة فائقة.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default FeaturesOfOurServices3;
