import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, Download } from "lucide-react";
import Loading from "../../Components/Loading/Loading";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
const InvoicePage = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderNumber } = useParams();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/invoices/${orderNumber}`
        );
        setInvoice(response.data);
      } catch (err) {
        setError("حدث خطأ في جلب تفاصيل الفاتورة");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <>
    <Header />
    <div className="min-h-screen  py-12 px-6 [direction:rtl] mt-[72px] font-cairo">
      <div className="max-w-4xl mx-auto bg-[#bed8f3] shadow-lg rounded-lg p-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500 mb-6 shadow-lg">
            <Check className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            شكراً لإتمام عملية الشراء
          </h1>
        </div>
  
        {/* Invoice Box */}
        <div className="bg-[#bed8f3] shadow-xl rounded-lg p-8">
          {/* Invoice Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  فاتورة طلب
                </h2>
                <p className="text-blue-600 text-sm">
                  رقم الطلب: {invoice.orderNumber}
                </p>
              </div>
              <div className="text-left">
                <p className="text-blue-600 text-sm mb-1">تاريخ الإصدار</p>
                <p className="text-gray-800">
                  {new Date(invoice.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
  
          {/* Customer Details */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-blue-600 text-sm mb-2">اسم العميل</p>
                <p className="text-gray-800 font-medium">
                  {invoice.userId.firstName}
                </p>
              </div>
              <div>
                <p className="text-blue-600 text-sm mb-2">البريد الإلكتروني</p>
                <p className="text-gray-800 font-medium">
                  {invoice.userId.email}
                </p>
              </div>
            </div>
          </div>
  
          {/* Order Details */}
          <div className="space-y-6 mb-8">
            <div>
              <p className="text-blue-600 text-sm mb-2">الخطة المشتراة</p>
              <p className="text-gray-800 font-medium">{invoice.planName}</p>
            </div>
  
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-blue-600 text-sm mb-2">طريقة الدفع</p>
                <p className="text-gray-800 font-medium">
                  {invoice.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-blue-600 text-sm mb-2">حالة الطلب</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-600/20 text-green-700 text-sm">
                    <Check className="w-4 h-4 mr-1" />
                    {invoice.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Total Amount */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-blue-600 text-lg">المبلغ الإجمالي</span>
              <span className="text-3xl font-bold text-gray-800">
                ${invoice.amount.toFixed(2)}
              </span>
            </div>
  
            {/* Download Button */}
            {/* <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              تحميل الفاتورة (PDF)
            </button> */}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
  
  
  );
};

export default InvoicePage;
