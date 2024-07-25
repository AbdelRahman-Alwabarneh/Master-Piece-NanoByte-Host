import dedicated_server_SingUp from "../Photo/dedicated_server_logIn.png";
import logolit_removebg_preview from "../Photo/logolit-removebg-preview.png";
import { Link } from "react-router-dom";
import "./SingUp.css";

function SingUp() {
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
        <h1 className="text-[2.3rem] mb-[25px] text-center font-bold text-2xl">
          إنشاء حساب
        </h1>
        <div className="flex justify-center">
          <form
            action=""
            id="Form_SingUp"
            className="flex flex-col w-full text-[0.9375rem] font-semibold"
          >
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
            <label htmlFor="Password" className="mt-5">
              كلمة المرور
            </label>
            <input
              type="password"
              name="Password"
              id="Password"
              placeholder="ادخل كلمة المرور"
              className="text-right bg-transparent mb-[20px] border-b-2 border-white outline-none text-white mt-1 placeholder-white placeholder-opacity-65"
            />
            <div className="[list-style:none] text-[red]">
            
              <li className=""> اكثر من 8 احرف</li>
              <li className="">حرف كبير على الأقل</li>
              <li className="">رقم على الأقل</li>
              <li className="mb-3">  @ $ ! % * ? & : واحدة على الأقل</li>
          
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
          هل لديك حساب ؟ {" "}
            <Link to="/login" className="no-underline text-white">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>

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
