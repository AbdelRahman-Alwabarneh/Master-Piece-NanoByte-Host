import React, { useState,useEffect } from 'react';
import { X, Send, ChevronDown, Mail } from 'lucide-react';
import axios from "axios";
import { useNavigate,useParams } from 'react-router-dom';
const EmailTemplateModal = ({ onClose ,serviceData, userId}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    // Fetch email templates on component mount
    axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/emailTemplate`)
      .then((response) => {
        setEmailTemplates(response.data.emailTemplates);
      })
      .catch((error) => {
        console.error('Error fetching templates:', error);
      });
  }, []);
  

  const handleSend = async () => {
    if (selectedTemplate) {
      setLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL_ADMIN}/api/SendEmail`, { 
          id: selectedTemplate._id, 
          serviceData, 
          userId 
        });
        console.log(response.data.EmailLog);
      } catch (error) {
        console.error('Error sending email:', error);
      } finally {
        navigate(`/EmailLogsPage/${id}`)

      }
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] rounded-lg shadow-xl">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-blue-700 pb-3 mb-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Mail className="w-4 h-4" />
              محتوى الرسالة
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Template Selection */}
          <div className="space-y-4">
            <label className="block text-xs text-gray-300">
              اختر الرسالة
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-blue-900/50 text-right rounded-lg border border-blue-700/50 px-4 py-3 flex items-center justify-between hover:bg-blue-800/60 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-[13px] font-medium text-white">
                    {selectedTemplate ? selectedTemplate.templateName : 'اختر قالباً'}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-gradient-to-b from-blue-900/95 to-blue-800/95 backdrop-blur-sm border border-blue-700/50 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                  {emailTemplates.map((template, index) => (
                    <button
                    key={template.id || index}
                      onClick={() => handleTemplateSelect(template)}
                      className="w-full text-right px-4 py-3 text-[13px] text-white hover:bg-blue-700/50 flex items-center gap-2 transition-colors duration-200"
                    >
                      <Mail className="w-4 h-4 text-gray-400" />
                      {template.templateName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-blue-700">
              <button
                onClick={onClose}
                className="flex items-center gap-1 bg-blue-900/80 hover:bg-blue-900 px-4 py-2 rounded text-xs transition-colors"
              >
                <X className="w-3 h-3" />
                <span>إلغاء</span>
              </button>
              <button
                onClick={handleSend}
                disabled={!selectedTemplate}
                className={`flex items-center gap-1 px-4 py-2 rounded text-xs transition-colors ${
                  selectedTemplate
                    ? `bg-green-600/90 hover:bg-green-600 ${Loading && "animate-pulse"}`
                    : 'bg-green-600/50 cursor-not-allowed'
                }`}
              >
                <Send className="w-3 h-3" />
                <span>{Loading ? "جاري الإرسال  ..." : "إرسال"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateModal;