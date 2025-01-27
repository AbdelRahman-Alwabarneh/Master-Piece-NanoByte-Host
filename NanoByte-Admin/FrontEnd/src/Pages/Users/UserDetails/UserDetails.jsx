import React, { useState, useEffect } from "react";
import {
  FileText,
  FolderPlus,
  MessageSquare,
  User,
  UserPlus,
  DollarSign,
  XCircle,
  AlertCircle,
  Mail,
  Globe,
  Phone,
  Menu,
  BarChart2,
  Package,
  Plus,
  Home,
  Settings,
  HelpCircle,
  Boxes,
} from "lucide-react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, userDetails } from "../../../Redux/Slice/usersData";
import Loading from "../../../Components/Loading/Loading";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { useParams, useNavigate } from "react-router-dom";
import UserSidebar from "../../../Components/UserSidebar/UserSidebar";
import axios from "axios";
import EmailDetails from "../Emailpage/Components/EmailDetails";
const otherActions = [
  { icon: FileText, text: "كشف الحساب" },
  { icon: FolderPlus, text: "فتح تذكرة دعم فني جديدة" },
  { icon: MessageSquare, text: "تذاكر الدعم المفتوحة" },
  { icon: User, text: "مشاهدة تفاصيل الترويج" },
  { icon: UserPlus, text: "دمج حسابات العملاء" },
  { icon: XCircle, text: "إغلاق حساب العميل" },
  { icon: AlertCircle, text: "حذف حساب العميل" },
  { icon: DollarSign, text: "Export Client Data" },
];

const Dashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.UserData);
  const [emailLogs, setEmailLogs] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingorders, setLoadingorders] = useState(true);
  const [loadingservices, setloadingservices] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [orders, setOrders] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmailLogs = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL_ADMIN}/api/emailLog/${id}`
        );
        setEmailLogs(response.data.emailLogData);

        setLoading(false);
      } catch (err) {
        setError("حدث خطأ أثناء جلب البيانات");
        setLoading(false);
      }
    };

    fetchEmailLogs();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL_ADMIN}/api/order/UserOrders/${id}`
        );
        setOrders(response.data.orders);
        setLoadingorders(false);
      } catch (err) {
        setError("حدث خطأ أثناء جلب البيانات");
        setLoadingorders(false);
      }
    };

    fetchOrders();
  }, [id]);

  const fetchServices = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_ADMIN}/api/service/AllServices/${id}`
      );
      setServices(response.data.services);
      setloadingservices(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setloadingservices(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchServices();
    }
  }, [id]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(userDetails(id));
    } else if (status === "failed") {
      console.log("failed");
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (id) {
      dispatch(userDetails(id));
    }
  }, [dispatch, id]);

  if (status === "loading" || loading || loadingorders || loadingservices) {
    return <Loading />;
  }
  if (!user || !user.UsersData || user.UsersData.length === 0) {
    return <NoDataFound />;
  }

  const orderStats = {
    paid: 0, // عدد الطلبات المدفوعة
    totalRevenue: 0, // إجمالي الإيرادات
    renewalFee: 0, // المبالغ المستحقة (الرسوم التجديدية)
    overdue: 0, // عدد الطبات المتأخرة (التي تاريخ الدفع القادم لها قبل اليوم)
    canceled: 0, // عدد الطبات الملغاة
    grossRevenue: 0, // الإيرادات الإجمالية
    clientExpenses: 0, // النفقات المدفوعة من العميل
    totalOrders: 0, // إجمالي عدد الطبات
    averageRevenuePerOrder: 0, // متوسط الإيرادات لكل طلب
    activeOrders: 0, // عدد الطلبات النشطة
    pendingOrders: 0, // عدد الطلبات المعلقة
    fraudOrders: 0, // عدد الطبات المرفوضة أو المزورة
  };

  // معالجة البيانات
  orders?.forEach((order) => {
    // حساب المبالغ المدفوعة (عند إتمام الدفع)
    if (order.paymentStatus === "Completed") {
      orderStats.paid += 1;
      orderStats.totalRevenue += order.amount; // المبلغ المدفوع من العميل
      orderStats.grossRevenue += order.amount; // الإيرادات الإجمالية
      orderStats.clientExpenses += order.amount; // النفقات المدفوعة من العميل
    }

    // حساب المبالغ المستحقة (المبالغ المتأخرة)
    if (new Date(order.nextPaymentDate) < new Date()) {
      orderStats.renewalFee += order.renewalFee; // إضافة رسوم التجديد
      orderStats.overdue += 1; // عدد الطبات المتأخرة
    }

    // حساب الطلبات الملغاة
    if (order.orderStatus === "Cancelled") {
      orderStats.canceled += 1; // عدد الطبات الملغاة
    }

    // حساب الطلبات النشطة
    if (order.orderStatus === "Active") {
      orderStats.activeOrders += 1;
    }

    // حساب الطلبات المعلقة
    if (order.orderStatus === "Pending") {
      orderStats.pendingOrders += 1;
    }

    // حساب الطلبات المزورة أو المرفوضة
    if (order.orderStatus === "Fraud") {
      orderStats.fraudOrders += 1;
    }

    // تحديث إجمالي عدد الطبات
    orderStats.totalOrders += 1;
  });

  // حساب متوسط الإيرادات لكل طلب
  if (orderStats.totalOrders > 0) {
    orderStats.averageRevenuePerOrder =
      orderStats.totalRevenue / orderStats.totalOrders;
  }
  const handleOrderClick = (OrderNumber) => {
    navigate(`/OrderDetails/${OrderNumber}`);
  };
  const handleServiceClick = (OrderNumber) => {
    navigate(`/ServiceManagement/${id}/${OrderNumber}`);
  };
  const getserviceStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-400";
      case "expired":
        return "text-red-600";
      case "refunded":
        return "text-red-900";
      default:
        return "text-gray-400";
    }
  };
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white p-2 sm:p-4 font-cairo md:mr-64 mr-[75px] text-sm mt-6">
        <div className="max-w-7xl mx-auto">
          <UserSidebar />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* User info section */}
            <div className="lg:col-span-1">
              <div className="bg-blue-900 bg-opacity-70 rounded-lg p-3 sm:p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center border-b border-blue-700 pb-2">
                  <User className="mr-2" size={18} /> معلومات العميل
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    {
                      icon: User,
                      label: "الأسم الأول",
                      value: user.UsersData.firstName,
                    },
                    {
                      icon: User,
                      label: "الأسم الأخير",
                      value: user.UsersData.lastName || "لايوجد اسم اخير",
                    },
                    {
                      icon: Mail,
                      label: "البريد الإلكتروني",
                      value: user.UsersData.email,
                    },
                    {
                      icon: Globe,
                      label: "عنوان الشارع",
                      value: user.UsersData.streetAddress || "لايوجد عنوان",
                    },
                    {
                      icon: Globe,
                      label: "المدينة",
                      value: user.UsersData.city || "لاتوجد مدينة",
                    },
                    {
                      icon: Globe,
                      label: "أسم الشركة",
                      value: user.UsersData.companyName || "لايوجد اسم شركة",
                    },
                    {
                      icon: Phone,
                      label: "رقم الهاتف",
                      value: user.UsersData.phoneNumber || "لا يوجد رقم هاتف",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-xs flex-wrap"
                    >
                      <span className="flex items-center text-gray-300 w-full sm:w-auto mb-1 sm:mb-0">
                        <item.icon size={14} className="mr-2" />
                        {item.label}:
                      </span>
                      <span className="font-medium break-all">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account summary section */}
            <div className="lg:col-span-2 h-full">
              <div className="bg-blue-900 bg-opacity-70 h-full rounded-lg p-3 sm:p-4 shadow-lg">
                <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
                  <BarChart2 className="mr-2" size={18} /> الفواتير/المبيعات
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6">
                  {/* المدفوعات المكتملة */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">المدفوعات المكتملة:</span>
                    <span className="font-medium">{orderStats.paid}</span>
                  </div>
                  {/* الطلبات الملغاة */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">الطلبات الملغاة:</span>
                    <span className="font-medium">{orderStats.canceled}</span>
                  </div>
                  {/* الطلبات النشطة */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">الطلبات النشطة:</span>
                    <span className="font-medium">
                      {orderStats.activeOrders}
                    </span>
                  </div>
                  {/* الطلبات المعلقة */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">الطلبات المعلقة:</span>
                    <span className="font-medium">
                      {orderStats.pendingOrders}
                    </span>
                  </div>
                  {/* الطلبات المزورة */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">الطلبات المزورة:</span>
                    <span className="font-medium">
                      {orderStats.fraudOrders}
                    </span>
                  </div>
                  {/* إجمالي الطلبات */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">إجمالي الطلبات:</span>
                    <span className="font-medium">
                      {orderStats.totalOrders}
                    </span>
                  </div>
                  {/* المبالغ المستحقة */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">المبالغ المستحقة:</span>
                    <span className="font-medium">
                      {orderStats.renewalFee} USD
                    </span>
                  </div>
                  {/* الإيرادات الصافية */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">جميع المدفوعات:</span>
                    <span className="font-medium">
                      {orderStats.grossRevenue} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent emails and product list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Recent emails */}
            <div className="bg-blue-900 bg-opacity-70 rounded-lg p-3 sm:p-4 shadow-lg">
              <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
                <Mail className="mr-2 ml-1" size={18} /> البريد الإلكتروني
                الأخير
              </h2>
              <ul className="space-y-2">
                {emailLogs.slice(0, 5).map((email, index) => (
                  <li
                    key={index}
                    className="border-b border-blue-800 pb-2 text-xs"
                  >
                    <p className="text-gray-300">
                      {" "}
                      {new Date(email.createdAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                    <p
                      className="font-medium break-words cursor-pointer hover:text-blue-300"
                      onClick={() => setSelectedEmail(email._id)}
                    >
                      {email.emailSubject}
                    </p>

                    <p className="text-gray-400">
                      {" "}
                      اسم المرسل: {email.senderName}
                    </p>
                  </li>
                ))}
                              {!emailLogs || emailLogs.length === 0 ? (
                  <div className=" text-white p-2 sm:p-4 font-cairo text-sm">
                    <div className=" text-center">
                      <h2 className="text-sm font-bold mb-2">
                        لا توجد رسائل بريد الكتروني مسجلة لهذا العميل.
                      </h2>
                    </div>
                  </div>
                ) : null}
              </ul>
            </div>

            {/* Product list */}
            <div className="bg-blue-900 bg-opacity-70 rounded-lg p-3 sm:p-4 shadow-lg">
              <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
                <Package className="mr-2 ml-1" size={18} /> قائمة اخر 5 طلبات
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0 text-xs">
                  <thead>
                    <tr className="bg-blue-800">
                      <th className="p-2 text-right whitespace-nowrap">
                        المنتج
                      </th>
                      <th className="p-2 text-right whitespace-nowrap">
                        العدد
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-800 transition duration-300"
                      >
                        <td
                          className="p-2 border-b border-gray-600 whitespace-nowrap cursor-pointer hover:text-blue-300"
                          onClick={() => handleOrderClick(order.orderNumber)}
                        >
                          {order.planName}
                        </td>
                        <td className="p-2 border-b border-gray-600 text-right whitespace-nowrap">
                          {order.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!orders || orders.length === 0 ? (
                  <div className=" text-white p-2 sm:p-4 font-cairo text-sm">
                    <div className=" text-center">
                      <h2 className="text-sm font-bold mb-2">
                        لا توجد طلبات أو خدمات مسجلة لهذا العميل.
                      </h2>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="bg-blue-900 bg-opacity-70 rounded-lg p-4 shadow-lg">
            <div className="flex">
              <Boxes className="mr-2 ml-1 mt-1.5" size={18} />
              <h3 className="text-lg font-semibold mb-4 text-white">
                قائمة اخر 5 خدمات / منتجات
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm text-white">
                <thead>
                  <tr className="bg-blue-800">
                    <th className="p-2 text-center">معرف الخدمة</th>
                    <th className="p-2 text-center">معرف الطلب</th>
                    <th className="p-2 text-center">اسم الخطة</th>
                    <th className="p-2 text-center">حالة الخدمة</th>
                  </tr>
                </thead>
                <tbody>
                  {services.slice(0, 5).map((service, index) => (
                    <tr
                      key={index}
                      className="border-b border-blue-700 hover:bg-blue-800 transition duration-300 text-center"
                    >
                      <td
                        title="الأنتقال الى الخدمة"
                        className="p-2 cursor-pointer hover:text-blue-300"
                        onClick={() =>
                          handleServiceClick(service.OrderdId?.orderNumber)
                        }
                      >
                        {service._id}
                      </td>
                      <td
                        title="الأنتقال الى الطلب"
                        className="p-2 cursor-pointer hover:text-blue-300"
                        onClick={() =>
                          handleOrderClick(service.OrderdId?.orderNumber)
                        }
                      >
                        {service.OrderdId?._id}
                      </td>
                      <td
                        title="الأنتقال الى الخدمة"
                        className="p-2 cursor-pointer hover:text-blue-300"
                        onClick={() =>
                          handleServiceClick(service.OrderdId?.orderNumber)
                        }
                      >
                        {service?.domain
                          ? service?.domain
                          : service.OrderdId?.planName}
                      </td>
                      <td
                        className={`p-2 ${getserviceStatusColor(
                          service.status
                        )}`}
                      >
                        {service.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!services || services.length === 0 ? (
                  <div className=" text-white p-2 sm:p-4 font-cairo text-sm">
                    <div className=" text-center">
                      <h2 className="text-sm font-bold mb-2">
                        لا توجد طلبات أو خدمات مسجلة لهذا العميل.
                      </h2>
                    </div>
                  </div>
                ) : null}
            </div>
          </div>

          {/* Other actions */}
          {/* <div className="bg-blue-900 bg-opacity-70 p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
            <Plus className="mr-2" size={18} /> إجراءات أخرى
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {otherActions.map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center bg-blue-800 p-2 sm:p-3 rounded-lg shadow-sm hover:bg-blue-700 transition duration-300 text-xs"
              >
                <item.icon className="mb-1 sm:mb-2" size={20} />
                <span className="text-center break-words">{item.text}</span>
              </button>
            ))}
          </div>
        </div> */}
        </div>
      </div>
      {selectedEmail && (
        <EmailDetails
          emailData={selectedEmail}
          onClose={() => setSelectedEmail(null)}
        />
      )}
    </>
  );
};

export default Dashboard;
