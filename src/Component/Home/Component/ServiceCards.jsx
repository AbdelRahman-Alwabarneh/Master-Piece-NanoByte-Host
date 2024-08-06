import React from 'react';
import { useInView } from 'react-intersection-observer';
import Website1 from "../../Photo/svgexport-10 1.svg";
import Website2 from "../../Photo/svgexport-9 1.svg";
import Website3 from "../../Photo/svgexport-8 1.svg";
import Website4 from "../../Photo/svgexport-7 2.svg";
import { Link } from "react-router-dom";

function ServiceCards() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true, // التأثير يحدث في كل مرة يظهر فيها العنصر في العرض
    threshold: 0.2,
  });

  return (
    <div ref={sectionRef} className="relative">
      <h2 className="font-cairo text-white sm:text-4xl text-2xl font-bold text-center mb-5 mt-7">
        خدماتنا
      </h2>
      <p className="font-cairo text-white text-center">
        يمكنك من هنا مشاهدة الخدمات المتوفرة
      </p>
      <div className="font-cairo grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-4 mt-10 px-4 max-w-screen-xl mx-auto">
        {/* <!-- Card 1 --> */}
        <div className={`bg-gradient-to-b bg-[#182D7E] w-full h-full rounded-lg shadow-lg transform transition-transform duration-700 ease-in-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-105`}>
          <Link to="/LinuxWebsiteHosting">
            <div className="flex justify-center items-center mt-4">
              <img
                className="rounded-t-lg w-[230px] object-contain"
                src={Website1}
                alt="Image 1"
              />
            </div>
            <div className="p-5 flex-grow">
              <h5 className="mb-2 text-xl font-bold text-center tracking-tight text-white">
                إستضافة مواقع
              </h5>
              <p className="text-center mb-3 font-normal text-gray-300">
                أفضل إستظافة مواقع بلوحتين تدعم اكثر من لغة
              </p>
            </div>
            <h1 className="text-center mb-3 font-bold text-gray-200 p-5">
              تبدأ الأسعار من 1.99$ شهري
            </h1>
          </Link>
        </div>
        {/* <!-- Card 2 --> */}
        <div className={`bg-gradient-to-b bg-[#182D7E] w-full h-full rounded-lg shadow-lg transform transition-transform duration-700 ease-in-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-105`}>
          <Link to="/">
            <div className="flex justify-center items-center mt-4">
              <img
                className="rounded-t-lg w-[230px] object-contain"
                src={Website2}
                alt="Image 2"
              />
            </div>
            <div className="p-5 flex-grow">
              <h5 className="mb-2 text-xl font-bold text-center tracking-tight text-white">
                إستضافة خوادم ألعاب
              </h5>
              <p className="text-center mb-3 font-normal text-gray-300">
                إستضافة ألعاب بلوحة تحكم سهلة ومميزة
              </p>
            </div>
            <h1 className="text-center mb-3 font-bold text-gray-200 p-5">
              تبدأ الأسعار من 4$ شهري
            </h1>
          </Link>
        </div>
        {/* <!-- Card 3 --> */}
        <div className={`bg-gradient-to-b bg-[#182D7E] w-full h-full rounded-lg shadow-lg transform transition-transform duration-700 ease-in-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-105`}>
          <Link to="/VpsServer">
            <div className="flex justify-center items-center mt-4">
              <img
                className="rounded-t-lg w-[230px] object-contain"
                src={Website3}
                alt="Image 3"
              />
            </div>
            <div className="p-5 flex-grow">
              <h5 className="mb-2 text-xl font-bold text-center tracking-tight text-white">
                ( VPS ) إستضافة خوادم
              </h5>
              <p className="text-center mb-3 font-normal text-gray-300">
                خوادم افتراضية سهلة الأستعمال وبأسعار معقولة
              </p>
            </div>
            <h1 className="text-center mb-3 font-bold text-gray-200 p-5">
              تبدأ الأسعار من 6$ شهري
            </h1>
          </Link>
        </div>
        {/* <!-- Card 4 --> */}
        <div className={`bg-gradient-to-b bg-[#182D7E] w-full h-full rounded-lg shadow-lg transform transition-transform duration-700 ease-in-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-105`}>
          <Link to="/DedicatedServer">
            <div className="flex justify-center items-center mt-4">
              <img
                className="rounded-t-lg w-[230px] object-contain"
                src={Website4}
                alt="Image 4"
              />
            </div>
            <div className="p-5 flex-grow">
              <h5 className="mb-2 text-xl font-bold text-center tracking-tight text-white">
                إستضافة خوادم مركزية
              </h5>
              <p className="text-center mb-3 font-normal text-gray-300">
                خادم مخصص بأداء عالي وأمان شامل
              </p>
            </div>
            <h1 className="text-center mb-3 font-bold text-gray-200 p-5">
              تبدأ الأسعار من 40$ شهري
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceCards;
