import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, DollarSign, User, CreditCard, Package, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Loading from '../../Components/Loading/Loading';
import NoDataFound from '../../Components/NoDataFound/NoDataFound';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState('Pending');
  const { orderNumber } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post(`http://localhost:2100/api/order/${orderNumber}`);
        setOrder(response.data);
        setOrderStatus(response.data.orderStatus);
        setError(null);
      } catch (err) {
        setError('حدث خطأ في جلب تفاصيل الطلب');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderNumber]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Active':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Fraud':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusInArabic = (status) => {
    const statusMap = {
      'Pending': 'في انتظار التفعيل',
      'Active': 'مفعل',
      'Cancelled': 'ملغي',
      'Fraud': 'احتيال'
    };
    return statusMap[status] || status;
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setOrderStatus(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <NoDataFound />;

  return (
    <div className="min-h-screen font-cairo bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)]">
      <div className="transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-6 pb-8 mr-[75px] md:mr-64">
        <Sidebar />
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-semibold text-white">تفاصيل الطلب #{order.orderNumber}</h1>
            <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(orderStatus)}`}>
              {getStatusInArabic(orderStatus)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Info Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/10">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-2.5 rounded-lg bg-blue-500/10">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs text-gray-400 mb-1">العميل</h3>
                  <p className="text-base font-medium text-white">{order.userId.firstName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Email: {order.userId.email.split('@')[0]}</p>
                </div>
              </div>
            </div>

            {/* Info Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/10">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-2.5 rounded-lg bg-green-500/10">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs text-gray-400 mb-1">المبلغ</h3>
                  <p className="text-base font-medium text-white">${order.amount} USD</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Info Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/10">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-2.5 rounded-lg bg-purple-500/10">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs text-gray-400 mb-1">تاريخ الطلب</h3>
                  <p className="text-base font-medium text-white">{formatDate(order.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">تفاصيل المنتج</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">المنتج</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">كود الخصم</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">دورة الفواتير</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">المبلغ</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">الحالة</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">حالة الدفع</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-sm text-white">{order.planName}</td>
                    <td className="py-3 px-4 text-sm text-white">{order.discountCode? order.discountCode : "لايوجد كود خصم"}</td>
                    <td className="py-3 px-4 text-sm text-white">{order.Subscriptionduration}</td>
                    <td className="py-3 px-4 text-sm text-white">${order.amount} USD</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs ${getStatusColor(orderStatus)}`}>
                        {getStatusInArabic(orderStatus)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs ${getStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <select
                value={orderStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-1 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="Pending">في انتظار التفعيل</option>
                <option value="Active">مفعل</option>
                <option value="Cancelled">ملغي</option>
                <option value="Fraud">احتيال</option>
              </select>
              <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                  اجعله في مجال الغش
                </button>
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                  رفض الطلب
                </button>
               
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                  قبول الطلب
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;