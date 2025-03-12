import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupSuccessfull() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const login = queryParams.get("login");
  const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
  const [notificationShown, setNotificationShown] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (currentPath !== location.pathname) {
      setNotificationShown(false);
      setCurrentPath(location.pathname);
    }
  }, [location.pathname, currentPath]);

  useEffect(() => {
    if (!notificationShown && (location.state?.login || login || location.state?.signedUp)) {
      setNotificationShown(true);
      toast.success(location.state?.login || login ? "تم تسجيل الدخول بنجاح": "تم إنشاء الحساب بنجاح",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          icon: (
            <i className="fa-solid fa-circle-check text-white text-[20px]"></i>
          ),
          style: {
            backgroundColor: "#28a745",
            color: "#fff",
          },
          progressStyle: {
            background: "#fff",
          },
        }
      );
      navigate(`${redirectPath}`, { replace: true, state: {} });
      setTimeout(() => {
        sessionStorage.removeItem("redirectAfterLogin");
      }, 50);
    }
  }, [location, navigate, notificationShown, redirectPath]);

  return (
    <>
      {notificationShown && (
        <ToastContainer
          closeButton={<i className="fa-solid fa-xmark text-white text-[15px]"></i>}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
      )}
    </>
  );
}
export default SignupSuccessfull;