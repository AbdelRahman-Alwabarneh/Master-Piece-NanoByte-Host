import React, { useState, useEffect } from "react";
import { X, Mail, User, AtSign } from 'lucide-react';
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/Loading/Loading";
const EmailDetails = ({ onClose, emailData }) => {
    const [emailLogs, setEmailLogs] = useState({});
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEmailLogs = async () => {
      try {
        const response = await axios.post(`http://localhost:2000/api/emailLog/logId/${emailData}`);
        setEmailLogs(response.data.emailLogDataDetails);
        setLoading(false);
      } catch (err) {
        setError("حدث خطأ أثناء جلب البيانات");
        setLoading(false);
      }
    };
  
    fetchEmailLogs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NoDataFound />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-cairo">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
    
    {/* Modal Content */}
    <div className="relative w-full max-w-3xl bg-[#11365a] rounded-lg shadow-xl overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-blue-700 pb-3 mb-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Mail className="w-4 h-4" />
            مشاهدة رسائل البريد
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Content */}
        <div className="space-y-3 text-right">
          {/* Subject and Sender in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-blue-700/30 p-3 rounded-lg border border-blue-700/30">
              <div className="flex items-start gap-2 justify-end">
                <div className="flex-1">
                  <h3 className="text-gray-300 text-sm mb-1">العنوان</h3>
                  <p className="text-white text-sm">{emailLogs.emailSubject}</p>
                </div>
                <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              </div>
            </div>

            <div className="bg-blue-700/30 p-3 rounded-lg border border-blue-700/30">
              <div className="flex items-start gap-2 justify-end">
                <div className="flex-1">
                  <h3 className="text-gray-300 text-sm mb-1">معلومات المرسل</h3>
                  <p className="text-white text-sm">{emailLogs.senderName}</p>
                  <p className="text-gray-400 text-sm">{emailLogs.senderEmail}</p>
                </div>
                <User className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="bg-blue-700/30 p-3 rounded-lg border border-blue-700/30">
            <div className="flex items-start gap-2 justify-end">
              <div className="flex-1">
                <h3 className="text-gray-300 text-sm mb-1">معلومات المستلم</h3>
                <p className="text-white text-sm">{emailLogs.userId.firstName}</p>
                <p className="text-gray-400 text-sm">{emailLogs.userId.email}</p>
              </div>
              <AtSign className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            </div>
          </div>

          {/* Email Body */}
          <div className="bg-blue-700/30 p-3 max-h-72 overflow-y-auto overflow-x-hidden rounded-lg border border-blue-700/30">
            <h3 className="text-gray-300 text-sm mb-2">محتوى الرسالة</h3>
            <div 
              className="text-black text-sm prose prose-invert max-w-none bg-white"
              dangerouslySetInnerHTML={{ __html: emailLogs.emailBody }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4 pt-4 border-t border-blue-700">
          <button
            onClick={onClose}
            className="flex items-center gap-1 bg-blue-900/80 hover:bg-blue-900 px-4 py-2 rounded text-xs transition-colors text-white"
          >
            <X className="w-3 h-3" />
            <span>إغلاق</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EmailDetails;