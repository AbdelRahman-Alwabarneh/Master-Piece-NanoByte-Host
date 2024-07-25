import Header from "../Header/Header";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <>
        <title>Page Not Found - NanoByte</title>
    <Header />
      <div class="flex flex-col h-screen justify-center items-center bg-gray-100">
        <div class="flex flex-col items-center">
          <h1 class="text-[250px] font-bold font-cairo fw text-gray-700">404</h1>
          <p class="text-[30px] font-bold  font-cairo text-gray-600 mb-6">Page Not Found</p>
          <Link
            to="/"
            class="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
export default Error404;
