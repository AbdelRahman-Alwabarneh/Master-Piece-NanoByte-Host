import React, { useState, useEffect } from "react";
import { Save, X, ToggleLeft, ToggleRight } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import MergeableFields from "./Components/MergeableFields";
const EmailTemplateDetails = () => {
  const [loading, setLoading] = useState(true);
  const [templateData, settemplateData] = useState({
    templateName: "",
    senderName: "",
    senderEmail: "",
    emailSubject: "",
    emailBody: "",
    isActive: "",
  });
  const { id } = useParams();

  useEffect(() => {
    fetchEmailTemplate();
  }, [id]);

  const fetchEmailTemplate = async () => {
    try {
      const response = await axios.post(
        `http://localhost:2100/api/emailTemplate/${id}`
      );
      const details = response.data.EmailTemplatesDetails;
      settemplateData({ ...details });
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("خطأ!", "فشل في جلب بيانات المستخدمين.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    settemplateData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSave = async () => {
    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد تحديث القالب؟",
        icon: "warning",
        iconColor: "#ffcc00",
        background: "#18296C",
        color: "#ffffff",
        showCancelButton: true,
        confirmButtonColor: "#1E38A3",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، حدث القالب",
        cancelButtonText: "إلغاء",
      });

      if (result.isConfirmed) {
        const response = await axios.patch(
          `http://localhost:2100/api/emailTemplate/UpdateEmailTemplate/${id}`,
          templateData
        );

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "تم بنجاح!",
            text: "تم تحديث القالب بنجاح.",
            icon: "success",
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "حسناً",
          });
        } else {
          throw new Error("حدث خطأ أثناء تحديث القالب");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ!",
        text: "حدث خطأ أثناء تحديث القالب.",
        icon: "error",
        iconColor: "#ff0000",
        background: "#18296C",
        color: "#ffffff",
        confirmButtonColor: "#1E38A3",
        confirmButtonText: "موافق",
      });
      console.error("خطأ في تحديث القالب:", error);
    }
  };

  const handleQuillChange = (value) => {
    settemplateData((prev) => ({ ...prev, emailBody: value }));
  };

  const toggleActive = () => {
    settemplateData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  if (loading) {
    return <Loading />;
  }
  const sanitizedContent = DOMPurify.sanitize(templateData.emailBody);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ 'direction': 'rtl' }], 
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white p-4 font-cairo mr-[75px] md:mr-64 text-sm mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-950 bg-opacity-30 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">تفاصيل القالب</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">
                  اسم القالب
                </label>
                <input
                  type="text"
                  name="templateName"
                  value={templateData.templateName}
                  onChange={handleChange}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                  placeholder="أدخل اسم القالب"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  اسم المرسل
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={templateData.senderName}
                  onChange={handleChange}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                  placeholder="أدخل اسم المرسل"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  البريد الإلكتروني للمرسل
                </label>
                <input
                  type="email"
                  name="senderEmail"
                  value={templateData.senderEmail}
                  onChange={handleChange}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                  placeholder="أدخل البريد الإلكتروني للمرسل"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">
                  موضوع البريد الإلكتروني
                </label>
                <input
                  type="text"
                  name="emailSubject"
                  value={templateData.emailSubject}
                  onChange={handleChange}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs px-2 py-1.5 transition-all"
                  placeholder="أدخل موضوع البريد الإلكتروني"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">
                  نص البريد الإلكتروني
                </label>
                <div className="overflow-hidden h-96 rounded-lg  shadow-lg bg-white">
                  <ReactQuill
                    value={templateData.emailBody}
                    onChange={handleQuillChange}
                    className="h-96 border-none pb-9 text-black text-end"
                    modules={modules}
                    theme="snow"
                    dir="auto"
                  />
                </div>
              </div>
            </div>
            <MergeableFields/>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={toggleActive}
                className={`flex items-center gap-2 ml-2 px-3 py-1.5 rounded text-xs transition-colors ${
                  templateData.isActive
                    ? "bg-green-600/90 hover:bg-green-600"
                    : "bg-gray-600/90 hover:bg-gray-600"
                }`}
              >
                {templateData.isActive ? (
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
            {/* <div className="text-black bg-white px-4 py-4 mt-4"  dangerouslySetInnerHTML={{ __html: sanitizedContent }}>
                
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplateDetails;
