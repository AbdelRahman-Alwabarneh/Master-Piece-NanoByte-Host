import dedicated_server_logIn from "../../Assets/Photo/dedicated_server_logIn.png";
import logolit_removebg_preview from "../../Assets/Photo/logolit-removebg-preview.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LogIn() {
  const [ValidationEmail, setValidationEmail] = useState("");
  const [ValidationPassword, setValidationPassword] = useState("");
  const [ValidationEmailShowAndHide, setValidationEmailShowAndHide] =
    useState("hidden");
  const [ValidationPasswordShowAndHide, setValidationPasswordShowAndHide] =
    useState("hidden");

  const [rememberMe, setRememberMe] = useState(false);

  // دالة لتحديث الحالة عند تغيير الشيك بوكس
  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const [error, setError] = useState("");
  const [AlertError, setAlertError] = useState("hidden");

  const [ShowPassword, setShowPassword] = useState(false);
  function ShowThPassword() {
    setShowPassword(!ShowPassword);
  }
  const Email_Message = /^(?![^\s@]+@[^\s@]+\.[^\s@]+$).+/.test(
    ValidationEmail
  );
  useEffect(() => {
    if (Email_Message) {
      setValidationEmailShowAndHide("block");
    } else {
      setValidationEmailShowAndHide("hidden");
    }
  }, [ValidationEmail]);
  const navigate = useNavigate();

  async function submitLogin() {
    if (ValidationEmail === "" || Email_Message) {
      setValidationEmailShowAndHide("block");
      return;
    } else {
      setValidationEmailShowAndHide("hidden");
    }
    if (ValidationPassword === "") {
      setValidationPasswordShowAndHide("block");
      return;
    } else {
      setValidationPasswordShowAndHide("hidden");
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_LOG_IN,
        {
          Email: ValidationEmail,
          Password: ValidationPassword,
          rememberMe,
        },
        { withCredentials: true }
      );
      navigate("/", { state: { login: true } }); // الانتقال لصفحة أخرى عند التسجيل الناجح
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setAlertError("flex");
          setError(error.response.data.message || "حدث خطأ في البيانات"); // تعيين رسالة الخطأ
        } else {
          setError(error.response.data.message || "حدث خطأ غير متوقع.");
        }
      } else {
        setError("حدث خطأ غير متوقع.");
      }
    }
  }
  return (
    <>
      <title>تسجيل الدخول - NanoByte</title>
      <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:justify-between items-center min-h-screen bg-gradient-to-r from-[#1a318c] to-[#161e41] font-cairo text-right ">
        {/* النموذج */}

        <div className="mt-5 mb-5 min-[1050px]:w-1/2 flex justify-center items-center w-full h-full p-4 min-[1050px]:p-0">
          <div
            id="SingUp_div"
            className="flex flex-col justify-center w-full min-[1050px]:w-[446px] min-[1050px]:h-[61.0%] bg-[#182867] rounded-[15px] shadow-[0px_4px_101.6px_46px_#192b77] text-white p-4 min-[1050px]:p-6  max-w-full h-full"
          >
            <div
              className={`${AlertError} mb-1 font-bold [direction:rtl] items-center p-4  text-sm text-[#fff] border border-[#6c1818] rounded-lg bg-red-50 dark:bg-[#6c1e1e] dark:text-red-400 dark:border-red-800`}
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <div className={`${AlertError} text-white`}>{error}</div>
            </div>
            {/* بداية الفورم */}
            <h1 className=" text-[2.3rem] mb-[25px] mt-4 text-center font-bold text-2xl">
              تسجيل الدخول
            </h1>
            <div className="flex justify-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitLogin();
                }}
                action=""
                id="Form_SingUp"
                className="flex flex-col w-full text-[0.9375rem] font-semibold"
              >
                {/* البريد الإلكتروني */}
                <label htmlFor="Email" className="mt-5">
                  البريد الإلكتروني
                </label>
                <input
                  onChange={(e) => setValidationEmail(e.target.value)}
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="ادخل بريدك الإلكتروني"
                  className="text-right bg-transparent border-b-2 border-white focus:border-blue-200 outline-none text-white mt-1 placeholder-white placeholder-opacity-65"
                />
                <div
                  className={`${ValidationEmailShowAndHide} mt-2 text-[red]`}
                >
                  الرجاء إدخال البريد الإلكتروني
                </div>

                {/* كلمة المرور */}
                <label htmlFor="Password" className="mt-8">
                  كلمة المرور
                </label>
                <div className="relative flex items-center">
                  <button
                    type="button"
                    className="absolute mb-[20px] ml-[-12px] inset-y-0 left-0 flex items-center pl-3 text-white"
                    onClick={ShowThPassword}
                  >
                    {ShowPassword ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </button>
                  <input
                    value={ValidationPassword}
                    onChange={(e) => setValidationPassword(e.target.value)}
                    type={ShowPassword ? "text" : "password"}
                    name="Password"
                    id="Password"
                    placeholder="ادخل كلمة المرور"
                    className="text-right bg-transparent border-b-2 border-white focus:border-blue-200 outline-none text-white mt-1 placeholder-white placeholder-opacity-65 flex-grow pl-10"
                  />
                </div>
                <div
                  className={`${ValidationPasswordShowAndHide} mt-2 text-[red]`}
                >
                  الرجاء إدخال كلمة المرور
                </div>
                {/* <!-- نسيت كلمة المرور --> */}
                <a
                  href="#"
                  id="Forgot_Password"
                  className="mt-4 mb-2 no-underline text-white hover:text-blue-300"
                >
                  هل نسيت كلمة المرور ؟
                </a>

                <div className="flex items-center mb-5 justify-end hover:text-blue-100">
                  <label htmlFor="Remember_me" className="mr-2 cursor-pointer ">
                    تذكرني
                  </label>
                  <input
                    type="checkbox"
                    name="Remember_me"
                    id="Remember_me"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                    className="transform scale-125 text-xl cursor-pointer"
                  />
                </div>
                {/* زر الدخول */}
                <input
                  type="submit"
                  value="دخــــول"
                  id="Registration"
                  className="px-[0] cursor-pointer py-[5px] text-[black] text-center text-[1.5rem] font-bold rounded-[10px] bg-[white] hover:bg-gray-300"
                />
              </form>
            </div>

            <div className="mt-7 text-center relative">
              {/* تسجيل الدخول السريع */}
              <p className="relative inline-flex items-center justify-center w-full">
                <span className="relative pb-[6px] z-10 bg-[#182867] px-2 text-white">
                  تسجيل الدخول السريع
                </span>
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full border-t-2 border-white" />
                </span>
              </p>
              {/* ايكون تسجيل الدخول السريع */}
              <div className="flex justify-center text-2xl mt-3 mb-5 space-x-6">
                <a href="#" className="text-[2.4rem] no-underline text-white">
                  <i className="fa-brands fa-google"></i>
                </a>
                <a href="#" className="text-[2.4rem] no-underline text-white">
                  <i className="fa-brands fa-square-facebook"></i>
                </a>
                <a href="#" className="text-[2.4rem] no-underline text-white">
                  <i className="fa-brands fa-discord"></i>
                </a>
              </div>
              {/* هل لديك حساب */}
              <div className="text-center text-[0.9375rem] font-bold mt-2 pt-4 border-t-2 border-white">
                ليس لديك حساب حتى الآن ؟{" "}
                <Link
                  to="/SignUp"
                  className="no-underline text-white hover:text-blue-300"
                >
                  إنشاء حساب جديد
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ترحيب على اليمين */}
        <div className="h-[100vh] min-[1050px]:bg-gradient-to-b min-[1050px]:from-[#182764] min-[1050px]:to-[#1a318c] min-[1050px]:rounded-[10px] min-[1050px]:rounded-bl-[55px] hidden min-[1050px]:flex min-[1050px]:flex-col min-[1050px]:justify-center min-[1050px]:items-end p-8">
          <div className="flex justify-end min-[1050px]:mb-12">
            <Link
              to="/"
              className="text-white text-2xl font-bold mt-[27px] mr-3"
            >
              نانوبايت هوست
            </Link>
            <Link to="/">
              <img
                className="w-[80px] h-[80px] mt-2"
                src={logolit_removebg_preview}
                alt="Logo NanoByte"
              />
            </Link>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-white text-3xl font-bold mb-4">
              !أهلاً وسهلاً بك من جديد
              <br /> .نحن هنا لمساعدتك
            </p>
            <img
              className="w-full max-w-[400px] h-auto"
              src={dedicated_server_logIn}
              alt="dedicated server SingUp"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
