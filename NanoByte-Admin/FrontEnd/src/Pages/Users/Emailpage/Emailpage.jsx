import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Calendar, User, AtSign } from "lucide-react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import UserSidebar from "../../../Components/UserSidebar/UserSidebar";
import Loading from "../../../Components/Loading/Loading";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import EmailDetails from "./Components/EmailDetails";
import { useParams,Link } from "react-router-dom";

const EmailLogsPage = () => {
  const [emailLogs, setEmailLogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { id } = useParams();
    
  useEffect(() => {
    const fetchEmailLogs = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL_ADMIN}/api/emailLog/${id}`);
        setEmailLogs(response.data.emailLogData);
        setLoading(false);
      } catch (err) {
        setError("حدث خطأ أثناء جلب البيانات");
        setLoading(false);
      }
    };
  
    fetchEmailLogs();
  }, []);
  

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NoDataFound />;
  }

  if (!emailLogs || emailLogs.length === 0) {
    return (
      <>
        <Sidebar />
        <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white p-2 sm:p-4 font-cairo md:mr-64 mr-[75px] text-sm mt-6">
          <div className="max-w-7xl mx-auto">
            <UserSidebar />
            <div className="mt-6 text-center">
              <h2 className="text-lg font-bold mb-2">
                لا توجد رسائل مسجلة لهذا العميل.
              </h2>
              <p className="text-md">
                يرجى مراجعة صفحة ملخص العميل لمزيد من التفاصيل.
              </p>
              <Link
                to={`/userDetails/${id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                الانتقال إلى صفحة ملخص العميل
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="min-h-screen text-white p-2 sm:p-4 font-cairo md:mr-64 mr-[75px] text-sm mt-6">
        <div className="max-w-7xl mx-auto">
          <UserSidebar />
          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="bg-[#2f64bb] rounded-lg shadow-xl overflow-hidden">
              <table className="hidden md:table min-w-full bg-[#1E38A3] rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-[#2f64bb] text-white">
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      العنوان
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      اسم المرسل
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      البريد الإلكتروني
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      تاريخ الإنشاء
                    </th>
                  </tr>
                </thead>
                <tbody>
  {emailLogs.map((log) => (
    <tr
      key={log._id}
      className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center"
    >
      <td
        className="p-2 sm:p-3 text-xs sm:text-xs cursor-pointer hover:text-blue-300"
        onClick={() => setSelectedEmail(log._id)}
      >
        {log.emailSubject}
      </td>
      <td className="p-2 sm:p-3 text-xs sm:text-xs">{log.senderName}</td>
      <td className="p-2 sm:p-3 text-xs sm:text-xs">{log.senderEmail}</td>
      <td className="p-2 sm:p-3 text-xs sm:text-xs">
        {new Date(log.createdAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>

  {/* Mobile View */}
<div className="lg:hidden p-4 space-y-4">
  {emailLogs.map((log) => (
    <div key={log._id} className="bg-[#2f64bb] rounded-lg shadow-lg p-4 space-y-3">
      
      <div className="flex items-start gap-2">
        <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-300 mb-1">العنوان</p>
          <p
            className="text-sm cursor-pointer hover:text-blue-300"
            onClick={() => setSelectedEmail(log._id)}
          >
            {log.emailSubject}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <User className="w-4 h-4 mt-1 flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-300 mb-1">اسم المرسل</p>
          <p className="text-sm">{log.senderName}</p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <AtSign className="w-4 h-4 mt-1 flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-300 mb-1">البريد الإلكتروني</p>
          <p className="text-sm">{log.senderEmail}</p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Calendar className="w-4 h-4 mt-1 flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-300 mb-1">تاريخ الإنشاء</p>
          <p className="text-sm">
            {new Date(log.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      </div>

    </div>
  ))}
</div>


        </div>
        {selectedEmail && (
  <EmailDetails 
    emailData={selectedEmail}
    onClose={() => setSelectedEmail(null)}
  />
)}
      </div>
    </>
  );
};

export default EmailLogsPage;
