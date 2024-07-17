import dedicated_server_logIn from "../Photo/dedicated_server_logIn.png";
import logolit_removebg_preview from "../Photo/logolit-removebg-preview.png";
import "./Login.css";
function LogIn() {
  return (
    <>
      <div className="co2ntainer">
        <div className=""></div>
        <div id="LogIn_div">
          <h1 className="LogIn_title_h1">تسجيل الدخول</h1>
          <div className="Form_LogIn_div">
            <form action="" id="Form_LogIn">
              {/* <!-- الأيميل --> */}
              <label htmlFor="Email" className="Email">
                البريد الألكتروني
              </label>
              <input
                type="email"
                name="Email"
                id="Email"
                placeholder="ادخل بريدك الألكتروني"
              />
              {/* <!-- الباسورد --> */}
              <label htmlFor="Password" className="Password">
                كلمة المرور
              </label>
              <input
                type="password"
                name="Password"
                id="Password"
                placeholder="ادخل كلمة المرور"
              />
              {/* <!-- نسيت كلمة المرور --> */}
              <a href="#" id="Forgot_Password">
                هل نسيت كلمة المرور ؟
              </a>
              {/* <!-- تذكرني --> */}
              <div className="Remember_me_div">
                <label htmlFor="Remember_me" className="Remember_me">
                  تذكرني
                </label>
                <input type="checkbox" name="Remember_me" id="Remember_me" />
              </div>
              {/* <!-- تسجيل --> */}
              <input type="submit" value="دخــــول" id="Registration" />
            </form>
          </div>
          <div className="Quick_entry_div">
            <p className="Quick_entry_paragraph">
              <span>تسجيل الدخول السريع</span>
            </p>
            <div className="icon_Login_div">
              <a href="#">
                <i className="google fa-brands fa-google"></i>
              </a>
              <a href="#">
                <i className="facebook fa-brands fa-square-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-discord"></i>
              </a>
            </div>
            <div className="new_account">
              ليس لديك حساب حتى الآن ؟ <a href="">إنشاء حساب جديد</a>
            </div>
          </div>
        </div>
        <div className="Welcome_Login">
          <div className="Logo_Login">
            <p className="paragraph_logo">نانوبايت هوست</p>
            <a href="#">
              <img
                className="Logo_NanoByte"
                src={logolit_removebg_preview}
                alt="Logo NanoByte"
              />
            </a>
          </div>
          <div className="Welcome_dedicated_logIn">
            <p className="Welcome_Login_paragraph">أهلاً وسهلاً بك من جديد</p>
            <img
              className="Welcome_Login_Img_dedicated"
              src={dedicated_server_logIn}
              alt="dedicated server logIn"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
