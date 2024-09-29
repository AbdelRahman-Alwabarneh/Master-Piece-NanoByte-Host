import React from 'react';
import { useInView } from 'react-intersection-observer';
import dedicated_server_with_cpu from "../../../Assets/Photo/dedicated_server-with-cpu.png";
import { Link } from "react-router-dom";

function HeroSection() {
  const { ref: heroSectionRef, inView } = useInView({
    triggerOnce: true, // تأثير يحدث فقط عند الدخول في العرض لأول مرة
    threshold: 0.2 // تحديد نسبة الظهور المطلوبة لبدء الترانزيشن
  });

  return (
    <div
      ref={heroSectionRef}
      className={`mt-[72px] [direction:rtl] font-cairo transition-opacity duration-700 ease-in-out ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5 transition-transform duration-700 ease-in-out ${inView ? 'transform translate-y-0' : 'transform translate-y-10'}`}
      >
        <div className="pr-2 md:mb-14 py-14 md:py-0">
          <h1 className="text-3xl font-semibold text-[white] xl:text-5xl lg:text-3xl text-center lg:text-right">
            <span className="block w-full mb-3">نانوبايت هوست</span> المكان الآمن
          </h1>
          <p className="py-4 text-lg font-semibold text-[white] 2xl:py-8 md:py-6 text-center lg:text-right">
            انطلق مع نانوبايت هوست واستمتع بأفضل خدمات الحوسبة السحابية،
            <br />
            حيث نقدم خدمات احترافية متميزة من فريقنا في نانوبايت هوست.
            <br />
            لا تقلق بشأن هجمات DDOS.
            <br />
            فنحن نوفر لك أمانًا مضمونًا لتجربة استخدام استثنائية.
            <br />
            كما أن فريق الدعم الفني متاح على مدار الساعة لضمان أفضل تجربة لكم.
          </p>
          <div className=" text-center lg:text-right">
            <Link
              to="/SignUp"
              className="relative inline-flex items-center justify-center px-5 py-3 font-bold text-lg tracking-wider text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg md:px-8 transition-transform duration-500 ease-in-out transform hover:scale-110 hover:from-blue-600 hover:to-blue-800 group shadow-lg hover:shadow-2xl"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 rounded-lg"></span>
              <span className="relative z-10">انطلق معنا</span>
            </Link>
          </div>
        </div>

        <div className="pb-10 md:p-10 lg:p-0 sm:pb-0 lg:block hidden">
          <img
            id="heroImg1"
            className="rounded-[100%] transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
            src={dedicated_server_with_cpu}
            alt="Awesome hero page image"
            width="500"
            height="488"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
