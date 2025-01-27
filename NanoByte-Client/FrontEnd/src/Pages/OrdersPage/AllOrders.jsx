import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useParams, Link , useNavigate } from "react-router-dom";
import UserSidebar from "../../Components/UserSidebar/UserSidebar";
import Pagination from "../../Components/Pagination/Pagination";
import ItemsPerPageSelect from "../../Components/Pagination/ItemsPerPageSelect";
const AllOrders = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchInvoices(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);


    const fetchInvoices = async (page, limit) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/invoices?page=${page}&limit=${limit}`, {
          withCredentials: true,
        });
        setInvoices(response.data.payments);
        setTotalPages(response.data.totalPages);
        console.log(invoices);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
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

  const TranslatOrderName = (status) => {
    switch (status) {
      case "Active":
        return "نشط";
      case "Pending":
        return "معلق";
      case "Cancelled":
        return "ملغي";
      case "Fraud":
        return "احتيال";
      default:
        return "معلق";
    }
  };
  const orderDetails = (orderNumber) => {
    navigate(`/InvoicePage/${orderNumber}`);
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
                        تاريخ الإنشاء
                      </th>
                      <th scope="col" className="px-6 py-3">
                        حالة الدفع
                      </th>
                      <th scope="col" className="px-6 py-3">
                        حالة الطلب
                      </th>
                      <th scope="col" className="px-6 py-3">
                        طريقة الدفع
                      </th>
                      <th scope="col" className="px-6 py-3">
                        السعر
                      </th>
                      <th scope="col" className="px-6 py-3">
                        اسم الخطة
                      </th>
                      <th scope="col" className="px-6 py-3">
                        رقم الطلب
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <tr
                        key={invoice._id}
                        className={`text-center border-b border-[#003366] hover:bg-[#174776] ${
                          index % 2 === 0 ? "bg-[#235a92]" : "bg-[#194f86]"
                        }`}
                      >
                        <td className="px-4 py-2 text-center whitespace-nowrap">
                          {new Date(invoice.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              invoice.paymentStatus === "Completed"
                                ? " text-green-400"
                                : " text-red-400"
                            }`}
                          >
                            {invoice.paymentStatus === "Completed"
                              ? "مكتمل"
                              : "معلق"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusColor(
                              invoice.orderStatus
                            )}`}
                          >
                            {TranslatOrderName(
                              invoice.orderStatus
                            )}
                          </span>
                        </td>

                        <td className="px-4 py-2 text-center whitespace-nowrap">
                          {invoice.paymentMethod}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap">
                          ${invoice.amount}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap">
                          {invoice.planName}
                        </td>
                        <td
                          onClick={() => orderDetails(invoice.orderNumber)}
                          className="px-4 py-2 text-center whitespace-nowrap hover:text-[#52d9ff] cursor-pointer"
                        >
                          <span
                            onClick={() => orderDetails(invoice.orderNumber)}
                          >
                            {invoice.orderNumber}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap justify-between items-center mt-4 space-x-4 mx-5 pb-2">
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
      <Footer />
    </>
  );
};

export default AllOrders;
