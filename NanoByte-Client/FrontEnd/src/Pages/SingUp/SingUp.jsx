import dedicated_server_SingUp from "../../Assets/Photo/dedicated_server_logIn.png";
import logolit_removebg_preview from "../../Assets/Photo/Logo_NanoByte.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "../../Components/Login&Sginup/Button/GoogleLoginButton";
import DiscordLoginButton from "../../Components/Login&Sginup/Button/DiscordLoginButton";
import GithubLoginButton from "../../Components/Login&Sginup/Button/GithubLoginButton";
function SingUp() {
  // تعريف الحالة للأسماء
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [FirstNameShowAndHide, setFirstNameShowAndHide] = useState("hidden");
  const [LastNameShowAndHide, setLastNameShowAndHide] = useState("hidden");

  // تحقق البريد الإلكتروني
  const [ValidationEmail, setValidationEmail] = useState("");
  const [EmailMessage, setEmailMessage] = useState("hidden");
  const [error, setError] = useState("");
  const [AlertError, setAlertError] = useState("hidden");

  const Email_Message = /^(?![^\s@]+@[^\s@]+\.[^\s@]+$).+/.test(
    ValidationEmail
  );
  useEffect(() => {
    if (Email_Message) {
      setEmailMessage("block");
    } else {
      setEmailMessage("hidden");
    }
  }, [ValidationEmail]);

  // تحقق الباسورد
  const [ValidationPassword, setValidationPassword] = useState("");
  const [ShowAndHide, setShowAndHide] = useState("hidden");
  const [NoArabic, setNoArabic] = useState("hidden");

  // ألوان تحقق الباسورد
  const [EightLettersColor, setEightLettersColor] = useState("text-[red]");
  const [CapitalLetterColor, setCapitalLetterColor] = useState("text-[red]");
  const [NoAtleastColor, setNoAtleastColor] = useState("text-[red]");
  const [SpecialCharactersColor, setSpecialCharacters] = useState("text-[red]");

  // شروط تحقق الباسورد
  const NoArabicPassword = /[\u0600-\u06FF]/.test(ValidationPassword);
  const EightLetters = /[A-Za-z\d\W]{8,}/.test(ValidationPassword);
  const CapitalLetter = /[A-Z]/.test(ValidationPassword);
  const NoAtleast = /\d/.test(ValidationPassword);
  const SpecialCharacters = /(?=.*[^\w\s])/.test(ValidationPassword);
  const [VerificationSendPassword, setVerificationSendPassword] =
    useState("hidden");
  useEffect(() => {
    if (EightLetters) {
      setEightLettersColor("text-[#3fc028]");
    } else {
      setEightLettersColor("text-[red]");
    }

    if (CapitalLetter) {
      setCapitalLetterColor("text-[#3fc028]");
    } else {
      setCapitalLetterColor("text-[red]");
    }

    if (NoAtleast) {
      setNoAtleastColor("text-[#3fc028]");
    } else {
      setNoAtleastColor("text-[red]");
    }

    if (SpecialCharacters) {
      setSpecialCharacters("text-[#3fc028]");
    } else {
      setSpecialCharacters("text-[red]");
    }

    if (ValidationPassword) {
      setShowAndHide("block");
    }

    if (NoArabicPassword) {
      setNoArabic("flex");
      setAlertError("hidden");
      setVerificationSendPassword("hidden");
    } else {
      setNoArabic("hidden");
    }
  }, [ValidationPassword]);

  // حالة إظهار وإخفاء الباسورد
  const [ShowPassword, setShowPassword] = useState(false);
  function ShowThPassword() {
    setShowPassword(!ShowPassword);
  }

  // تحقق إرسال الباسورد
  const SubmitPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[\W])(?=.*\S)(?!.*\s{2,})[A-Za-z\d\W_]{8,}$/.test(
      ValidationPassword
    );

  // التحقق من البيانات وإرسالها
  const navigate = useNavigate();

  async function submitSignUp() {
    if (FirstName === "") {
      setFirstNameShowAndHide("block");
      return;
    } else {
      setFirstNameShowAndHide("hidden");
    }

    if (LastName === "") {
      setLastNameShowAndHide("block");
      return;
    } else {
      setLastNameShowAndHide("hidden");
    }

    if (ValidationEmail === "" || Email_Message) {
      setEmailMessage("block");
      return;
    }

    if (ValidationPassword === "" || !SubmitPassword) {
      setVerificationSendPassword("flex");
      setAlertError("hidden");
      return;
    } else {
      setVerificationSendPassword("hidden");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          First_Name: FirstName,
          Last_Name: LastName,
          Email: ValidationEmail,
          Password: ValidationPassword,
        },
        { withCredentials: true }
      );
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin"); 
      
      navigate(redirectPath, { state: { login: true } }); // الانتقال لصفحة أخرى عند التسجيل الناجح
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAlertError("flex");
        setError(error.response.data.message); // تعيين رسالة الخطأ
      } else {
        setError("حدث خطأ غير متوقع.");
      }
    }
  }

  return (
    <>
      <title>إنشاء حساب - NanoByte</title>

      <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:justify-between items-center min-h-screen bg-gradient-to-r from-[#1a318c] to-[#161e41] font-cairo text-right ">
        {/* النموذج */}

        <div className="mt-5 mb-5 min-[1050px]:w-1/2 flex justify-center items-center w-full h-full p-4 min-[1050px]:p-0">
          <div
            id="SingUp_div"
            className="flex flex-col justify-center w-full min-[1050px]:w-[446px] min-[1050px]:h-[61.0%] bg-[#182867] rounded-[15px] shadow-[0px_4px_101.6px_46px_#192b77] text-white p-4 min-[1050px]:p-6  max-w-full h-full"
          >
            {/* رسالة طلب كلمة المرور في العربي */}

            <div
              className={`${NoArabic} font-bold mb-1 [direction:rtl] items-center p-4  text-sm text-[#fff] border border-[#a0731e] rounded-lg bg-red-50 dark:bg-[#bc8622]`}
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <div className={`${NoArabic}`}>
                الرجاء كتابة كلمة المرور باستخدام الأحرف الإنجليزية
              </div>
            </div>
            {/* رسالة طلب كلمة المرور وفقًا للمتطلبات  المحددة*/}

            <div
              className={`${VerificationSendPassword} mb-1 font-bold [direction:rtl] items-center p-4  text-sm text-[#fff] border border-[#6c1818] rounded-lg bg-red-50 dark:bg-[#6c1e1e] dark:text-red-400 dark:border-red-800`}
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <div className={`${VerificationSendPassword} text-white`}>
                يرجى إدخال كلمة المرور وفقًا للمتطلبات المحددة
              </div>
            </div>
            {/* رسالة طلب كلمة المرور وفقًا للمتطلبات  المحددة*/}

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
              إنشاء حساب
            </h1>
            <div className="flex justify-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  NoArabicPassword ? null : submitSignUp();
                }}
                action=""
                id="Form_SingUp"
                className="flex flex-col w-full text-[0.9375rem] font-semibold"
              >
                {/* الأسم الأول */}
                <label htmlFor="First_Name" className="mt-5">
                  الأسم الأول
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  name="First_Name"
                  id="First_Name"
                  placeholder="ادخل اسمك الأول"
                  className="text-right bg-transparent border-b-2 border-white focus:border-blue-200 outline-none text-white mt-1 placeholder-white placeholder-opacity-65"
                />
                <div className={`${FirstNameShowAndHide} mt-2 text-[red]`}>
                  الرجاء إدخال الاسم الأول
                </div>
                {/* الأسم الأخير */}
                <label htmlFor="Last_Name" className="mt-5">
                  الأسم الأخير
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  name=""
                  id=""
                  placeholder="ادخل اسمك الأخير"
                  className="text-right bg-transparent border-b-2 border-white focus:border-blue-200 outline-none text-white mt-1 placeholder-white placeholder-opacity-65"
                />
                <div className={`${LastNameShowAndHide} mt-2 text-[red]`}>
                  الرجاء إدخال الاسم الأخير
                </div>

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
                <p className={`${EmailMessage} mt-4 text-[#ff4646]`}>
                  {" "}
                  test@gmail.com : ادخل بريد الكتروني صحيح على سبيل المثال
                </p>
                {/* كلمة المرور */}
                <label htmlFor="Password" className="mt-5">
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
                    className="text-right bg-transparent mb-[20px] border-b-2 border-white focus:border-blue-200 outline-none text-white mt-1 placeholder-white placeholder-opacity-65 flex-grow pl-10"
                  />
                </div>
                {/* تحقق كلمة المرور */}
                <div className={`[list-style:none] mb-2 ${ShowAndHide}`}>
                  <p className={EightLettersColor}> اكثر من 8 احرف</p>
                  <li className={CapitalLetterColor}>حرف كبير على الأقل</li>
                  <li className={NoAtleastColor}>رقم على الأقل</li>
                  <li className={`mb-3 ${SpecialCharactersColor}`}>
                    {" "}
                    @ $ ! % * ? & : واحدة على الأقل
                  </li>
                </div>
                {/* زر الدخول */}
                <input
                  type="submit"
                  value="دخــــول"
                  id="Registration"
                  className="px-[0] py-[5px] cursor-pointer text-[black] text-center text-[1.5rem] font-bold rounded-[10px] bg-[white] hover:bg-gray-300"
                />
              </form>
            </div>

            <div className="mt-10 text-center relative">
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
                <GoogleLoginButton />
                <GithubLoginButton />
                <DiscordLoginButton />
              </div>
              {/* هل لديك حساب */}
              <div className="text-center text-[0.9375rem] font-bold mt-2 pt-4 border-t-2 border-white">
                هل لديك حساب ؟{" "}
                <Link
                  to="/login"
                  className="no-underline text-white hover:text-blue-300"
                >
                  تسجيل الدخول
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
              أهلاً وسهلاً بك قم بإنشاء
              <br /> حساب للوصول إلى خدماتنا
            </p>
            <img
              className="w-full max-w-[400px] h-auto"
              src={dedicated_server_SingUp}
              alt="dedicated server SingUp"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingUp;
