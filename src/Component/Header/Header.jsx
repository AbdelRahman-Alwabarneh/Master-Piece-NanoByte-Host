import { useState } from "react";
import { Link } from "react-router-dom";
import Website1 from "../Photo/svgexport-10 1.svg";
import Website2 from "../Photo/svgexport-9 1.svg";
import Website3 from "../Photo/svgexport-8 1.svg";
import Website4 from "../Photo/svgexport-7 2.svg";

import LogoNanoByte from "../Photo/logolit-removebg-preview.png";

function Header() {
  const [BorgarMenu, setBorgarMenu] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  function toggle() {
    setBorgarMenu(!BorgarMenu);
  }

  function toggleServices() {
    setServicesDropdown(!servicesDropdown);
  }

  return (
    <>
      <nav className="bg-navbar-color fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <button
            onClick={toggle}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[870px]:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <Link
            to="/SingUp"
            className="max-[870px]:hidden font-bold font-cairo text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            التسجيل
          </Link>

          <div className="flex min-[870px]:order-2 space-x-3 min-[870px]:space-x-0 rtl:space-x-reverse">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="font-cairo self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                نانوبايت هوست
              </span>
              <img
                className="h-14"
                src={LogoNanoByte}
                alt="Logo NanoByte"
              />
            </Link>
          </div>
          <div
            className={`items-center justify-between ${
              BorgarMenu ? "flex" : "hidden"
            } w-full min-[870px]:flex min-[870px]:w-auto min-[870px]:order-1`}
            id="navbar-sticky"
          >
            <ul className="w-full text-center flex flex-col p-4 min-[870px]:p-0 mt-4 font-medium border rounded-lg min-[870px]:space-x-8 rtl:space-x-reverse min-[870px]:flex-row min-[870px]:mt-0 min-[870px]:border-0 min-[870px]:bg-navbar-color bg-[#1b4ab2] border-[#3955c7]">
              <li>
                <Link
                  to="/AboutNanobyte"
                  className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-blue-600 min-[870px]:hover:bg-transparent min-[870px]:hover:text-blue-300 min-[870px]:p-0"
                >
                  عن نانوبايت
                </Link>
              </li>
              <li>
                <Link
                  to="/SupportNanobyte"
                  className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-blue-600 min-[870px]:hover:bg-transparent min-[870px]:hover:text-blue-300 min-[870px]:p-0"
                >
                  الدعم الفني
                </Link>
              </li>
              <li>
                <Link
                  to="/Domain"
                  className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-blue-600 min-[870px]:hover:bg-transparent min-[870px]:hover:text-blue-300 min-[870px]:p-0"
                >
                  النطاقات
                </Link>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  onClick={toggleServices}
                  className="font-bold font-cairo flex items-center justify-center w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-300 dark:focus:text-white dark:border-gray-700 dark:hover:bg-blue-600 md:dark:hover:bg-transparent"
                >
                  خدماتنا
                  <i className={`text-white ml-2 text-[15px] ${servicesDropdown ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
                  
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownNavbar"
                  className={`z-10 min-[870px]:hidden ${
                    servicesDropdown ? "flex" : "hidden"
            } font-normal bg-blue-600 divide-y divide-gray-100 rounded-lg shadow items-center justify-center w-full dark:divide-gray-600`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100  dark:hover:text-red"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-blue-600 min-[870px]:hover:bg-transparent min-[870px]:hover:text-blue-300 min-[870px]:p-0"
                >
                  الرئيسية
                </Link>
              </li>
              <Link
                to="/SingUp"
                className="min-[870px]:hidden font-bold font-cairo text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 text-center"
              >
                التسجيل
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    
            {/* القائمة المنسدلة للخدمات */}
            {servicesDropdown && (
  <div className={`font-cairo max-[870px]:hidden fixed left-0 right-0 top-[60px] bg-[#2749ba] shadow-lg z-10 h-[180px]`}>
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div className={`flex justify-around items-center h-full`}>
        <Link to="/LinuxWebsiteHosting">
          <div className="text-center py-2 transition-transform duration-300 hover:scale-105">
            <img src={Website1} alt="VPS" className="mx-auto h-16 w-16" />
            <p className="mt-2 font-cairo text-lg font-bold text-white">إستضافة مواقع</p>
            <p className="text-white">يبدأ من $1.99</p>
          </div>
        </Link>
        <div className="text-center py-2 transition-transform duration-300 hover:scale-105">
          <img src={Website2} alt="Hosting" className="mx-auto h-16 w-16" />
          <p className="mt-2 font-cairo text-lg font-bold text-white">إستضافة خوادم ألعاب</p>
          <p className="text-white">تبدأ من $4</p>
        </div>
        <Link to="/VpsServer">
          <div className="text-center py-2 transition-transform duration-300 hover:scale-105">
            <img src={Website3} alt="Game Servers" className="mx-auto h-16 w-16" />
            <p className="mt-2 font-cairo text-lg font-bold text-white">VPS إستضافة خوادم</p>
            <p className="text-white">تبدأ من $6</p>
          </div>
        </Link>
        <Link to="/DedicatedServer">
          <div className="text-center py-2 transition-transform duration-300 hover:scale-105">
            <img src={Website4} alt="Other Services" className="mx-auto h-16 w-16" />
            <p className="mt-2 font-cairo text-lg font-bold text-white">إستضافة خوادم مركزية</p>
            <p className="text-white ">تبدأ من $50</p>
          </div>
        </Link>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default Header;