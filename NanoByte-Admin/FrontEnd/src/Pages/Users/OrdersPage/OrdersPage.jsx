import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  User,
  CreditCard,
  Package,
  Clock,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import UserSidebar from "../../../Components/UserSidebar/UserSidebar";
import Loading from "../../../Components/Loading/Loading";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { useNavigate,useParams ,Link} from "react-router-dom";


const OrdersPage = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL_ADMIN}/api/order/UserOrders/${id}`
        );
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError("حدث خطأ أثناء جلب البيانات");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NoDataFound />;
  }
  const handleOrderClick = (OrderNumber) => {
    navigate(`/OrderDetails/${OrderNumber}`);
  };
  const handleUserClick = (userid) => {
    navigate(`/userDetails/${userid}`);
  };

  if (!orders || orders.length === 0) {
    return (
      <>
        <Sidebar />
        <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white p-2 sm:p-4 font-cairo md:mr-64 mr-[75px] text-sm mt-6">
          <div className="max-w-7xl mx-auto">
            <UserSidebar />
            <div className="mt-6 text-center">
              <h2 className="text-lg font-bold mb-2">
                لا توجد طلبات أو خدمات مسجلة لهذا العميل.
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
              <table className="min-w-full bg-[#1E38A3] rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-[#2f64bb] text-white">
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      رقم الطلب
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      اسم العميل
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      مدة الاشتراك
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      السعر
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      طريقة الدفع
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      حالة الدفع
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      حالة الطلب
                    </th>
                    <th className="p-2 sm:p-3 text-center text-xs sm:text-xs">
                      التاريخ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center"
                    >
                      <td  className="cursor-pointer hover:text-[#9de3ff] p-2 sm:p-3 text-xs sm:text-xs" onClick={() => handleOrderClick(order.orderNumber)}>
                        {order.orderNumber}
                      </td>
                      <td className="cursor-pointer hover:text-[#9de3ff] p-2 sm:p-3 text-xs sm:text-xs" onClick={() => handleUserClick(order.userId._id)}>
                        {order.userId.firstName}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-xs">
                        {order.Subscriptionduration}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-xs">
                        ${order.amount}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-xs">
                        {order.paymentMethod}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-xs">
                        {order.paymentStatus}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-xs">
                        {order.orderStatus}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-xs">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
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
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#2f64bb] rounded-lg shadow-lg p-4 space-y-3"
              >
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-300 mb-1">رقم الطلب</p>
                    <p className="text-sm cursor-pointer hover:text-[#9de3ff]" onClick={() => handleOrderClick(order.orderNumber)}>{order.orderNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-300 mb-1">اسم العميل</p>
                    <p className="text-sm cursor-pointer hover:text-[#9de3ff]" onClick={() => handleUserClick(order.userId._id)}>{order.userId.firstName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-300 mb-1">مدة الاشتراك</p>
                    <p className="text-sm">{order.Subscriptionduration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-300 mb-1">السعر</p>
                    <p className="text-sm">${order.amount}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CreditCard className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-300 mb-1">طريقة الدفع</p>
                    <p className="text-sm">{order.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-300 mb-1">حالة الدفع</p>
                    <p className="text-sm">{order.paymentStatus}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-300 mb-1">حالة الطلب</p>
                    <p className="text-sm">{order.orderStatus}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-300 mb-1">التاريخ</p>
                    <p className="text-sm">
                      {" "}
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
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
      </div>
    </>
  );
};

export default OrdersPage;
