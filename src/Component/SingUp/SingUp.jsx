import dedicated_server_SingUp from "../Photo/dedicated_server_logIn.png";
import logolit_removebg_preview from "../Photo/logolit-removebg-preview.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function SingUp() {
  const [FirstName, setFirstName] = useState("");

  const [ValidationEmail, setValidationEmail] = useState("");
  const [EmailMessage, setEmailMessage] = useState("hidden");

  useEffect(() => {
    const Email_Message = /^(?![^\s@]+@[^\s@]+\.[^\s@]+$).+/.test(
      ValidationEmail
    );
    if (Email_Message) {
      setEmailMessage("block");
    } else {
      setEmailMessage("hidden");
    }
  }, [ValidationEmail]);
  // تحقق الباسورد \\
  const [ValidationPassword, setValidationPassword] = useState("");
  const [ShowAndHide, setShowAndHide] = useState("hidden");
  const [NoArabic, setNoArabic] = useState("hidden");
  const [EightLettersColor, setEightLettersColor] = useState("text-[red]");
  const [CapitalLetterColor, setCapitalLetterColor] = useState("text-[red]");
  const [NoAtleastColor, setNoAtleastColor] = useState("text-[red]");
  const [SpecialCharactersColor, setSpecialCharacters] = useState("text-[red]");
  const NoArabicPassword = /[\u0600-\u06FF]/.test(ValidationPassword);
  const EightLetters = /[A-Za-z\d\W]{8,}/.test(ValidationPassword);
  const CapitalLetter = /[A-Z]/.test(ValidationPassword);
  const NoAtleast = /\d/.test(ValidationPassword);
  const SpecialCharacters = /(?=.*[^\w\s])/.test(ValidationPassword);
  useEffect(() => {
    const ShowAndHide = ValidationPassword;
 
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
    if (ShowAndHide) {
      setShowAndHide("block");
    }
    if (NoArabicPassword) {
      setNoArabic("flex");
    } else {
      setNoArabic("hidden");
    }
  }, [ValidationPassword]);

  const [ShowPassword, setShowPassword] = useState(false);
  function ShowThPassword() {
    setShowPassword(!ShowPassword);
  }
  // نهاية تحقق الباسورد \\
  const [VerificationSendPassword, setVerificationSendPassword] =
    useState("hidden");

  const SubmitPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[\W])(?=.*\S)(?!.*\s{2,})[A-Za-z\d\W_]{8,}$/.test(
      ValidationPassword
    );

  function sub() {
    if (ValidationPassword === "" || !SubmitPassword) {
      setVerificationSendPassword("flex");
    } else {
      setVerificationSendPassword("hidden");
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
              className={`${NoArabic} font-bold mb-1 [direction:rtl] items-center p-4  text-sm text-[#fff] border border-[#a0731e] rounded-lg bg-red-50 dark:bg-[#bc8622] dark:text-red-400 dark:border-red-800`}
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
                className="flex-shrink-0 inline w-4 h-4 me-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <div className={`${VerificationSendPassword}`}>
                يرجى إدخال كلمة المرور وفقًا للمتطلبات المحددة
              </div>
            </div>

            {/* بداية الفورم */}
            <h1 className=" text-[2.3rem] mb-[25px] mt-4 text-center font-bold text-2xl">
              إنشاء حساب
            </h1>
            <div className="flex justify-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  NoArabicPassword ? null : sub();
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
                  type="text"
                  name="First_Name"
                  id="First_Name"
                  placeholder="ادخل اسمك الأول"
                  className="text-right bg-transparent border-b-2 border-white outline-none text-white mt-1 placeholder-white placeholder-opacity-65"
                />
                {/* الأسم الأخير */}
                <label htmlFor="Last_Name" className="mt-5">
                  الأسم الأخير
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="ادخل اسمك الأخير"
                  className="text-right bg-transparent border-b-2 border-white outline-none text-white mt-1 placeholder-white placeholder-opacity-65"
                />
                {/* البريد الألكتروني */}
                <label htmlFor="Email" className="mt-5">
                  البريد الألكتروني
                </label>
                <input
                  onChange={(e) => setValidationEmail(e.target.value)}
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="ادخل بريدك الألكتروني"
                  className="text-right bg-transparent border-b-2 border-white outline-none text-white mt-1 placeholder-white placeholder-opacity-65"
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
                    className="text-right bg-transparent mb-[20px] border-b-2 border-white outline-none text-white mt-1 placeholder-white placeholder-opacity-65 flex-grow pl-10"
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
                  className="px-[0] py-[5px] text-[black] text-center text-[1.5rem] font-bold rounded-[10px] bg-[white]"
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
                هل لديك حساب ؟{" "}
                <Link to="/login" className="no-underline text-white">
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