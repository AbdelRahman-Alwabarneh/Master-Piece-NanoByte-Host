import { Link } from "react-router-dom";
import BorgarMenuButton from "./BorgarMenuButton";
function LoginButton({ BorgarMenu, setBorgarMenu }) {
  return (
    <>
      <div className="flex">
        <BorgarMenuButton
          BorgarMenu={BorgarMenu}
          setBorgarMenu={setBorgarMenu}
        />
        <div>
          <div className="relative group max-[870px]:hidden font-cairo">
            <div className="relative w-24 h-11 overflow-hidden rounded-lg bg-nano-primary-100 z-10">
              {/* Animated gradient overlay */}
              <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transition-all duration-1000 h-full w-44 bg-gradient-to-r from-nano-primary-300 to-white/5 opacity-30 -skew-x-12"></div>

              {/* Button container */}
              <Link
                to="/SignUp"
                className="absolute flex items-center justify-center text-nano-text-100 z-[1] rounded-lg inset-[2px] bg-nano-primary-100"
              >
                <button
                  name="text"
                  className="input font-bold text-sm h-full w-full px-4 py-2 rounded-lg bg-nano-primary-200 hover:bg-nano-primary-300 transition-colors duration-300"
                >
                  التسجيل
                </button>
              </Link>

              {/* Glowing effect */}
              <div className="absolute duration-1500 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-nano-primary-200 to-nano-primary-600 blur-[30px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginButton;
