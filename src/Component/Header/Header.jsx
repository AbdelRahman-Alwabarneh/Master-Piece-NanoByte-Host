import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [BorgarMenu, setBorgarMenu] = useState(false);
  function toggle() {
    setBorgarMenu(!BorgarMenu);
  }
  return (
    <>
      <nav className=" bg-navbar-color dark:bg-gray-900 inline-block	 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <button
            onClick={toggle}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[870px]:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
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
          </button>
          <Link
            to="/SingUp"
            className="max-[870px]:hidden font-bold font-cairo text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            التسجيل
          </Link>

          <div className="flex min-[870px]:order-2 space-x-3 min-[870px]:space-x-0 rtl:space-x-reverse">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="font-cairo self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                نانوبايت هوست
              </span>
              <img
                className="h-14"
                src="https://cdn.discordapp.com/attachments/993570904544124972/1262514447046672516/logolit-removebg-preview.png?ex=6696dfb4&is=66958e34&hm=66320acf9e7d8b5ed952d8c5d54f8fe97a98c5e4746c83a257084a3ee178b087&"
                alt="sdsad"
              />
            </Link>
          </div>
          <div
            className={`items-center justify-between ${
              BorgarMenu ? "flex" : "hidden"
            } w-full min-[870px]:flex min-[870px]:w-auto min-[870px]:order-1`}
            id="navbar-sticky"
          >
            <ul className="w-full text-center flex flex-col p-4 min-[870px]:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 min-[870px]:space-x-8 rtl:space-x-reverse min-[870px]:flex-row min-[870px]:mt-0 min-[870px]:border-0 min-[870px]:bg-navbar-color bg-[#1b4ab2] min-[870px]:dark:bg-gray-900 border-[#3955c7]">
              <li>
                <Link
                  to="/AboutNanobyte"
                  className="font-bold font-cairo block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[870px]:hover:bg-transparent min-[870px]:hover:text-[#d8fdff] min-[870px]:p-0 min-[870px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-[#1E38A3] dark:hover:text-white min-[870px]:dark:hover:bg-transparent dark:border-gray-700"
                >
                  عن نانوبايت
                </Link>
              </li>
              <li>
                <Link
                  to="/SupportNanobyte"
                  className="font-bold font-cairo block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[870px]:hover:bg-transparent min-[870px]:hover:text-[#d8fdff] min-[870px]:p-0 min-[870px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-[#1E38A3] dark:hover:text-white min-[870px]:dark:hover:bg-transparent dark:border-gray-700"
                >
                  الدعم الفني
                </Link>
              </li>
              <li>
                <Link
                  to="/Domain"
                  className="font-bold font-cairo block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[870px]:hover:bg-transparent min-[870px]:hover:text-[#d8fdff] min-[870px]:p-0 min-[870px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-[#1E38A3] dark:hover:text-white min-[870px]:dark:hover:bg-transparent dark:border-gray-700"
                >
                  النطاقات
                </Link>
              </li>
              <li>
                <Link
                  to="/Services"
                  className="font-bold font-cairo block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[870px]:hover:bg-transparent min-[870px]:hover:text-[#d8fdff] min-[870px]:p-0 min-[870px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-[#1E38A3] dark:hover:text-white min-[870px]:dark:hover:bg-transparent dark:border-gray-700"
                >
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-bold font-cairo block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[870px]:hover:bg-transparent min-[870px]:hover:text-[#d8fdff] min-[870px]:p-0 min-[870px]:dark:hover:text-blue-500 dark:text-white dark:hover:bg-[#1E38A3] dark:hover:text-white min-[870px]:dark:hover:bg-transparent dark:border-gray-700"
                >
                  الرئيسية
                </Link>
              </li>
              <Link
                to="/SingUp"
                className="min-[870px]:hidden font-bold font-cairo text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                التسجيل
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
