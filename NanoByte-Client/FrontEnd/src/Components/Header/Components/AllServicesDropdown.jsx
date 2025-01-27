import { useEffect, useRef } from "react";
import Website1 from "../../../Assets/Photo/svgexport-10 1.svg";
import Website2 from "../../../Assets/Photo/svgexport-9 1.svg";
import Website3 from "../../../Assets/Photo/svgexport-8 1.svg";
import Website4 from "../../../Assets/Photo/svgexport-7 2.svg";
import { Link } from "react-router-dom";

function ServicesDropdown({
  servicesDropdown,
  setServicesDropdown,
  motion,
  AnimatePresence,
}) {
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTimeout(() => {
          setServicesDropdown(false);
        }, 100);
      }
    }
    if (servicesDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [servicesDropdown]);
  return (
    <div dir="rtl" className="">
      <AnimatePresence>
        {servicesDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`font-cairo max-[870px]:hidden fixed left-0 right-0 top-[60px] bg-nano-bg-additional-200 shadow-lg z-10 h-[180px]`}
          >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className={`flex justify-around items-center h-full`}>
                <Link to="/DedicatedServer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-center py-2 px-4   cursor-pointer"
                  >
                    <img
                      src={Website4}
                      alt="Other Services"
                      className="mx-auto h-16 w-16"
                    />
                    <p className="mt-2 font-cairo text-lg font-bold text-nano-text-100">
                      إستضافة خوادم مركزية
                    </p>
                    <p className="text-nano-text-100 ">تبدأ من $40</p>
                  </motion.div>
                </Link>
                <Link to="/VpsServer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-center py-2 px-4   cursor-pointer"
                  >
                    <img
                      src={Website3}
                      alt="Game Servers"
                      className="mx-auto h-16 w-16"
                    />
                    <p className="mt-2 font-cairo text-lg font-bold text-nano-text-100">
                      VPS إستضافة خوادم
                    </p>
                    <p className="text-nano-text-100">تبدأ من $6</p>
                  </motion.div>
                </Link>
                <Link to="/GameHostingPage">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-center py-2 px-4   cursor-pointer"
                  >
                    <img
                      src={Website2}
                      alt="Hosting"
                      className="mx-auto h-16 w-16"
                    />
                    <p className="mt-2 font-cairo text-lg font-bold text-nano-text-100">
                      إستضافة خوادم ألعاب
                    </p>
                    <p className="text-nano-text-100">تبدأ من $4</p>
                  </motion.div>
                </Link>
                <Link to="/LinuxWebsiteHosting">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-center py-2 px-4   cursor-pointer"
                  >
                    <img
                      src={Website1}
                      alt="VPS"
                      className="mx-auto h-16 w-16"
                    />
                    <p className="mt-2 font-cairo text-lg font-bold text-nano-text-100">
                      إستضافة مواقع
                    </p>
                    <p className="text-nano-text-100">يبدأ من $1.99</p>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ServicesDropdown;
