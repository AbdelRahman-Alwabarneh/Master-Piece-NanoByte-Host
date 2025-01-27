import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { useNavigate } from "react-router-dom";
import { Search, Plus, ToggleRight, ToggleLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";
import ItemsPerPageSelect from "../../Components/Pagination/ItemsPerPageSelect";
import Swal from "sweetalert2";

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchUserData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, searchTerm]);

  const fetchUserData = async (page, limit) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_ADMIN}/api/usersData?page=${page}&limit=${limit}&search=${searchTerm}`
      );
      console.log(response.data);

      setUsers(response.data.usersData);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
      setStatus("success");
    } catch (error) {
      console.error("Error fetching user data:", error);
      setStatus("error");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    fetchInvoices(1, value);
  };

  const handleUserClick = (userId) => {
    navigate(`/userDetails/${userId}`);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <NoDataFound />;
  }
  const handleisBanned = async (userId, isBanned) => {
    const actionText = isBanned ? "إلغاء الحظر" : "حظر";
    const successText = isBanned ? "تم إلغاء الحظر" : "تم الحظر";
    const confirmText = isBanned ? "هل تريد إلغاء حظر" : "هل تريد حظر";

    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: `${confirmText} المستخدم؟`,
      icon: "warning",
      iconColor: "#ffcc00",
      background: "#18296C",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#1E38A3",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
      padding: "2em",
      backdrop: "rgba(22, 30, 65, 0.8)",
      position: "center",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL_ADMIN}/api/usersData/${userId}`,
          {
            isBanned: !isBanned,
          }
        );

        if (response.status !== 200) {
          throw new Error("فشل في تحديث حالة المستخدم");
        }

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBanned: !isBanned } : user
          )
        );

        Swal.fire({
          title: `${successText}!`,
          text: `تم ${successText} المستخدم بنجاح.`,
          icon: "success",
          iconColor: "#28a745",
          background: "#18296C",
          color: "#ffffff",
          confirmButtonColor: "#1E38A3",
          confirmButtonText: "حسناً",
          padding: "2em",
          backdrop: "rgba(22, 30, 65, 0.8)",
          position: "center",
        });
      } catch (error) {
        Swal.fire({
          title: "خطأ!",
          text: `حدث خطأ أثناء محاولة ${actionText} المستخدم.`,
          icon: "error",
          iconColor: "#ff0000",
          background: "#18296C",
          color: "#ffffff",
          confirmButtonColor: "#1E38A3",
          confirmButtonText: "حسناً",
          padding: "2em",
          backdrop: "rgba(22, 30, 65, 0.8)",
          position: "center",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen text-white font-cairo">
      <Sidebar />

      <div className="flex-grow p-2 sm:p-4 md:p-6 md:mr-64 mr-[75px] overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          جدول المستخدمين
        </h1>
        {/* حقل البحث الاحترافي */}
        <div className="mb-5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="ابحث عن فاتورة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1E38A3] border border-[#2f64bb] text-white py-2 px-4 pl-10 
                   rounded-full shadow-lg transition duration-200 
                   focus:outline-none focus:ring-2 focus:ring-[#2f64bb] w-full"
            />
            <Search className="h-5 w-5 absolute left-3 top-[1.4rem] transform -translate-y-1/2 text-white" />
          </div>
          <ItemsPerPageSelect
            itemsPerPage={itemsPerPage}
            setItemsPerPage={handleItemsPerPageChange}
            totalPages={totalPages}
            currentPage={currentPage}
            totalCount={totalCount}
          />
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
                  الهاتف
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  تاريخ الإنشاء
                </th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">
                  الأجرائات
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center"
                >
                  <td className="p-2 sm:p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer"><div onClick={() => handleUserClick(user._id)}>{user._id}</div></td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer">
                    <div onClick={() => handleUserClick(user._id)}>
                      {user.firstName}
                    </div>
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer">
                    <div onClick={() => handleUserClick(user._id)}>
                      {user.lastName || "لا يوجد اسم أخير"}
                    </div>
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {user.email}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {user.companyName || "لايوجد اسم شركة"}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {user.phoneNumber || "لايوجد اسم رقم مسجل"}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm flex items-center justify-center">
                    <button
                      onClick={() => handleisBanned(user._id, user.isBanned)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                        user.isBanned
                          ? "bg-gray-600/90 hover:bg-gray-600"
                          : "bg-green-600/90 hover:bg-green-600"
                      }`}
                    >
                      {user.isBanned ? (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>محظور</span>
                        </>
                      ) : (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          <span>غير محظور</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* عرض البطاقات على الشاشات الصغيرة */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {users.map((user, index) => (
            <div
              key={user._id}
              className="bg-[#1E38A3] rounded-lg shadow-lg p-3 sm:p-4"
            >
              <p className="mb-2 text-sm">
                <span className="font-bold" >المعرف: </span>
                <span className="font-bold hover:text-[#2fceff] cursor-pointer" onClick={() => handleUserClick(user._id)} >{user._id} </span>
                
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold ">الاسم الأول: </span>
                <span className="hover:text-[#2fceff] cursor-pointer" onClick={() => handleUserClick(user._id)}>
                  {user.firstName}
                </span>
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">الاسم الأخير: </span>
                <span onClick={() => handleUserClick(user._id)}>
                  {user.lastName || "لا يوجد اسم أخير"}
                </span>
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">البريد الإلكتروني: </span>
                {user.email}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">اسم الشركة: </span>
                {user.companyName || "لايوجد اسم شركة"}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">الخدمات: </span>
                لاتوجد خدمات
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">تاريخ الإنشاء: </span>
                {new Date(user.createdAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
              <button
                      onClick={() => handleisBanned(user._id, user.isBanned)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                        user.isBanned
                          ? "bg-gray-600/90 hover:bg-gray-600"
                          : "bg-green-600/90 hover:bg-green-600"
                      }`}
                    >
                      {user.isBanned ? (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>محظور</span>
                        </>
                      ) : (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          <span>غير محظور</span>
                        </>
                      )}
                    </button>
            </div>
          ))}
        </div>
        {/* Pagination الاحترافي */}
        {!users || users.length === 0 ? (
          <>
            <div className="max-w-7xl mx-auto">
              <div className="mt-6 text-center">
                <h2 className="text-lg font-bold mb-2">لا يوجد مستخدمين</h2>
                <p className="text-md">
                  للبحث عن المستخدمين ابحث عن اسم المستخدم الأول او الأخير او
                  البريد الألكتروني او رقم الهاتف
                </p>
              </div>
            </div>
            {/* أزرار التنقل بين الصفحات */}
          </>
        ) : (
          <div className="flex justify-center items-center mt-4 space-x-3 mx-4 pb-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
