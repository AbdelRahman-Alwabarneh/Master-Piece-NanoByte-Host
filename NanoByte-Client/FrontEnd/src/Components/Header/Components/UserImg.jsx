import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import userImg from "../../../Assets/Photo/nano-user-img.png";
import { User, ShoppingBag, LogOut, Boxes, MailSearch } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearUserProfile } from "../../../Redux/Slice/profileSlice";
import BorgarMenuButton from "./BorgarMenuButton";
function UserImg({ user, BorgarMenu, setBorgarMenu, AnimatePresence, motion }) {
  const [ProfileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function ProfileServices() {
    setProfileDropdown(!ProfileDropdown);
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/LogOut`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(clearUserProfile());
        navigate("/login");
      }
    } catch (error) {
      console.error("خطأ في تسجيل الخروج", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTimeout(() => {
          setProfileDropdown(false);
        }, 100);
      }
    }
    if (ProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ProfileDropdown]);

  return (
    <>
      <div
        style={{ userSelect: "none" }}
        className="relative flex items-center "
      >
        <img
          className="h-12 w-12 cursor-pointer rounded-full shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] ml-3"
          src={user.UsersData[0].profileImage || userImg}
          alt="Profile"
          onClick={ProfileServices}
        />
        <AnimatePresence>
          {ProfileDropdown && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute -right-44 top-[3.8rem] w-56 bg-nano-bg-additional-200 border border-nano-border-300 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out"
            >
              <ul className="divide-y divide-nano-bg-400">
                <li>
                  <Link
                    to="/UserControlPanel"
                    className="flex items-center justify-start px-4 py-3 text-nano-text-200 hover:bg-nano-bg-400 transition duration-300"
                    onClick={() => setServicesDropdown(false)}
                  >
                    <User className="w-5 h-5 ml-1 text-nano-accent-500" />
                    <span className="font-cairo ">الملف الشخصي</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Services/VPS"
                    className="flex items-center justify-start px-4 py-3 text-nano-text-200 hover:bg-nano-bg-400 transition duration-300"
                    onClick={() => setServicesDropdown(false)}
                  >
                    <Boxes className="w-5 h-5 ml-1 text-nano-accent-500" />
                    <span className="font-cairo ">إدارة المنتجات</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Orders"
                    className="flex items-center justify-start px-4 py-3 text-nano-text-200 hover:bg-nano-bg-400 transition duration-300"
                    onClick={() => setServicesDropdown(false)}
                  >
                    <ShoppingBag className="w-5 h-5 ml-1 text-nano-accent-500" />
                    <span className="font-cairo ">الطلبات</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/EmailPage"
                    className="flex items-center justify-start px-4 py-3 text-nano-text-200 hover:bg-nano-bg-400 transition duration-300"
                    onClick={() => setServicesDropdown(false)}
                  >
                    <MailSearch className="w-5 h-5 ml-1 text-nano-accent-500" />
                    <span className="font-cairo ">سجل البريد</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-start w-full px-4 py-3 text-nano-error-200 hover:bg-nano-error-300/15 transition duration-300"
                  >
                    <LogOut className="w-5 h-5 ml-1" />
                    <span className="font-cairo ">تسجيل الخروج</span>
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <BorgarMenuButton
          BorgarMenu={BorgarMenu}
          setBorgarMenu={setBorgarMenu}
        />
      </div>
    </>
  );
}
export default UserImg;
