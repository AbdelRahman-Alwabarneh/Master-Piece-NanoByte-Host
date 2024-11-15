import React, { useState } from "react";
import { Save, X, ToggleLeft, ToggleRight } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import MergeableFields from "./Components/MergeableFields";

const AddEmailTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['link'],
        ['clean'],
    ],
  };

  const handleSave = async () => {
    try {
      const templateData = {
        templateName,
        senderName,
        senderEmail,
        emailSubject,
        emailBody,
        isActive
      };
  
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد حفظ القالب؟",
        icon: "warning",
        iconColor: "#ffcc00",
        background: "#18296C",
        color: "#ffffff",
        showCancelButton: true,
        confirmButtonColor: "#1E38A3",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، احفظ",
        cancelButtonText: "إلغاء"
      });
  
      if (result.isConfirmed) {
        const response = await axios.post('http://localhost:2100/api/emailTemplate', templateData);
        const newTemplateId = response.data.template._id;
        
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: 'تم بنجاح!',
            text: 'تم حفظ القالب بنجاح.',
            icon: 'success',
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: 'حسناً'
          }).then(() => {
            navigate(`/EmailTemplateDetails/${newTemplateId}`);
          });;
        } else {
          throw new Error("حدث خطأ أثناء حفظ القالب");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ!",
        text: "حدث خطأ أثناء حفظ القالب.",
        icon: "error",
        iconColor: "#ff0000",
        background: "#18296C",
        color: "#ffffff",
        confirmButtonColor: "#1E38A3",
        confirmButtonText: "موافق"
      });
      console.error("خطأ في حفظ القالب:", error);
    }
  };
  

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white p-4 font-cairo mr-[75px] md:mr-64 text-sm mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-950 bg-opacity-30 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">إضافة قالب جديد</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">اسم القالب</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                  placeholder="أدخل اسم القالب"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">اسم المرسل</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                  placeholder="أدخل اسم المرسل"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">البريد الإلكتروني للمرسل</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                  placeholder="أدخل البريد الإلكتروني للمرسل"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">موضوع البريد الإلكتروني</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                  placeholder="أدخل موضوع البريد الإلكتروني"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">نص البريد الإلكتروني</label>
                <div className="overflow-hidden h-96 rounded-lg shadow-lg bg-white">
                  <ReactQuill
                    value={emailBody}
                    onChange={setEmailBody}
                    className="h-96 border-none text-black text-end"
                    modules={modules}
                    theme="snow"
                  />
                </div>
              </div>
            </div>
    <MergeableFields/>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={toggleActive}
                className={`flex items-center gap-2 ml-2 px-3 py-1.5 rounded text-xs transition-colors ${
                  isActive ? 'bg-green-600/90 hover:bg-green-600' : 'bg-gray-600/90 hover:bg-gray-600'
                }`}
              >
                {isActive ? (
                  <>
                    <ToggleRight className="w-3 h-3" />
                    <span>فعال</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-3 h-3" />
                    <span>فعال</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
              <button
                  type="button"
                  className="bg-red-600/90 hover:bg-red-600 px-3 py-1.5 rounded text-xs flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  <span>إلغاء</span>
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-600/90 hover:bg-green-600 px-3 py-1.5 rounded text-xs flex items-center gap-1 transition-colors"
                >
                  <Save className="w-3 h-3" />
                  <span>حفظ</span>
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmailTemplate;