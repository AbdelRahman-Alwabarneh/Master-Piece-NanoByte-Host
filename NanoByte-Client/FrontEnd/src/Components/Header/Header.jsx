import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Website1 from "../../Assets/Photo/svgexport-10 1.svg";
import Website2 from "../../Assets/Photo/svgexport-9 1.svg";
import Website3 from "../../Assets/Photo/svgexport-8 1.svg";
import Website4 from "../../Assets/Photo/svgexport-7 2.svg";
import Loading from "../Loading/Loading";
import LogoNanoByte from "../../Assets/Photo/logolit-removebg-preview.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/Slice/profileSlice";
import { User, ShoppingBag, LogOut } from "lucide-react";
function Header() {
  const navigate = useNavigate();
  const [BorgarMenu, setBorgarMenu] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [ProfileDropdown, setProfileDropdown] = useState(false);
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.profile);
  const [isLoading, setIsLoading] = useState(true);

  function toggle() {
    setBorgarMenu(!BorgarMenu);
  }

  function toggleServices() {
    setServicesDropdown(!servicesDropdown);
  }
  function ProfileServices() {
    setProfileDropdown(!ProfileDropdown);
  }
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);
  
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:2000/api/LogOut", {},{
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("خطأ في تسجيل الخروج", error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
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

              <div>
                {user ? (
                  <>
                    <div className="flex items-center space-x-4">
                      <img
                        className="h-12 w-12 cursor-pointer rounded-full shadow-[0_0_10px_2px_rgba(0,0,0,0.3)]"
                        src={
                          user.UsersData[0].profileImage ||
                          "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
                        }
                        alt="Profile"
                        onClick={ProfileServices}
                      />
                      {/* <p
                        onClick={ProfileServices}
                        className="text-lg font-cairo font-bold text-white"
                      >
                        {user.UsersData[0].firstName}
                      </p> */}
                    </div>
                    {ProfileDropdown && (
                      <div className="absolute mt-2 w-64 bg-white border border-blue-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
                        <ul className="divide-y divide-blue-100">
                          <li>
                            <Link
                              to="/UserControlPanel"
                              className="flex items-center justify-end px-4 py-3 text-blue-800 hover:bg-blue-50 transition duration-300"
                              onClick={() => setServicesDropdown(false)}
                            >
                              <span className="font-cairo ml-3">
                                الملف الشخصي
                              </span>
                              <User className="w-5 h-5 text-blue-600" />
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/Orders"
                              className="flex items-center justify-end px-4 py-3 text-blue-800 hover:bg-blue-50 transition duration-300"
                              onClick={() => setServicesDropdown(false)}
                            >
                              <span className="font-cairo ml-3">الطلبات</span>
                              <ShoppingBag className="w-5 h-5 text-blue-600" />
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="flex items-center justify-end w-full px-4 py-3 text-red-600 hover:bg-red-50 transition duration-300"
                            >
                              <span className="font-cairo ml-3">
                                تسجيل الخروج
                              </span>
                              <LogOut className="w-5 h-5" />
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to="/SignUp"
                    className="max-[870px]:hidden font-bold font-cairo text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    التسجيل
                  </Link>
                )}
              </div>

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
                      to="/Domains"
                      className="font-bold font-cairo block py-2 px-3 text-white rounded hover:bg-blue-600 min-[870px]:hover:bg-transparent min-[870px]:hover:text-blue-300 min-[870px]:p-0"
                    >
                      النطاقات
                    </Link>
                  </li>
                  <li>
                    <span
                      id="dropdownNavbarLink"
                      onClick={toggleServices}
                      className={`font-bold font-cairo cursor-pointer flex items-center justify-center w-full py-2 px-3 rounded hover:bg-[#2563eb] min-[870px]:hover:bg-transparent min-[870px]:border-0 min-[870px]:hover:text-blue-300 min-[870px]:p-0 dark:text-white dark:focus:text-white dark:border-gray-700 min-[870px]:dark:hover:bg-transparent`}
                      style={{ userSelect: "none" }}
                    >
                      <i
                        className={`text-white mr-2 text-[15px] ${
                          servicesDropdown
                            ? "fa-solid fa-angle-up"
                            : "fa-solid fa-angle-down"
                        }`}
                      ></i>
                      خدماتنا
                    </span>

                    {/* <!-- Dropdown menu --> */}
                    <div
                      id="dropdownNavbar"
                      className={`z-10 min-[870px]:hidden ${
                        servicesDropdown ? "flex" : "hidden"
                      } font-bold font-cairo bg-blue-600 divide-y divide-gray-100 rounded-lg shadow items-center justify-center w-full dark:divide-gray-600`}
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-400 w-full"
                        aria-labelledby="dropdownLargeButton"
                      >
                        <li className="w-full">
                          <a
                            href="#"
                            className="block px-4 py-2 w-full text-white transition duration-200 ease-in-out hover:bg-blue-700 hover:text-white rounded-md"
                          >
                            إستضافة خوادم مركزية
                          </a>
                        </li>
                        <li className="w-full">
                          <a
                            href="#"
                            className="block px-4 py-2 w-full text-white transition duration-200 ease-in-out hover:bg-blue-700 hover:text-white rounded-md"
                          >
                            VPS إستضافة خوادم
                          </a>
                        </li>
                        <li className="w-full">
                          <a
                            href="#"
                            className="block px-4 py-2 w-full text-white transition duration-200 ease-in-out hover:bg-blue-700 hover:text-white rounded-md"
                          >
                            إستضافة خوادم ألعاب
                          </a>
                        </li>
                        <li className="w-full">
                          <a
                            href="#"
                            className="block px-4 py-2 w-full text-white transition duration-200 ease-in-out hover:bg-blue-700 hover:text-white rounded-md"
                          >
                            إستضافة مواقع
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
                    to="/SignUp"
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
            <div
              className={`font-cairo max-[870px]:hidden fixed left-0 right-0 top-[60px] bg-[#2749ba] shadow-lg z-10 h-[180px]`}
            >
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className={`flex justify-around items-center h-full`}>
                  <Link to="/LinuxWebsiteHosting">
                    <div className="text-center py-2 transition-transform duration-300 hover:scale-105">
                      <img
                        src={Website1}
                        alt="VPS"
                        className="mx-auto h-16 w-16"
                      />
                      <p className="mt-2 font-cairo text-lg font-bold text-white">
                        إستضافة مواقع
                      </p>
                      <p className="text-white">يبدأ من $1.99</p>
                    </div>
                  </Link>
                  <div className="text-center py-2 transition-transform duration-300 hover:scale-105">
                    <img
                      src={Website2}
                      alt="Hosting"
                      className="mx-auto h-16 w-16"
                    />
                    <p className="mt-2 font-cairo text-lg font-bold text-white">
                      إستضافة خوادم ألعاب
                    </p>
                    <p className="text-white">تبدأ من $4</p>
                  </div>
                  <Link to="/VpsServer">
                    <div className="text-center py-2 transition-transform duration-300 hover:scale-105">
                      <img
                        src={Website3}
                        alt="Game Servers"
                        className="mx-auto h-16 w-16"
                      />
                      <p className="mt-2 font-cairo text-lg font-bold text-white">
                        VPS إستضافة خوادم
                      </p>
                      <p className="text-white">تبدأ من $6</p>
                    </div>
                  </Link>
                  <Link to="/DedicatedServer">
                    <div className="text-center py-2 transition-transform duration-300 hover:scale-105">
                      <img
                        src={Website4}
                        alt="Other Services"
                        className="mx-auto h-16 w-16"
                      />
                      <p className="mt-2 font-cairo text-lg font-bold text-white">
                        إستضافة خوادم مركزية
                      </p>
                      <p className="text-white ">تبدأ من $40</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Header;
