import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../../Components/Pagination/Pagination";
import ItemsPerPageSelect from "../../Components/Pagination/ItemsPerPageSelect";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import Sidebar from "../../Components/Sidebar/Sidebar";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchMessages(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, searchTerm]);

  const fetchMessages = async (page, limit) => {
    try {
      const response = await axios.post(
        `http://localhost:2100/api/Contact?page=${page}&limit=${limit}`
      );
      setMessages(response.data.contactsData);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
      setStatus("success");
    } catch (error) {
      console.error("Error fetching messages:", error);
      setStatus("error");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    fetchMessages(1, value);
  };

  const handleReply = async (messageId) => {
    // عرض نافذة "جاري الإرسال"
    const loadingSwal = Swal.fire({
      title: "جاري الإرسال...",
      text: "يرجى الانتظار",
      icon: "info",
      iconColor: "#3B82F6",
      background: "#18296C",
      color: "#ffffff",
      showCancelButton: false,
      allowOutsideClick: false, // منع إغلاق النافذة أثناء الإرسال
      padding: "2em",
      backdrop: "rgba(22, 30, 65, 0.8)",
      position: "center",
      showConfirmButton: false, // إخفاء زر التأكيد لأننا نعرض فقط نافذة "جاري الإرسال"
    });
  
    // نافذة الرد على الرسالة
    const result = await Swal.fire({
      title: "الرد على الرسالة",
      html: `
        <input id="messageTitle" class="swal2-input" placeholder="عنوان الرسالة" />
      `,
      input: "textarea",
      icon: "info",
      iconColor: "#3B82F6",
      background: "#18296C",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#1E38A3",
      cancelButtonColor: "#d33",
      confirmButtonText: "إرسال",
      cancelButtonText: "إلغاء",
      padding: "2em",
      backdrop: "rgba(22, 30, 65, 0.8)",
      position: "center",
    });
  
    const messageTitle = Swal.getPopup().querySelector("#messageTitle").value;
    const replyText = result.value;
  
    if (result.isConfirmed && replyText) {
      try {
        // إرسال الرد
        await axios.post(`http://localhost:2100/api/Contact/${messageId}`, {
          adminReply: replyText,
          emailSubject: messageTitle,
        });
  
        // تحديث الرسائل بعد الإرسال
        setMessages(messages.map(msg => 
          msg._id === messageId 
            ? { ...msg, adminReply: replyText, status: "تم الرد", title: messageTitle }
            : msg
        ));
  
        // إغلاق نافذة "جاري الإرسال" وفتح نافذة النجاح
        loadingSwal.close();
  
        Swal.fire({
          title: "تم الإرسال!",
          text: "تم إرسال الرد بنجاح",
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
        // إغلاق نافذة "جاري الإرسال" وفتح نافذة الخطأ
        loadingSwal.close();
  
        Swal.fire({
          title: "خطأ!",
          text: "حدث خطأ أثناء إرسال الرد",
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
  
  

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <NoDataFound />;
  }

  return (
    <div className="flex min-h-screen text-white font-cairo">
      <Sidebar />
      
      <div className="flex-grow p-2 sm:p-4 md:p-6 md:mr-64 mr-[75px] overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          رسائل التواصل
        </h1>

        <div className="mb-5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="ابحث عن رسالة..."
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
          <table className="hidden md:table min-w-full bg-[#1E38A3] rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#2f64bb] text-white">
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">المعرف</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">الاسم</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">البريد الإلكتروني</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">الرسالة</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">الرد</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">الحالة</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">تاريخ الإرسال</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={message._id} className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200">
                  <td className="p-2 sm:p-3 text-xs sm:text-sm text-center">{index + 1}</td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm text-center">{message.name}</td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm text-center">{message.email}</td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm text-center max-w-[200px]"><div className="max-h-[100px] max-w-[200px] whitespace-pre-wrap overflow-y-auto overflow-x-hidden mx-auto [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100">{message.description}</div></td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm text-center max-w-[200px]"><div className="max-h-[100px] max-w-[200px] whitespace-pre-wrap overflow-y-auto overflow-x-hidden mx-auto [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100">{message.adminReply || "لا يوجد رد"}</div></td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm text-center">{message.status}</td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm text-center">
                    {new Date(message.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm text-center">
                    <button
                      onClick={() => handleReply(message._id)}
                      className="bg-blue-600/90 hover:bg-blue-600 px-3 py-1.5 rounded text-xs transition-colors"
                    >
                      الرد
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {messages.map((message, index) => (
            <div key={message._id} className="bg-[#1E38A3] rounded-lg shadow-lg p-3 sm:p-4">
              <p className="mb-2 text-sm"><span className="font-bold">المعرف: </span>{index + 1}</p>
              <p className="mb-2 text-sm"><span className="font-bold">الاسم: </span>{message.name}</p>
              <p className="mb-2 text-sm"><span className="font-bold">البريد الإلكتروني: </span>{message.email}</p>
              <p className="mb-2 text-sm"><span className="font-bold">الرسالة: </span>{message.description}</p>
              <p className="mb-2 text-sm"><span className="font-bold">الرد: </span>{message.adminReply || "لا يوجد رد"}</p>
              <p className="mb-2 text-sm"><span className="font-bold">الحالة: </span>{message.status}</p>
              <p className="mb-2 text-sm">
                <span className="font-bold">تاريخ الإرسال: </span>
                {new Date(message.createdAt).toLocaleDateString("en-GB")}
              </p>
              <button
                onClick={() => handleReply(message._id)}
                className="bg-blue-600/90 hover:bg-blue-600 px-3 py-1.5 rounded text-xs transition-colors w-full mt-2"
              >
                الرد
              </button>
            </div>
          ))}
        </div>

        {!messages || messages.length === 0 ? (
          <div className="max-w-7xl mx-auto">
            <div className="mt-6 text-center">
              <h2 className="text-lg font-bold mb-2">لا توجد رسائل</h2>
              <p className="text-md">
                لا توجد رسائل تواصل في الوقت الحالي
              </p>
            </div>
          </div>
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

export default ContactMessages;