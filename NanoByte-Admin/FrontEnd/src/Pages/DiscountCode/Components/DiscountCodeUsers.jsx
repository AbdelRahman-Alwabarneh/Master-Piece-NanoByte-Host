import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";

const DiscountCodeUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usageData, setUsageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' for newest first
  const { id } = useParams();

  const fetchUsageData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_ADMIN}/api/discountCode/${id}`
      );
      const data = response.data.DiscountCodeDetails;

      // Sort usedBy array by lastUsed date
      if (data?.usedBy) {
        data.usedBy.sort((a, b) => {
          const dateA = new Date(a.lastUsed);
          const dateB = new Date(b.lastUsed);
          return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });
      }

      setUsageData(data);
    } catch (error) {
      console.error("Error fetching usage data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsageData();
    }
  }, [isOpen, sortOrder]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");

    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${year}/${month}/${day} ${hours}:${minutes} ${amPm}`;
  };

  // Filter users based on search term
  const filteredUsers =
    usageData?.usedBy?.filter(
      (usage) =>
        usage.userId.firstName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        usage.userId.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Calculate total pages based on filtered users
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get current page users
  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div>
<div
type="button"
  onClick={() => setIsOpen(true)}
  className="w-full cursor-pointer sm:w-auto px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
>
  <span className="ml-2">عرض المستخدمين</span>
</div>


      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1a1f3c] text-white rounded-xl w-full max-w-4xl mx-4 relative shadow-2xl">
            {/* Header */}
            <div className="border-b border-blue-900/50 p-6 bg-[#151a33] rounded-t-xl">
              <h2 className="text-2xl font-bold text-center text-blue-100">
                سجل استخدام كود الخصم
              </h2>
              <div className="text-center text-blue-200/80 text-sm mt-2">
                إجمالي الاستخدامات: {usageData?.usageCount || 0}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 left-6 text-blue-200/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Search and Sort Controls */}
            <div className="p-4 border-b border-blue-900/50 bg-[#1d2344]">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/50 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="البحث عن مستخدم..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full bg-[#232a4d] text-white rounded-lg pl-12 pr-4 py-2 placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={toggleSortOrder}
                  className="bg-[#232a4d] px-4 py-2 rounded-lg text-blue-200 hover:bg-[#282f54] transition-colors"
                >
                  ترتيب حسب التاريخ:{" "}
                  {sortOrder === "desc" ? "الأحدث أولاً" : "الأقدم أولاً"}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex flex-col justify-center items-center h-40">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-blue-200/60">جاري التحميل...</p>
                </div>
              ) : (
                <div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {getCurrentPageUsers().length > 0 ? (
                      <div className="space-y-4">
                        {getCurrentPageUsers().map((usage, index) => (
                          <div
                            key={usage._id || index}
                            className="bg-[#232a4d] rounded-lg p-5 hover:bg-[#282f54] transition-colors duration-200"
                          >
                            <div className="flex items-center justify-between flex-wrap gap-4">
                              <div className="flex-1">
                                <div className="flex items-start gap-4">
                                  <div className="bg-blue-900/30 rounded-full p-3 text-blue-200">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-lg text-blue-100">
                                      {usage.userId.firstName ||
                                        "مستخدم غير معروف"}
                                    </h3>
                                    <p className="text-blue-200/70 text-sm mt-1">
                                      {usage.userId.email ||
                                        "لا يوجد بريد إلكتروني"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="text-left space-y-2">
                                <p className="text-blue-200/70 text-sm">
                                  عدد مرات الاستخدام:{" "}
                                  <span className="text-blue-200">
                                    {usage.usageCount}
                                  </span>
                                </p>
                                {usage.lastUsed && (
                                  <p className="text-blue-200/70 text-sm">
                                    آخر استخدام:{" "}
                                    <span className="text-blue-200">
                                      {formatDate(usage.lastUsed)}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-blue-200/60">
                        {searchTerm
                          ? "لا توجد نتائج للبحث"
                          : "لم يتم استخدام الكود بعد"}
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t border-blue-900/30">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-blue-900/30 text-blue-200 hover:bg-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        السابق
                      </button>
                      <span className="text-blue-200/70">
                        صفحة {currentPage} من {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-blue-900/30 text-blue-200 hover:bg-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        التالي
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountCodeUsers;
