import services_svg from "../../../Assets/Photo/servers.svg";

function FeaturesOfOurServices1({motion, useInView}) {
  const { ref: imgRef, inView: imgVisible } = useInView({
    triggerOnce: true, 
    threshold: 0.2
  });
  const { ref: textRef, inView: textVisible } = useInView({
    triggerOnce: true, 
    threshold: 0.2
  });
  return (
      <div>
        <h2 className="font-cairo text-3xl font-bold text-center text-nano-text-100 mb-3 mt-[100px]">
          ما الذي يميزنا
        </h2>
        <p className="font-cairo text-white text-center">
          تتميز خدماتنا بمزايا فريدة لا تتوفر لدى الاستضافات الأخرى، <br /> وذلك
          بفضل تفوق فريق العمل لدينا في تقديم تجربة مميزة تسهل أعمالك وتضفي
          عليها طابعًا من الراحة والأمان
        </p>
        <div className="font-cairo sm:flex items-center justify-center max-w-screen-xl mx-auto mt-10">
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
              <img alt="Services Img" src={services_svg} />
            </div>
          </motion.div>
          <motion.div
          ref={textRef}
          className="sm:w-1/2 p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: textVisible ? 1 : 0,
            y: textVisible ? 0 : 10
          }}>
            <div className="text">
              <span className="text-white border-b-2 border-[#fff] uppercase">
                نانوبايت هوست
              </span>
              <h2 className="my-4 font-bold text-3xl text-white sm:text-4xl ">
                خدمة من مستوى أخر
              </h2>
              <p className="text-white font-semibold">
                <i className="fa-solid fa-check ml-1"></i>
                أسعار تنافسية تناسب الجميع مع جودة مثالية.
                <br />
                <br />
                <i className="fa-solid fa-check ml-1"></i>
                لوحة تحكم خاصة بالخدمة سهلة وسلسة
                <br />
                <br />
                <i className="fa-solid fa-check ml-1"></i>
                سرعة تركيب خلال{" "}
                <span className="font-bold">أقل من 5 دقائق </span>
                وإستلام من خلال البريد الإلكتروني(الإيميل)
                <br />
                <br />
                <i className="fa-solid fa-check ml-1"></i>
                تنوع في أنظمة التشغيل ودعم لجميع أنطمة اللينيكس والويندوز
                <br />
                <br />
                <i className="fa-solid fa-check ml-1"></i>
                لوحة دخول للخادم حتى لو كان غير متصل في الإنترنت
                <br />
                <br />
                كل ما تحتاجه للحصول على خادم بمتناول يدك هو مجرد نقرة واحدة. قم
                بتقديم طلبك الآن، وستحصل على الخدمة المطلوبة قبل أن تنتهي من شرب
                قهوتك.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
  );
}
export default FeaturesOfOurServices1;
