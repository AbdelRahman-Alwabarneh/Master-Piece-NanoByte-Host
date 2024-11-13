import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "../../../Components/Pagination/Pagination";
import ItemsPerPageSelect from "../../../Components/Pagination/ItemsPerPageSelect";
const DedicatedServerTable = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchServices(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);
  
    const fetchServices = async (page, limit) => {
      try {
        const response = await axios.post(
          `http://localhost:2000/api/service/ServiceUser/DedicatedServer?page=${page}&limit=${limit}`,
          {},
          { withCredentials: true }
        );
        setServices(response.data.services);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    fetchServices(1, value); 
  };

  const formatStatus = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "نشط";
      case "expired":
        return "معلق";
      case "cancelled":
        return "ملغي";
      case "pending":
        return "قيد الأنشاء";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-600";
      case "expired":
        return "text-blue-600";
      case "cancelled":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const calculateTimeRemaining = (nextPaymentDate) => {
    const now = new Date();
    const paymentDate = new Date(nextPaymentDate);
    const diffTime = Math.abs(paymentDate - now);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return `${diffDays}.${diffHours}`;
  };
  const handleUserClick = (serviceid, OrderNumber) => {
    navigate(`/ServiceControlPanel/${serviceid}/${OrderNumber}`);
  };

  return (
    <>
      <div className="overflow-x-auto bg-[#194f86] rounded-lg shadow-lg">
        <table className="w-full text-sm text-right text-gray-200">
          <thead className="text-xs text-center uppercase bg-[#194f86] text-gray-100 border-b border-[#003366]">
            <tr>
              <th scope="col" className="px-6 py-3">
                لوحة التحكم
              </th>
              <th scope="col" className="px-6 py-3">
                حالة الخادم
              </th>
              <th scope="col" className="px-6 py-3">
                باقي للخادم
              </th>
              <th scope="col" className="px-6 py-3">
                مواصفات الخادم
              </th>
              <th scope="col" className="px-6 py-3">
                IP الخاص
              </th>
              <th scope="col" className="px-6 py-3">
                اسم الخادم
              </th>
              <th scope="col" className="px-6 py-3">
                اسم الخطة
              </th>
            </tr>
          </thead>

          <tbody>
            {services.map(
              (service, index) =>
                (service.status === "expired" ||
                  service.status === "pending" ||
                  service.status === "active") && (
                  <tr
                    key={service._id}
                    className={`text-center border-b border-[#003366] hover:bg-[#174776] ${
                      index % 2 === 0 ? "bg-[#235a92]" : "bg-[#194f86]"
                    }`}
                  >
                    <td
                      className="px-6 py-4"
                      onClick={() =>
                        handleUserClick(service._id, service.OrderNumber)
                      }
                    >
                      <button className="text-gray-100 hover:text-white transition-colors">
                        <Settings size={20} />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusColor(service.status)}>
                        {formatStatus(service.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {calculateTimeRemaining(service.OrderdId.nextPaymentDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-h-[100px] max-w-[200px] whitespace-pre-wrap overflow-y-auto overflow-x-hidden mx-auto [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100">
                        {service.OrderdId.dedicatedServerId.planDescription}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {service.privateIP || "قيد الأنشاء"}
                    </td>
                    <td className="px-6 py-4">
                      {service.domain || "قيد الأنشاء"}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {service.OrderdId.dedicatedServerId.planTitle}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
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
      {loading ? (
        <>
          <div className="min-h-screen text-white p-2 sm:p-4 font-cairo text-sm mt-6">
            <div className="max-w-7xl mx-auto">
              <div className="mt-6 text-center">
                <h2 className="text-lg font-bold mb-2">...جاري التحميل</h2>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          {!services || services.length === 0 ? (
            <>
              <div className="min-h-screen text-white p-2 sm:p-4 font-cairo text-sm mt-6">
                <div className="max-w-7xl mx-auto">
                  <div className="mt-6 text-center">
                    <h2 className="text-lg font-bold mb-2">
                      لا تمتلك خوادم مركزية
                    </h2>
                    <p className="text-md">
                      لطلب خادم مركزي انتقل لصفحة الخوادم المركزية
                    </p>
                    <Link
                      to={`/DedicatedServer`}
                      className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      أطلب خادم مركزي الأن
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : null}{" "}
        </>
      )}
    </>
  );
};

export default DedicatedServerTable;
