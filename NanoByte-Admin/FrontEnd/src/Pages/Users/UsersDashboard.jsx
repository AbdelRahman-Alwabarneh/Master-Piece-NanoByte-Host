import React, { useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Slice/usersData";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
const AllUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.UserData);

  useEffect(() => {
    if (!user || !Array.isArray(user.UsersData)) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  const handleUserClick = (userId) => {
    navigate(`/userDetails/${userId}`);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (!user || !Array.isArray(user.UsersData) || user.UsersData.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="flex min-h-screen text-white font-cairo">
      <Sidebar />

      <div className="flex-grow p-2 sm:p-4 md:p-6 md:mr-64 mr-[75px] overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          جدول المستخدمين
        </h1>
        {/* حقل البحث الاحترافي */}
        <div className="mb-5 flex justify-between items-center flex-wrap">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="ابحث عن خطة..."
              className="bg-[#1E38A3] border border-[#2f64bb] text-white py-2 px-4 pl-10 rounded-full shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#2f64bb] w-full"
            />
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>

          {/* زر إضافة خطة جديدة */}
          <Link
            to="/addVPSPlan"
            className="bg-gradient-to-r mt-3 sm:mt-0 from-[#1E38A3] to-[#2f64bb] hover:to-[#1E90FF] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-200"
          >
            + إضافة مستخدم جديد
          </Link>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="hidden md:table min-w-full bg-[#1E38A3] rounded-lg shadow-lg ">
            <thead>
              <tr className="bg-[#2f64bb] text-white">
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  المعرف
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  الاسم الأول
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  الاسم الأخير
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  البريد الإلكتروني
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  اسم الشركة
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  الخدمات
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  تاريخ الإنشاء
                </th>
              </tr>
            </thead>
            <tbody>
              {user.UsersData.map((AllUsers, index) => (
                <tr
                  key={AllUsers._id}
                  className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center"
                >
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">{index + 1}</td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer">
                    <div onClick={() => handleUserClick(AllUsers._id)}>
                      {AllUsers.firstName}
                    </div>
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer">
                    <div onClick={() => handleUserClick(AllUsers._id)}>
                      {AllUsers.lastName || "لا يوجد اسم أخير"}
                    </div>
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {AllUsers.email}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {AllUsers.companyName || "لايوجد اسم شركة"}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    لاتوجد خدمات
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {new Date(AllUsers.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* عرض البطاقات على الشاشات الصغيرة */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {user.UsersData.map((AllUsers, index) => (
            <div
              key={AllUsers._id}
              className="bg-[#1E38A3] rounded-lg shadow-lg p-3 sm:p-4"
            >
              <p className="mb-2 text-sm">
                <span className="font-bold">المعرف: </span>
                {index + 1}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">الاسم الأول: </span>
                <span onClick={() => handleUserClick(AllUsers._id)}>
                  {AllUsers.firstName}
                </span>
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">الاسم الأخير: </span>
                <span onClick={() => handleUserClick(AllUsers._id)}>
                  {AllUsers.lastName || "لا يوجد اسم أخير"}
                </span>
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">البريد الإلكتروني: </span>
                {AllUsers.email}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">اسم الشركة: </span>
                {AllUsers.companyName || "لايوجد اسم شركة"}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">الخدمات: </span>
                لاتوجد خدمات
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">تاريخ الإنشاء: </span>
                {new Date(AllUsers.createdAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
        {/* Pagination الاحترافي */}
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-1">
            <button className="bg-[#1E38A3] hover:bg-[#2f64bb] text-white py-1 px-3 rounded-md shadow-md transition duration-200 ml-1">
              السابقة
            </button>
            <button className="bg-[#1E38A3] text-white py-1 px-3 rounded-md shadow-md">
              1
            </button>
            <button className="bg-[#1E38A3] text-white py-1 px-3 rounded-md shadow-md">
              2
            </button>
            <button className="bg-[#1E38A3] text-white py-1 px-3 rounded-md shadow-md">
              3
            </button>
            <button className="bg-[#1E38A3] hover:bg-[#2f64bb] text-white py-1 px-3 rounded-md shadow-md transition duration-200">
              التالية
            </button>
          </nav>
        </div>  
      </div>
    </div>
  );
};

export default AllUsers;
