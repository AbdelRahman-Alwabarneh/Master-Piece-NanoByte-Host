import axios from "axios";
import { useState } from "react";

function InvoiceSummary({AnimatePresence, motion, AlertCircle,invoice,Download }) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        setProgress(0);
        
        const simulateProgress = () => {
            const duration = 3000; 
            const interval = 30; 
            const steps = duration / interval;
            const increment = 99 / steps; 
            
            let currentProgress = 0;
            const timer = setInterval(() => {
                currentProgress += increment;
                if (currentProgress >= 99) {
                    clearInterval(timer);
                    currentProgress = 99; 
                }
                setProgress(Math.min(Math.round(currentProgress), 99));
            }, interval);
            
            return timer;
        };
        
        const progressTimer = simulateProgress();
        
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/InvoicePDF/generate-pdf/${invoice.orderNumber}`,
            {
              responseType: "blob", 
            }
          );
          clearInterval(progressTimer);
          setProgress(100);

          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          const dateStr = new Date().toISOString().split('T')[0];
          link.download = `Nanobyte_Invoice_#${invoice.orderNumber}_${dateStr}.pdf`;
          link.click();

          setTimeout(() => {
            setIsDownloading(false);
            setProgress(0);
        }, 200);

        } catch (error) {
          console.error("فشل في تحميل الفاتورة:", error);
          clearInterval(progressTimer);
          setProgress(0);
          setIsDownloading(false);
        } finally {
            setIsDownloading(false);
          }
      };
      const getPaymentStatusArabic = (status) => {
        switch (status) {
          case "Pending":
            return "قيد الانتظار";
          case "Completed":
            return "مكتمل";
          case "Failed":
            return "فشل الدفع";
          case "Cancelled":
            return "أُلغيت";
          case "Refound":
            return "تم الاسترداد";
          default:
            return "غير معروف";
        }
      };
      
    return(<>
              <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full lg:w-1/3 mb-8 order-1 lg:order-2 group relative"
              >
                <div
                  style={{ top: "80px" }}
                  className="bg-nano-bg-additional-200 rounded-lg p-6 shadow-lg sticky top-4"
                >
                  <h2 className="text-2xl font-semibold mb-4 border-b border-nano-border-200 pb-4 text-nano-text-100">
                    ملخص الفاتورة
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-nano-text-200">الخطة</span>
                      <span className="font-semibold text-nano-text-100">
                        {invoice.planName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-nano-text-200">قيمة الخدمة</span>
                      <span className="font-semibold text-nano-text-100">
                        ${invoice.planPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-nano-text-200">رسوم الإعداد</span>
                      <span className="font-semibold text-nano-text-100">
                        ${invoice.setupFee.toFixed(2)}
                      </span>
                    </div>
                    {invoice.appliedDiscount &&
                    <div className="flex justify-between">
                      <span className="text-nano-text-200">الخصم المطبق</span>
                      <span className="font-semibold text-green-500">
                      -${invoice.appliedDiscount.toFixed(2)}
                      </span>
                    </div>
                    }

                    <div className="flex justify-between">
                      <span className="text-nano-text-200">تاريخ الدفع</span>
                      <span className="font-semibold text-nano-text-100">
                        {new Date(invoice.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between group relative">
                      <span className="text-nano-text-200">حالة الدفع</span>
                      {invoice.paymentStatus === "Pending" ? (
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-400 text-sm cursor-pointer"
                      >
                        <AlertCircle className="w-4 h-4 ml-1" />
                        {getPaymentStatusArabic(invoice.paymentStatus)}
                      </span>
                    ) : (
                      <span className="font-semibold text-green-500">
                        {getPaymentStatusArabic(invoice.paymentStatus)}
                      </span>
                    )}
                      {invoice.paymentStatus === "Pending" && (
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs tooltip dark:bg-gray-700"
                        role="tooltip"
                      >
                        الطلب قد يستغرق وقتاً ليصبح مكتمل، يرجى الانتظار.
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    )}
                    </div>
                  </div>
                  <div className="border-t border-nano-border-200 pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-semibold text-nano-text-200 text-lg">
                        الإجمالي المدفوع
                      </span>
                      <span className="text-2xl font-bold text-nano-text-100">
                        ${invoice.amount.toFixed(2)}
                      </span>
                    </div>
                    <button
                    onClick={handleDownloadPDF}
                    className={`w-full ${isDownloading ? "bg-gray-400 cursor-not-allowed" : "bg-nano-primary-300 hover:bg-nano-primary-400"} text-nano-text-100 font-bold py-3 px-4 rounded transition duration-300 text-sm shadow-md relative overflow-hidden`}
                    disabled={isDownloading}
                            >
                                {!isDownloading ? (
                                    <div className="flex items-center justify-center">
                                        <Download className="w-5 h-5 ml-2" />
                                        تحميل الفاتورة (PDF)
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center w-full">
                                        <div className="flex items-center justify-center mb-1">
                                            <span>جاري تحميل ملف الـ PDF...</span>
                                        </div>
                                        <div className="w-full bg-gray-300/30 rounded-full h-2 mb-1">
                                            <div 
                                                className="bg-white h-2 rounded-full transition-all duration-150 ease-out"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-nano-text-100 font-bold">{progress}%</div>
                                        <div 
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
                                            style={{
                                                transform: `translateX(${-100 + progress}%)`,
                                                transition: 'transform 300ms ease-out'
                                            }}
                                        ></div>
                                    </div>
                                )}
                            </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
    </>)
}

export default InvoiceSummary;