import React from "react";

function BorgarMenuButton({ BorgarMenu, setBorgarMenu }) {
  function toggle() {
    setBorgarMenu(!BorgarMenu);
  }

  return (
    <div
      onClick={toggle}
      className="inline-flex items-center ml-1 p-2  w-10 h-10 justify-center text-sm rounded-lg min-[870px]:hidden focus:outline-none focus:ring-2 text-gray-400 bg-gray-700 focus:ring-gray-600"
    >
      <div className="relative w-6 h-6 ">
        {/* أيقونة البرجر */}
        <svg
          className={`absolute w-6 h-6 transition-all duration-300 ease-in-out transform ${
            BorgarMenu ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>

        {/* أيقونة X */}
        <svg
          className={`absolute w-6 h-6 transition-all duration-300 ease-in-out transform ${
            BorgarMenu
              ? "opacity-100 rotate-60 scale-100"
              : "opacity-0 rotate-0 scale-90"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}

export default BorgarMenuButton;
