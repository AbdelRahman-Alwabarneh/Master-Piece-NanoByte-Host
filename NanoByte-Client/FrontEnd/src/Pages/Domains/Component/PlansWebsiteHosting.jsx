import svgexport_14 from "../../../Assets/Photo/svgexport-14.svg";
import { Link } from "react-router-dom";

function PlansWebsiteHosting() {
  return (
    <>
      <div className="[direction:rtl] mt-7 mb-10 font-cairo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {/* بطاقة Cpanel */}
          <div className="bg-blue-900 p-6 md:p-8 rounded-lg shadow-lg transform transition-all hover:scale-[1.02]">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg flex items-center justify-center">
                <img
                  src={svgexport_14}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white ml-2 mr-2 md:ml-4">
                إضافة استضافة مواقع (Cpanel)
              </h3>
            </div>
            <p className="text-sm md:text-xl mb-4 text-white">
              استضافة مواقع PHP لاستضافة تطبيقات PHP وتطبيق على نظام Linux
              باستخدام واجهة
            </p>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm md:text-[18px] font-semibold text-white mb-2 md:mb-0">
                إنطلق الآن مع استضافة نانوبايت
              </p>
              <Link to="/LinuxWebsiteHosting">
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-[10px] shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-110 hover:animate-pulse">
                  اذهب الآن
                </button>
              </Link>
            </div>
          </div>

          {/* بطاقة Plesk */}
          <div className="bg-blue-900 p-6 md:p-8 rounded-lg shadow-lg transform transition-all hover:scale-[1.02]">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg flex items-center justify-center">
                <img
                  src={svgexport_14}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white ml-2 mr-2 md:ml-4">
                إضافة استضافة مواقع (Plesk)
              </h3>
            </div>
            <p className="text-sm md:text-xl mb-4 text-white">
              إستضافة تدعم تطبيقات الويندوز مثل .NET ولغات البرمجة التي تدعمها
              تطبيقات الويندوز
            </p>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm md:text-[18px] font-semibold text-white mb-2 md:mb-0">
                إنطلق الآن مع استضافة نانوبايت
              </p>
              <Link to="/WindowsWebsiteHosting">
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-[10px] shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-110 hover:animate-pulse">
                  اذهب الآن
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlansWebsiteHosting;
