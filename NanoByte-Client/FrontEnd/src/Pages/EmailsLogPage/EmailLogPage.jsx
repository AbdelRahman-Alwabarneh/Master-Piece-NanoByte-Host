import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import UserSidebar from "../../Components/UserSidebar/UserSidebar";
import EmailDetails from "./EmailDetails";
import Pagination from "../../Components/Pagination/Pagination";
import ItemsPerPageSelect from "../../Components/Pagination/ItemsPerPageSelect";
const EmailLogPage = () => {
  const [emailLogData, setEmailLogData] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchEmailLogs(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);
  
  const fetchEmailLogs = async (page, limit) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/emailLog?page=${page}&limit=${limit}`,
        {},
        { withCredentials: true }
      );
      setEmailLogData(response.data.emailLogData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching email logs:", error);
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    fetchEmailLogs(1, value); 
  };

  return (
    <>
      <Header />
      <div className="font-cairo min-h-screen">
        <div className="container mx-auto px-4 mt-[150px] pb-8">
          <div className="lg:flex lg:flex-row-reverse gap-6 space-y-6 lg:space-y-0">
            <UserSidebar />
            <div className="flex-1 bg-[#194f86]">
              <div className="overflow-x-auto bg-[#194f86] rounded-lg shadow-lg">
                <table className="w-full text-sm text-right text-gray-200">
                  <thead className="text-xs text-center uppercase bg-[#194f86] text-gray-100 border-b border-[#003366]">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        مشاهدة الرسالة
                      </th>
                      <th scope="col" className="px-6 py-3">
                        تاريخ الإرسال
                      </th>
                      <th scope="col" className="px-6 py-3">
                        اسم المرسل
                      </th>
                      <th scope="col" className="px-6 py-3">
                        بريد المرسل
                      </th>
                      <th scope="col" className="px-6 py-3">
                        موضوع الرسالة
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailLogData.map((email, index) => (
                      <tr
                        key={email._id}
                        className={`text-center border-b border-[#003366] hover:bg-[#174776] ${
                          index % 2 === 0 ? "bg-[#235a92]" : "bg-[#194f86]"
                        }`}
                        onClick={() => setSelectedEmail(email._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="text-center whitespace-nowrap">
                          <button className="font-cairo group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/30 backdrop-blur-lg px-2 py-2 text-xs font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 whitespace-nowrap">
                            <span className="text-xs">عرض الرسالة</span>
                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                              <div className="relative h-full w-12 bg-white/30"></div>
                            </div>
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {new Date(email.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap">
                          {email.senderName}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap">
                          {email.senderEmail}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap">
                          {email.emailSubject}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                 
                </table>
   
              </div>
                                 {/* أزرار التنقل بين الصفحات */}
                <div className="flex justify-between items-center mt-4 space-x-3 mx-4 pb-2">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                <ItemsPerPageSelect
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={handleItemsPerPageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedEmail && (
        <EmailDetails
          emailData={selectedEmail}
          onClose={() => setSelectedEmail(null)}
        />
      )}
      <Footer />
    </>
  );
};

export default EmailLogPage;
