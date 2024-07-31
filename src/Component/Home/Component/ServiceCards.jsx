import Website_hostingfrom from "../../Photo/7746831.webp";
import Website1 from "../../Photo/svgexport-10 1.svg";
import Website2 from "../../Photo/svgexport-9 1.svg";
import Website3 from "../../Photo/svgexport-8 1.svg";
import Website4 from "../../Photo/svgexport-7 2.svg";
import { Link } from "react-router-dom";

function ServiceCards() {
  return (
    <>
      <h2 className="font-cairo text-white sm:text-4xl text-2xl font-bold text-center mb-5 mt-7">
        خدماتنا
      </h2>
      <p className="font-cairo text-white text-center">
        يمكنك من هنا مشاهدة الخدمات المتوفرة
      </p>
      <div className="font-cairo grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-4 mt-10 px-4  max-w-screen-xl mx-auto">
        {/* <!-- Card 1 --> */}
        <div className="bg-gradient-to-b bg-[#182D7E] w-full h-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out dark:border-gray-700 flex flex-col justify-between">
          <a href="#" className="flex justify-center items-center mt-4">
            <img
              className="rounded-t-lg w-[230px] object-contain"
              src={Website1}
              alt="Image 1"
            />
          </a>
          <div className="p-5 flex-grow">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold text-center tracking-tight text-white">
                إستضافة مواقع
              </h5>
            </a>
            <p className="text-center mb-3 font-normal text-gray-300">
              أفضل إستظافة مواقع بلوحتين تدعم اكثر من لغة
            </p>
          </div>
          <h1 className="text-center mb-3 font-bold text-gray-200 p-5">
            تبدأ الأسعار من 1.99$ شهري
          </h1>
        </div>
        {/* <!-- Card 2 --> */}
        <div className="bg-gradient-to-b bg-[#182D7E] w-full h-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out dark:border-gray-700 flex flex-col justify-between">
          <a href="#" className="flex justify-center items-center mt-4">
            <img
              className="rounded-t-lg w-[230px] object-contain"
              src={Website2}
              alt="Image 1"
            />
          </a>
          <div className="p-5 flex-grow">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold text-center tracking-tight text-white">
                إستضافة خوادم ألعاب
              </h5>
            </a>
            <p className="text-center mb-3 font-normal text-gray-300">
              إستضافة ألعاب بلوحة تحكم سهلة ومميزة
            </p>
          </div>
          <h1 className="text-center mb-3 font-bold text-gray-200 p-5">
            تبدأ الأسعار من 4$ شهري
          </h1>
        </div>
        {/* <!-- Card 3 --> */}
        <div className="bg-gradient-to-b bg-[#182D7E] w-full h-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out dark:border-gray-700 flex flex-col justify-between">
          <Link to="/VpsServer" className="flex justify-center items-center mt-4">
            <img
              className="rounded-t-lg w-[230px] object-contain"
              src={Website3}
              alt="Image 1"
            />
          </Link>
          <div className="p-5 flex-grow">
            <Link to="/VpsServer">
              <h5 className="mb-2 text-xl font-bold text-center tracking-tight text-white">
                ( VPS ) إستضافة خوادم
              </h5>
            </Link>
            <p className="text-center mb-3 font-normal text-gray-300">
              خوادم افتراضية سهلة الأستعمال وبأسعار معقولة
            </p>
          </div>
          <h1 className="text-center mb-3 font-bold text-gray-200 p-5">
            تبدأ الأسعار من 6$ شهري
          </h1>
        </div>
        {/* <!-- Card 4 --> */}
        <div className="bg-gradient-to-b bg-[#182D7E] w-full h-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out dark:border-gray-700 flex flex-col justify-between">
          <a href="#" className="flex justify-center items-center mt-4">
            <img
              className="rounded-t-lg w-[230px] object-contain"
              src={Website4}
              alt="Image 1"
            />
          </a>
          <div className="p-5 flex-grow">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold text-center tracking-tight text-white">
                إستضافة خوادم مركزية
              </h5>
            </a>
            <p className="text-center mb-3 font-normal text-gray-300">
              خادم مخصص بأداء عالي وأمان شامل
            </p>
          </div>
          <h1 className="text-center mb-3 font-bold text-gray-200 p-5">
            تبدأ الأسعار من 40$ شهري
          </h1>
        </div>
      </div>
    </>
  );
}
export default ServiceCards;
