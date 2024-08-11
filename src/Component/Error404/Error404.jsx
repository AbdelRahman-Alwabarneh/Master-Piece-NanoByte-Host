import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <>
        <title>Page Not Found - NanoByte</title>
    <Header />
      <div className="flex flex-col h-screen justify-center items-center bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)]">
        <div className="flex flex-col items-center">
          <h1 className="text-[180px] font-bold font-cairo fw text-[white]">404</h1>
          <p className="text-[30px] font-bold  font-cairo mb-6 text-[white]">الصفحة غير موجودة</p>
          <p className="text-lg font-[600] font-cairo text-[white] mb-7 text-center">يمكنك الذهاب للصفحة الرئيسية واستكشاف الصفحات والخدمات المتنوعة لدينا</p>
          <Link
            to="/"
            className="px-4 py-2 font-cairo font-medium text-white bg-[#3B82F6] rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out"
          >
          الصفحة الرئيسية
          </Link>
        </div>
      </div>
      <Footer />

    </>
  );
}
export default Error404;
