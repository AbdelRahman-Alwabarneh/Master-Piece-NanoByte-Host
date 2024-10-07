import React, { useState, useEffect } from 'react';
import {
  FileText, FolderPlus, MessageSquare, User, UserPlus, DollarSign, XCircle,
  AlertCircle, Mail, Globe, Phone, Menu, BarChart2, Package, Plus, Home,
  Settings, HelpCircle,
} from "lucide-react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, userDetails } from "../../../Redux/Slice/usersData";
import Loading from "../../../Components/Loading/Loading";
import NoDataFound from "../../../Components/NoDataFound/NoDataFound";
import { useParams } from "react-router-dom";
import UserSidebar from '../../../Components/UserSidebar/UserSidebar';

const userData = {
  رقم_العميل: '1420',
  الاسم: 'علي الفضلي',
  البريد_الإلكتروني: 'cod12iaim@gmail.com',
  العنوان: 'الكويت',
  المدينة: 'الكويت',
  الرمز_البريدي: 'KW - الكويت',
  رقم_الهاتف: '+965.97551685',
  balance: 5000,
  currency: "USD",
};

const newAccountSummary = {
  مدفوعة: { count: 35, amount: "$105.61 USD" },
  مسددة: { count: 0, amount: "$0.00 USD" },
  مستحقة_سنحقة: { count: 0, amount: "$0.00 USD" },
  ملغية: { count: 1, amount: "$0.43 USD" },
  مرتجع: { count: 0, amount: "$0.00 USD" },
  مقترحة: { count: 0, amount: "$0.00 USD" },
  grossRevenue: "$31.83 USD",
  clientExpenses: "$1.76 USD",
  netIncome: "$30.07 USD",
  balance: "$18.01 USD"
};

const recentEmails = [
  { date: "30/09/2024 13:00", subject: "Invoice Payment Confirmation", invoiceNumber: "5560215988" },
  { date: "30/09/2024 13:00", subject: "فاتورة جديدة -- 6935" },
  { date: "08/09/2024 23:01", subject: "Invoice Payment Confirmation" },
  { date: "08/09/2024 23:01", subject: "فاتورة جديدة -- 6915" }
];

const products = [
  { name: "استضافة مشتركة", count: "1 (1 Total)" },
  { name: "استضافة ريسلر", count: "0 (0 Total)" },
  { name: "خادم مشترك/خادم خاص", count: "0 (0 Total)" },
];

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

const tabs = [
  { id: 'home', name: 'الرئيسية', icon: Home },
  { id: 'invoices', name: 'الفواتير', icon: FileText },
  { id: 'products', name: 'المنتجات', icon: Package },
  { id: 'support', name: 'الدعم الفني', icon: HelpCircle },
  { id: 'settings', name: 'الإعدادات', icon: Settings },
];

const Dashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.UserData);

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

  if (status === "loading") {
    return <Loading />;
  }
  if (!user || !user.UsersData || user.UsersData.length === 0) {
    return <NoDataFound />;
  }

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
                  { icon: User, label: "الأسم الأول", value: user.UsersData.firstName },
                  { icon: User, label: "الأسم الأخير", value: user.UsersData.lastName || "لايوجد اسم اخير" },
                  { icon: Mail, label: "البريد الإلكتروني", value: user.UsersData.email },
                  { icon: Globe, label: "عنوان الشارع", value: user.UsersData.streetAddress || "لايوجد عنوان" },
                  { icon: Globe, label: "المدينة", value: user.UsersData.city || "لاتوجد مدينة" },
                  { icon: Globe, label: "أسم الشركة", value: user.UsersData.companyName || "لايوجد اسم شركة" },
                  { icon: Phone, label: "رقم الهاتف", value: user.UsersData.phoneNumber || "لا يوجد رقم هاتف" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs flex-wrap">
                    <span className="flex items-center text-gray-300 w-full sm:w-auto mb-1 sm:mb-0">
                      <item.icon size={14} className="mr-2" />
                      {item.label}:
                    </span>
                    <span className="font-medium break-all">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Account summary section */}
          <div className="lg:col-span-2">
            <div className="bg-blue-900 bg-opacity-70 rounded-lg p-3 sm:p-4 shadow-lg">
              <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
                <BarChart2 className="mr-2" size={18} /> الفواتير/المبيعات
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {Object.entries(newAccountSummary).map(([key, value], index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">{key.replace(/_/g, ' ')}:</span>
                    <span className="font-medium">{typeof value === 'object' ? `${value.count} (${value.amount})` : value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {["إنشاء فاتورة", "إنشئ فاتورة إضافة أموال", "إنشاء فواتير استحقاق", "إضافة خصومات", "إدارة الرصيد", "إنشاء تسعيرة خاصة جديدة"].map((text, index) => (
                  <button key={index} className="bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded text-xs transition duration-300">
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent emails and product list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Recent emails */}
          <div className="bg-blue-900 bg-opacity-70 rounded-lg p-3 sm:p-4 shadow-lg">
            <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
              <Mail className="mr-2" size={18} /> البريد الإلكتروني الأخير
            </h2>
            <ul className="space-y-2">
              {recentEmails.map((email, index) => (
                <li key={index} className="border-b border-blue-800 pb-2 text-xs">
                  <p className="text-gray-300">{email.date}</p>
                  <p className="font-medium break-words">{email.subject}</p>
                  {email.invoiceNumber && (
                    <p className="text-gray-400">تأكيد الطلب: {email.invoiceNumber}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Product list */}
          <div className="bg-blue-900 bg-opacity-70 rounded-lg p-3 sm:p-4 shadow-lg">
            <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
              <Package className="mr-2" size={18} /> قائمة جميع المنتجات
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0 text-xs">
                <thead>
                  <tr className="bg-blue-800">
                    <th className="p-2 text-right whitespace-nowrap">المنتج</th>
                    <th className="p-2 text-right whitespace-nowrap">العدد</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="hover:bg-blue-800 transition duration-300">
                      <td className="p-2 border-b border-gray-600 whitespace-nowrap">{product.name}</td>
                      <td className="p-2 border-b border-gray-600 text-right whitespace-nowrap">{product.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Other actions */}
        <div className="bg-blue-900 bg-opacity-70 p-3 sm:p-4 rounded-lg shadow">
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
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;