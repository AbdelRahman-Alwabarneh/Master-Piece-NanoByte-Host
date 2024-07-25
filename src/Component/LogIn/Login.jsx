import dedicated_server_logIn from "../Photo/dedicated_server_logIn.png";
import logolit_removebg_preview from "../Photo/logolit-removebg-preview.png";
import { Link } from "react-router-dom";



function LogIn() {
  
  return (
    <>
          <title>تسجيل الدخول - NanoByte</title>
        <div className="flex flex-col min-[1050px]:flex-row min-[1050px]:justify-between items-center min-h-screen bg-gradient-to-r from-[#1a318c] to-[#161e41] font-cairo text-right overflow-hidden">
  {/* النموذج */}
  <div className="min-[1050px]:w-1/2 flex justify-center items-center w-full h-full p-4 min-[1050px]:p-0">
    <div
      id="SingUp_div"
      className="flex flex-col justify-center w-full min-[1050px]:w-[446px] min-[1050px]:pt-[40px] bg-[#182867] rounded-[15px] shadow-[0px_4px_101.6px_46px_#192b77] text-white p-4 min-[1050px]:p-6 overflow-hidden max-w-full h-full"
    >
      <h1 className="text-[2.3rem] mb-[25px] text-center font-bold text-2xl">
      تسجيل الدخول
      </h1>
      <div className="flex justify-center">
        <form
          action=""
          id="Form_SingUp"
          className="flex flex-col w-full text-[0.9375rem] font-semibold"
        >
         
          
          <label htmlFor="Email" className="mt-5">
            البريد الألكتروني
          </label>
          <input
            type="email"
            name="Email"
            id="Email"
            placeholder="ادخل بريدك الألكتروني"
            className="text-right bg-transparent border-b-2 border-white outline-none text-white mt-1 placeholder-white placeholder-opacity-65"
          />
          <label htmlFor="Password" className="mt-11">
            كلمة المرور
          </label>
          <input
            type="password"
            name="Password"
            id="Password"
            placeholder="ادخل كلمة المرور"
            className="text-right bg-transparent border-b-2 border-white outline-none text-white mt-1 placeholder-white placeholder-opacity-65"
          />
          {/* <!-- نسيت كلمة المرور --> */}
          <a href="#" id="Forgot_Password" className="mt-5 mb-4 no-underline text-white">
          هل نسيت كلمة المرور ؟
        </a>

          <div className="flex items-center mb-5 justify-end">
            <label htmlFor="Remember_me" className="mr-2">
              تذكرني
            </label>
            <input
              type="checkbox"
              name="Remember_me"
              id="Remember_me"
              className="transform scale-125 text-xl"
            />
          </div>
          <input
            type="submit"
            value="دخــــول"
            id="Registration"
            className="px-[0] py-[5px] text-[black] text-center text-[1.5rem] font-bold rounded-[10px] bg-[white]"
          />
        </form>
      </div>
      <div className="mt-10 text-center relative">
        <p className="relative inline-flex items-center justify-center w-full">
          <span className="relative pb-[6px] z-10 bg-[#182867] px-2 text-white">
            تسجيل الدخول السريع
          </span>
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t-2 border-white" />
          </span>
        </p>
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
        <div className="text-center text-[0.9375rem] font-bold mt-2 pt-4 border-t-2 border-white">
          ليس لديك حساب حتى الآن ؟{" "}
          <Link to="/singup" className="no-underline text-white">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* القسم الترحيبي */}
  <div className="min-[1050px]:h-screen min-[1050px]:bg-gradient-to-b min-[1050px]:from-[#182764] min-[1050px]:to-[#1a318c] min-[1050px]:rounded-[10px] min-[1050px]:rounded-bl-[55px] hidden min-[1050px]:flex min-[1050px]:flex-col min-[1050px]:justify-between min-[1050px]:items-end p-8">
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
      !أهلاً وسهلاً بك من جديد<br/> .نحن هنا لمساعدتك
       
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
