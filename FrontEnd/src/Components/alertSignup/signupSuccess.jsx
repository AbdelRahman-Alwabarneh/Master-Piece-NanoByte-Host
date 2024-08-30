import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupSuccessfull() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // التحقق من وجود رسالة النجاح في الحالة
    if (location.state?.signedUp) {
      toast.success("تم إنشاء الحساب بنجاح", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce, // استخدام الترانزيشن بالشكل الصحيح
        icon: (
          <i className="fa-solid fa-circle-check text-white  text-[20px]"></i>
        ), // أيقونة صح باللون الأبيض
        style: {
          backgroundColor: "#28a745", // اللون الأخضر للخلفية
          color: "#fff", // اللون الأبيض للنص
        },
        progressStyle: {
          background: "#fff", // شريط التقدم باللون الأبيض
        },
      });
      navigate("/", { replace: true, state: {} });
    }
  }, [location, navigate]);
  return (
    <>
      <ToastContainer
        closeButton={
          // تخصيص الأكس باللون الأبيض
          <i className="fa-solid fa-xmark text-white text-[15px]"></i>
        }
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // تعديل القيمة لتكون true لأن القيمة الافتراضية هي false
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce} // تعديل خاصية الترانزيشن بشكل صحيح
      />
    </>
  );
}

export default SignupSuccessfull;
