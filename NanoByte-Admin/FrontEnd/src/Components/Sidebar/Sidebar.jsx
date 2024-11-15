import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  Contact,
  LogOut,
  CalendarCog,
  Logs,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Boxes,
  Globe,
  Server,
  HardDrive,
  PackageSearch,
  BadgePercent,
  BaggageClaim,
  TicketPercent,
  PackageCheck,
  PackageX,
  PackageOpen,
  MailPlus,
  Waypoints,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // لتحديد القائمة المفتوحة
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // فتح القائمة الفرعية بناءً على القائمة التي تم النقر عليها
  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const menuItems = [
    { icon: Home, text: "الرئيسية", path: "/" },
    { icon: Users, text: "العملاء", path: "/AllUsers" },
    {
      icon: BaggageClaim,
      text: "إِدارة الطلبات",
      path: "#",
      menuName: "orders", // تعريف اسم القائمة
      subMenu: [
        { icon: Boxes, text: "جميع الطلبات", path: "/OrderManagement/AllOrders" },
        { icon: PackageCheck, text: "الطلبات النشطة", path: "/OrderManagement/Active" },
        { icon: PackageSearch, text: "الطلبات المعلقة", path: "/OrderManagement/Pending" },
        { icon: PackageX, text: "الطلبات الملغية", path: "/OrderManagement/Cancelled" },
        { icon: PackageOpen, text: "احتيال", path: "/OrderManagement/Fraud" },
      ],
    },
    {
      icon: PackageSearch,
      text: "الخدمات / المنتجات",
      path: "#",
      menuName: "services", // تعريف اسم القائمة
      subMenu: [
        { icon: HardDrive, text: "الخودام المركزية", path: "/DedicatedServerManagement" },
        { icon: Server, text: "الخوادم المشتركة", path: "/VPSManagement" },
        { icon: Boxes, text: "إستضافة خوادم ألعاب", path: "/GameHostingManagement" },
        { icon: Globe, text: "إستضافة مواقع", path: "/WebsiteHostingManagement" },
        { icon: Waypoints, text: "النطاقات", path: "/DomainServiceManagement" },
      ],
    },
    {
      icon: TicketPercent,
      text: "إِدارة الترويج",
      path: "#",
      menuName: "promotion", // تعريف اسم القائمة
      subMenu: [
        { icon: BadgePercent, text: "العروض الترويجية", path: "/DiscountCodeManagement" },

      ],
    },
    { icon: MailPlus, text: "إِدارة البريد", path: "/EmailTemplateManagement" },
    { icon: Contact, text: "اتصل بنا", path: "/Dashboard/ContactUS" },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/LogOutAdmin",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("خطأ في تسجيل الخروج", error);
    }
  };

  return (
    <div className="font-cairo">
      <div
        className={`bg-[#1E38A3] text-white h-screen fixed right-0 top-0 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isMobile ? (isOpen ? "w-64" : "w-16") : "w-64"
        } z-50 overflow-y-auto`}
      >
        <div>
          <div className="flex items-center justify-between p-4 mt-5">
            {(!isMobile || isOpen) && (
              <h2 className="text-2xl font-bold">لوحة التحكم</h2>
            )}
            {isMobile && (
              <button
                className="text-white mx-1 rounded"
                onClick={toggleSidebar}
              >
                {isOpen ? (
                  <ChevronRight width={24} />
                ) : (
                  <Logs width={24} height={24} />
                )}
              </button>
            )}
          </div>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.subMenu ? (
                    <div>
                      <button
                        className={`flex items-center justify-between p-4 w-full rounded-t transition-colors duration-200 font-semibold ${
                          openDropdown === item.menuName
                            ? "bg-[#2f64bb] text-white"
                            : "hover:bg-[#60A5FA] text-gray-300"
                        }`}
                        onClick={() => toggleDropdown(item.menuName)}
                      >
                        <div className="flex items-center">
                          <item.icon
                            className={
                              isMobile && !isOpen ? "mx-auto" : "mr-2 ml-1"
                            }
                          />
                          {(!isMobile || isOpen) && <span>{item.text}</span>}
                        </div>
                        {openDropdown === item.menuName ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </button>
                      {openDropdown === item.menuName && (
                        <ul
                          className={`ml-8 space-y-2 w-full bg-[#2f64bb] ${
                            isMobile ? "pr-0" : "pr-2"
                          }`}
                        >
                          {item.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center p-2 ${
                                  isOpen && "pr-4 py-3"
                                } rounded transition-colors duration-200 font-semibold ${
                                  location.pathname === subItem.path
                                    ? "bg-[#3B82F6] text-white"
                                    : "hover:bg-[#60A5FA] text-gray-300"
                                }`}
                              >
                                {isMobile && !isOpen && (
                                  <subItem.icon
                                    width={24}
                                    className="mx-auto"
                                  />
                                )}
                                {(!isMobile || isOpen) && (
                                  <>
                                    <subItem.icon className="mr-2 ml-1" />
                                    <span>{subItem.text}</span>
                                  </>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center p-4 rounded transition-colors duration-200 font-semibold ${
                        location.pathname === item.path
                          ? "bg-[#3B82F6] text-white"
                          : "hover:bg-[#60A5FA] text-gray-300"
                      }`}
                    >
                      <item.icon
                        className={isMobile && !isOpen ? "mx-auto" : "mr-2 ml-1"}
                      />
                      {(!isMobile || isOpen) && <span>{item.text}</span>}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full p-4 rounded transition-colors duration-200 hover:bg-red-600 text-gray-300 font-semibold"
                >
                  <LogOut
                    className={isMobile && !isOpen ? "mx-auto" : "mr-2 ml-1"}
                  />
                  {(!isMobile || isOpen) && <span>تسجيل الخروج</span>}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {(!isMobile || isOpen) && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 w-10 h-10">
                <img
                  className="w-full h-full rounded-full"
                  src={`https://ui-avatars.com/api/?name=AbdelRahman&background=3B82F6&color=ffffff`}
                  alt=""
                />
              </div>
              <div className="font-semibold pr-2">عبد الرحمن</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
