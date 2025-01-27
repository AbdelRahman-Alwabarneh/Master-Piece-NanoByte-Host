import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function ButtonsNavBar({
  user,
  servicesDropdown,
  setServicesDropdown,
  BorgarMenu,
  setBorgarMenu,
  motion,
  AnimatePresence,
}) {
  function toggleServices() {
    setServicesDropdown(!servicesDropdown);
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTimeout(() => {
          setBorgarMenu(false);
        }, 100);
      }
    }
    if (BorgarMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [BorgarMenu]);
  return (
    <>
      <div
        className={`items-center justify-between ${
          BorgarMenu ? "flex" : "hidden"
        } w-full min-[870px]:flex min-[870px]:w-auto min-[870px]:order-1`}
        id="navbar-sticky"
        ref={dropdownRef}
      >
        <ul className="w-full text-start flex flex-col p-4 min-[870px]:p-0 mt-4 font-medium border rounded-lg min-[870px]:space-x-8 rtl:space-x-reverse min-[870px]:flex-row min-[870px]:mt-0 min-[870px]:border-0 min-[870px]:bg-nano-bg-additional-100 bg-nano-bg-additional-200 border-nano-primary-100">
          <li>
            <Link
              to="/"
              className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-nano-bg-additional-500 min-[870px]:hover:bg-transparent min-[870px]:hover:text-nano-primary-800 min-[870px]:p-0"
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <span
              id="dropdownNavbarLink"
              onClick={toggleServices}
              className={`font-bold font-cairo ${
                servicesDropdown
                  ? "max-[870px]:bg-nano-bg-additional-500 min-[870px]:text-nano-primary-800 rounded-t-lg"
                  : "rounded-lg"
              } cursor-pointer flex items-center justify-start w-full py-2 px-3 min-[870px]:hover:text-nano-primary-800 group hover:bg-nano-bg-additional-500 min-[870px]:hover:bg-transparent min-[870px]:border-1 min-[870px]:hover:bg-nano-bg-additional-100 min-[870px]:p-0 text-nano-text-100`}
              style={{ userSelect: "none" }}
            >
              خدماتنا
              <i
                className={`text-white mr-2 text-[15px] fa-solid  min-[870px]:group-hover:text-nano-primary-800 ${
                  servicesDropdown
                    ? "fa-angle-down rotate-180 min-[870px]:text-nano-primary-800"
                    : "fa-angle-down"
                }`}
                style={{
                  transition: "transform 0.3s ease",
                }}
              ></i>
            </span>

            {/* <!-- Dropdown menu --> */}
            <AnimatePresence>
              {servicesDropdown && (
                <motion.div
                  id="dropdownNavbar"
                  className={`z-10 min-[870px]:hidden font-bold font-cairo bg-nano-bg-additional-500 divide-y divide-gray-100 rounded-t-none rounded-b-lg shadow items-center justify-center w-full`}
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 w-full"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li className="w-full">
                      <Link
                        to="/DedicatedServer"
                        className="block px-4 py-2 w-full text-white transition duration-200 ease-in-out hover:bg-nano-bg-additional-400 hover:text-white rounded-lg"
                      >
                        إستضافة خوادم مركزية
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link
                        to="/VpsServer"
                        className="block px-4 py-2 w-full text-white transition duration-200 ease-in-out hover:bg-nano-bg-additional-400 hover:text-white rounded-lg"
                      >
                        إستضافة خوادم VPS
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link
                        to="/GameHostingPage"
                        className="block px-4 py-2 w-full text-white transition duration-200 ease-in-out hover:bg-nano-bg-additional-400 hover:text-white rounded-lg"
                      >
                        إستضافة خوادم ألعاب
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link
                        to="/LinuxWebsiteHosting"
                        className="block px-4 py-2 w-full text-white transition duration-200 ease-in-out hover:bg-nano-bg-additional-400 hover:text-white rounded-lg"
                      >
                        إستضافة مواقع
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li>
            <Link
              to="/Domains"
              className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-nano-bg-additional-500 min-[870px]:hover:bg-transparent min-[870px]:hover:text-nano-primary-800 min-[870px]:p-0"
            >
              النطاقات
            </Link>
          </li>
          <li>
            <Link
              to="/ExplanationsLibrary"
              className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-nano-bg-additional-500 min-[870px]:hover:bg-transparent min-[870px]:hover:text-nano-primary-800 min-[870px]:p-0"
            >
              الدعم الفني
            </Link>
          </li>
          <li>
            <Link
              to="/AboutNanobyte"
              className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-nano-bg-additional-500 min-[870px]:hover:bg-transparent min-[870px]:hover:text-nano-primary-800 min-[870px]:p-0"
            >
              عن نانوبايت
            </Link>
          </li>
          <li>
            <Link
              to="/ContactNanobyte"
              className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-nano-bg-additional-500 min-[870px]:hover:bg-transparent min-[870px]:hover:text-nano-primary-800 min-[870px]:p-0"
            >
              اتصل بنا
            </Link>
          </li>

          {user ? null : (
            <div className="relative group font-cairo min-[870px]:hidden">
              <div className="relative w-auto h-11 overflow-hidden rounded-lg bg-nano-primary-100 z-10">
                {/* Animated gradient overlay */}
                <div className="absolute z-10 -translate-x-[53rem] group-hover:translate-x-[30rem] ease-in transition-all duration-1000 h-full w-44 bg-gradient-to-r from-nano-primary-500 to-white/5 opacity-30 -skew-x-12"></div>

                {/* Button container */}
                <Link
                  to="/SignUp"
                  className="absolute flex items-center justify-center text-nano-text-100 z-[1] rounded-lg inset-[2px] bg-nano-primary-100"
                >
                  <button
                    name="text"
                    className="input font-bold text-sm h-full w-full px-4 py-2 rounded-lg bg-nano-primary-200 hover:bg-nano-primary-300 transition-colors duration-300"
                  >
                    التسجيل
                  </button>
                </Link>

                {/* Glowing effect */}
                <div className="absolute duration-1500 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-nano-primary-200 to-nano-primary-600 blur-[30px]"></div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
export default ButtonsNavBar;
