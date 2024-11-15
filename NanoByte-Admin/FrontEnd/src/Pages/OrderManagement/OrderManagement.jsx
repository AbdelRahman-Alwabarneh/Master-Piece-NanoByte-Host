import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Loading from "../../Components/Loading/Loading";
import Pagination from "../../Components/Pagination/Pagination";
import ItemsPerPageSelect from "../../Components/Pagination/ItemsPerPageSelect";
const PendingOrderManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { orderStatus } = useParams();

  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchInvoices(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage , orderStatus ,searchTerm]);

    const fetchInvoices = async (page, limit) => {
      try {
        const response = await axios.post(`http://localhost:2100/api/order/Status/${orderStatus}?page=${page}&limit=${limit}&search=${searchTerm}`);
        // Access the orders array from the response
        setInvoices(response.data.orders || []);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setInvoices([]); // Set empty array in case of error
      } finally {
        setLoading(false);
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


  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-400";
      case "Pending":
        return "text-yellow-400";
      case "Failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };
  
  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-400";
      case "Pending":
        return "text-yellow-400";
      case "Cancelled":
        return "text-red-400";
      case "Fraud":
        return "text-red-600";
      default:
        return "text-gray-400";
    }
  };
  const handleOrderClick = (OrderNumber) => {
    navigate(`/OrderDetails/${OrderNumber}`);
  };
  const handleUserClick = (userid) => {
    navigate(`/userDetails/${userid}`);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen text-white font-cairo md:mr-64 mr-[75px]">
      <Sidebar />
      <div className="flex-grow p-2 sm:p-4 md:p-6 overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          إدارة الفواتير
        </h1>

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
          <table className="hidden md:table min-w-full bg-[#1E38A3] rounded-lg shadow-lg mb-3">
            <thead>
              <tr className="bg-[#2f64bb] text-white">
                <th className="p-3 text-center text-sm">رقم الطلب</th>
                <th className="p-3 text-center text-sm">اسم العميل</th>
                <th className="p-3 text-center text-sm">مدة الاشتراك</th>
                <th className="p-3 text-center text-sm">السعر</th>
                <th className="p-3 text-center text-sm">طريقة الدفع</th>
                <th className="p-3 text-center text-sm">حالة الدفع</th>
                <th className="p-3 text-center text-sm">حالة الطلب</th>
                <th className="p-3 text-center text-sm">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center"
                >
                  <td className="p-3 text-sm cursor-pointer hover:text-[#9de3ff]" onClick={() => handleOrderClick(invoice.orderNumber)}>{invoice.orderNumber}</td>
                  <td className="p-3 text-sm cursor-pointer hover:text-[#9de3ff]" onClick={() => handleUserClick(invoice.userId._id)}>{invoice.userId.firstName}</td>
                  <td className="p-3 text-sm">
                    {invoice.Subscriptionduration}
                  </td>
                  <td className="p-3 text-sm">${invoice.amount}</td>
                  <td className="p-3 text-sm">{invoice.paymentMethod}</td>
                  <td
                    className={`p-3 text-sm ${getStatusColor(
                      invoice.paymentStatus
                    )}`}
                  >
                    {invoice.paymentStatus}
                  </td>
                  <td
                    className={`p-3 text-sm ${getOrderStatusColor(
                      invoice.orderStatus
                    )}`}
                  >
                    {invoice.orderStatus}
                  </td>
                  <td className="p-3 text-sm">
                    {formatDate(invoice.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Mobile View */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {invoices.map((invoice) => (
            <div
              key={invoice._id}
              className="bg-[#1E38A3] rounded-lg shadow-lg p-4"
            >
              <p className="mb-2 text-sm cursor-pointer hover:text-[#9de3ff]" onClick={() => handleOrderClick(invoice.orderNumber)}>
                <span className="font-bold">رقم الطلب: </span>
                {invoice.orderNumber}
              </p>
              <p className="mb-2 text-sm cursor-pointer hover:text-[#9de3ff]" onClick={() => handleUserClick(invoice.userId._id)}>
                <span className="font-bold">اسم العميل: </span>
                {invoice.userId.firstName}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">مدة الاشتراك: </span>
                {invoice.Subscriptionduration}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">السعر: </span>${invoice.amount}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">طريقة الدفع: </span>
                {invoice.paymentMethod}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">حالة الدفع: </span>
                <span className={getStatusColor(invoice.paymentStatus)}>
                  {invoice.paymentStatus}
                </span>
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">حالة الطلب: </span>
                <span className={getOrderStatusColor(invoice.orderStatus)}>
                  {invoice.orderStatus}
                </span>
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">التاريخ: </span>
                {formatDate(invoice.createdAt)}
              </p>
            </div>
          ))}
        </div>
          {!invoices || invoices.length === 0 ? <>
            <div className="max-w-7xl mx-auto">
            <div className="mt-6 text-center">
              <h2 className="text-lg font-bold mb-2">
                لا توجد طلبات أو خدمات هنا 
              </h2>
              <p className="text-md">
                يرجى مراجعة صفحة جميع الطلبات للحصول على التفاصيل 
              </p>
          
            </div>
        </div>
                                                 {/* أزرار التنقل بين الصفحات */}
             
          </> :    <div className="flex justify-center items-center mt-4 space-x-3 mx-4 pb-2">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              
              </div> }
      </div>
    </div>
  );
};

export default PendingOrderManagement;
