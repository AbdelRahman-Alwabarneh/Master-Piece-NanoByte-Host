import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/Slice/profileSlice";
import { motion, AnimatePresence } from "framer-motion";
import LoginButton from "./Components/LoginButton";
import LogoNanoByteAndName from "./Components/LogoNanoByte";
import ButtonsNavBar from "./Components/ButtonsNavBar";
import AllServicesDropdown from "./Components/AllServicesDropdown";
import UserImg from "./Components/UserImg";
import Loading from "../Loading/Loading";

function Header() {
  const [BorgarMenu, setBorgarMenu] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const { user, status } = useSelector((state) => state.profile);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status, location]);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <nav
        dir="rtl"
        className="bg-nano-bg-additional-100 fixed w-full z-20 top-0 start-0 border-b border-nano-bg-500"
      >
        <div className="max-w-screen-xl flex-row-reverse flex flex-wrap items-center justify-between mx-auto p-2">
          {user ? (
            <UserImg
              user={user}
              BorgarMenu={BorgarMenu}
              setBorgarMenu={setBorgarMenu}
              AnimatePresence={AnimatePresence}
              motion={motion}
            />
          ) : (
            <LoginButton
              BorgarMenu={BorgarMenu}
              setBorgarMenu={setBorgarMenu}
            />
          )}
          <LogoNanoByteAndName />
          <ButtonsNavBar
            user={user}
            servicesDropdown={servicesDropdown}
            setServicesDropdown={setServicesDropdown}
            BorgarMenu={BorgarMenu}
            setBorgarMenu={setBorgarMenu}
            AnimatePresence={AnimatePresence}
            motion={motion}
          />
        </div>
      </nav>
      <AllServicesDropdown
        servicesDropdown={servicesDropdown}
        setServicesDropdown={setServicesDropdown}
        AnimatePresence={AnimatePresence}
        motion={motion}
      />
    </>
  );
}

export default Header;
