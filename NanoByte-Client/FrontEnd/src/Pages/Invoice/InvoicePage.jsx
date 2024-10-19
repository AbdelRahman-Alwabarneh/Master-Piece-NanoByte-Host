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
          `http://localhost:2000/api/invoices/${orderNumber}`
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
      <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] flex items-center justify-center">
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
      <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] py-12 px-4 [direction:rtl] mt-[72px]">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500/90 mb-4 shadow-lg">
              <Check className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              شكراً لإتمام عملية الشراء
            </h1>
          </div>

          {/* Invoice Box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-xl">
            {/* Invoice Header */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    فاتورة طلب
                  </h2>
                  <p className="text-blue-200 text-sm">
                    رقم الطلب: {invoice.orderNumber}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-blue-200 text-sm mb-1">تاريخ الإصدار</p>
                  <p className="text-white">
                    {" "}
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-blue-200 text-sm mb-2">اسم العميل</p>
                  <p className="text-white font-medium">
                    {invoice.userId.firstName}
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-2">
                    البريد الإلكتروني
                  </p>
                  <p className="text-white font-medium">
                    {invoice.userId.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-6 mb-8">
              <div>
                <p className="text-blue-200 text-sm mb-2">الخطة المشتراة</p>
                <p className="text-white font-medium">{invoice.planName}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-blue-200 text-sm mb-2">طريقة الدفع</p>
                  <p className="text-white font-medium">
                    {invoice.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-2">حالة الطلب</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                      <Check className="w-4 h-4 mr-1" />
                      {invoice.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">المبلغ الإجمالي</span>
                <span className="text-2xl font-bold text-white">
                  ${invoice.amount.toFixed(2)}
                </span>
              </div>

              {/* Download Button */}
              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                تحميل الفاتورة (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvoicePage;
