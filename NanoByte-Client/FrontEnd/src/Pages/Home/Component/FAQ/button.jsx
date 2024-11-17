import { useRef } from "react";
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
function Button() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <Link to="/ExplanationsLibrary"
      ref={ref}
      className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <button className="font-bold text-lg bg-[#1E3A8A] text-white border border-blue-800 border-b-4 overflow-hidden relative px-6 py-3 rounded-md hover:bg-blue-700 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
        <span className="bg-blue-800 shadow-blue-800 absolute -top-[150%] left-0 inline-flex w-96 h-[8px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_12px_12px_rgba(0,0,0,0.3)]"></span>
        اطلع على مكتبة الشروحات
      </button>
    </Link>
  );
}

export default Button;
