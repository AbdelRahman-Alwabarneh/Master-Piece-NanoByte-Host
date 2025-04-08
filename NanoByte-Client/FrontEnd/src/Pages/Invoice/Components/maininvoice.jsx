function MainInvoiceContent({motion, FileText, AlertCircle, Check, invoice }) {
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
              <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-nano-bg-additional-200 rounded-lg shadow-lg overflow-hidden border border-nano-border-300/20"
              >
                {/* Invoice Header with Logo and Title */}
                <div className="bg-gradient-to-r from-nano-primary-100 to-nano-primary-200 p-5 sm:p-6 text-nano-text-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold">فاتورة</h1>
                      <p className="text-nano-text-300 mt-1 text-sm sm:text-base">
                        رقم: #{invoice.orderNumber}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center bg-nano-primary-300/70 rounded-lg px-3 py-2 sm:px-4 sm:py-2 shadow-sm">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                        <span className="text-sm sm:text-base">فاتورة رسمية</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="p-5 sm:p-6">
                  {/* Status Banner */}
                  <div className="mb-6 bg-nano-success-100/15 rounded-lg p-3 sm:p-4 flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-nano-success-100 flex items-center justify-center ml-3 sm:ml-4 flex-shrink-0">
                      <Check className="w-4 h-4 sm:w-6 sm:h-6 text-nano-text-200" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-nano-success-100">
                        تم الدفع بنجاح
                      </h2>
                      <p className="text-nano-text-300 text-sm sm:text-base">
                        شكراً لإتمام عملية الشراء
                      </p>
                    </div>
                  </div>

                  {/* Date and Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pb-4 border-b border-nano-border-300/30">
                    <div className="p-3 bg-nano-bg-additional-300/30 rounded-lg">
                      <p className="text-nano-text-400 text-sm">تاريخ الفاتورة</p>
                      <p className="font-medium text-nano-text-200 mt-1">
                        {new Date(invoice.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <div className="p-3 bg-nano-bg-additional-300/30 rounded-lg">
                  <p className="text-nano-text-400 text-sm">حالة الدفع</p>
                  <div className="flex items-center mt-1 group relative">
                    {invoice.paymentStatus === "Pending" ? (
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-400 text-sm cursor-pointer"
                      >
                        <AlertCircle className="w-4 h-4 ml-1" />
                        {getPaymentStatusArabic(invoice.paymentStatus)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-600/20 text-green-400 text-sm">
                        <Check className="w-4 h-4 ml-1" />
                        {getPaymentStatusArabic(invoice.paymentStatus)}
                      </span>
                    )}

                    {/* Tooltip */}
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
                    <div className="p-3 bg-nano-bg-additional-300/30 rounded-lg">
                      <p className="text-nano-text-400 text-sm">طريقة الدفع</p>
                      <p className="font-medium mt-1 text-nano-text-200">{invoice.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 text-nano-text-400 flex items-center">
                      <span className="w-1 h-5 bg-nano-primary-300 rounded-full ml-2"></span>
                      معلومات العميل
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="bg-nano-bg-additional-300/40 p-4 rounded-lg border border-nano-border-300/10 hover:bg-nano-bg-additional-300/60 transition-colors duration-200">
                        <p className="text-nano-text-400 text-sm">الاسم</p>
                        <p className="font-medium text-lg text-nano-text-200 mt-1 break-words [overflow-wrap:anywhere] [word-break:break-word]">
                          {invoice.userId.firstName}
                        </p>
                      </div>
                      <div className="bg-nano-bg-additional-300/40 p-4 rounded-lg border border-nano-border-300/10 hover:bg-nano-bg-additional-300/60 transition-colors duration-200">
                        <p className="text-nano-text-400 text-sm">
                          البريد الإلكتروني
                        </p>
                        <p className="font-medium text-lg text-nano-text-200 mt-1 break-words [overflow-wrap:anywhere] [word-break:break-word]">
                          {invoice.userId.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 text-nano-text-400 flex items-center">
                      <span className="w-1 h-5 bg-nano-primary-300 rounded-full ml-2"></span>
                      تفاصيل الطلب
                    </h3>
                    <div className="bg-nano-bg-additional-300/40 rounded-lg overflow-hidden border border-nano-border-300/10">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-nano-primary-200 text-nano-text-200">
                              <th className="py-3 sm:py-4 px-3 sm:px-6 text-right font-bold">الوصف</th>
                              <th className="py-3 sm:py-4 px-2 sm:px-6 text-center font-bold">المدة</th>
                              <th className="py-3 sm:py-4 px-3 sm:px-6 text-left font-bold">السعر</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-nano-border-300/30">
                              <td className="py-4 px-3 sm:px-6">
                                <div>
                                  <p className="font-medium text-nano-text-200">
                                    {invoice.planName}
                                  </p>
                                  <p className="text-nano-text-400 text-sm mt-1">
                                    الاشتراك في الخدمة
                                  </p>
                                </div>
                              </td>
                              <td className="py-4 px-2 sm:px-6 text-center text-nano-text-300">
                                شهر واحد
                              </td>
                              <td className="py-4 px-3 sm:px-6 text-left text-nano-text-200 font-semibold">
                                ${invoice.planPrice.toFixed(2)}
                              </td>
                            </tr>
                            <tr className="border-b border-nano-border-300/30">
                              <td className="py-4 px-3 sm:px-6">
                                <div>
                                  <p className="font-medium text-nano-text-200">
                                  رسوم الإعداد
                                  </p>
                                  <p className="text-nano-text-400 text-sm mt-1">
                                  رسوم لمرة واحدة
                                  </p>
                                </div>
                              </td>
                              <td className="py-4 px-2 sm:px-6 text-center text-nano-text-300">
                              مرة واحدة
                              </td>
                              <td className="py-4 px-3 sm:px-6 text-left text-nano-text-200 font-semibold">
                                ${invoice.setupFee.toFixed(2)}
                              </td>
                            </tr>
                            {invoice.appliedDiscount &&  
                            <tr className="border-b border-nano-border-300/30">
                              <td className="py-4 px-3 sm:px-6">
                                <div>
                                  <p className="font-medium text-nano-text-200">
                                  الخصم المطبق
                                  </p>
                                  <p className="text-nano-text-400 text-sm mt-1">
                                  خصم لمرة واحدة
                                  </p>
                                </div>
                              </td>
                              <td className="py-4 px-2 sm:px-6 text-center text-nano-text-300">
                              مرة واحدة
                              </td>
                              <td className="py-4 px-3 sm:px-6 text-left text-nano-text-200 font-semibold">
                              -${invoice.appliedDiscount.toFixed(2)}
                              </td>
                            </tr>}
                            
                          </tbody>
                        </table>
                        <div className="w-full bg-nano-bg-additional-300 text-nano-text-200 rounded-b-lg py-4 px-6 flex justify-between items-center mt-0">
                          <div className="text-nano-text-200 font-bold text-base sm:text-lg">
                            الإجمالي المدفوع
                          </div>
                          <div className="text-nano-text-100 font-bold text-lg sm:text-xl">
                            ${invoice.amount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Footer Notes */}
                  <div className="mt-6 border-t border-nano-border-300/30 pt-6 text-nano-text-400">
                    <p className="text-sm text-center sm:text-right">
                      ملاحظة: هذه الفاتورة تم إنشاؤها إلكترونياً وهي صالحة بدون
                      توقيع أو ختم.
                    </p>
                  </div>
                </div>
              </motion.div>
    </>)
}

export default MainInvoiceContent;