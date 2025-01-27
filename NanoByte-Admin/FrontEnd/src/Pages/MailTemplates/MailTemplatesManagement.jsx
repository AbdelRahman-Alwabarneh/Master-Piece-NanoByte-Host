import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Eye, Trash,ToggleLeft, ToggleRight  } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";


const EmailTemplateManagement = () => {
  const [templateData, setTemplateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/emailTemplate`);
        setTemplateData(response.data.emailTemplates);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, []);

  const handleIsActiveTemplate = async (id, isActive) => {
    const actionText = isActive ? "تعطيل" : "تفعيل";
    const successText = isActive ? "تم تعطيل" : "تم تفعيل";
    const confirmText = isActive ? "هل تريد تعطيل" : "هل تريد تفعيل";

    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: `${confirmText} القالب؟`,
      icon: "warning",
      iconColor: "#ffcc00",
      background: "#18296C",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#1E38A3",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
      padding: "2em",
      backdrop: "rgba(22, 30, 65, 0.8)",
      position: "center",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL_ADMIN}/api/emailTemplate/${id}`
        );

        if (response.status !== 200) {
          throw new Error("فشل في تحديث القالب");
        }

        setTemplateData((templates) =>
          templates.map((template) =>
            template._id === id ? { ...template, isActive: !isActive } : template
          )
        );

        Swal.fire({
          title: `${successText}!`,
          text: `${successText} القالب بنجاح.`,
          icon: "success",
          iconColor: "#28a745",
          background: "#18296C",
          color: "#ffffff",
          confirmButtonColor: "#1E38A3",
          confirmButtonText: "موافق",
          padding: "2em",
          backdrop: "rgba(22, 30, 65, 0.8)",
          position: "center",
        });
      } catch (error) {
        Swal.fire({
          title: "خطأ!",
          text: `حدث خطأ أثناء ${actionText} القالب.`,
          icon: "error",
          iconColor: "#ff0000",
          background: "#18296C",
          color: "#ffffff",
          confirmButtonColor: "#1E38A3",
          confirmButtonText: "موافق",
          padding: "2em",
          backdrop: "rgba(22, 30, 65, 0.8)",
          position: "center",
        });
      }
    }
  };

  const EmailTemplateDetails = (templateId) => {
    navigate(`/EmailTemplateDetails/${templateId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NoDataFound message={error} />;
  }

  if (!templateData.length) {
    return <NoDataFound />;
  }

  return (
    <div className="flex min-h-screen text-white font-cairo">
      <Sidebar />

      <div className="flex-grow p-2 sm:p-4 md:p-6 md:mr-64 mr-[75px] overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          إدارة قوالب البريد الإلكتروني
        </h1>

        <div className="mb-5 flex justify-between items-center flex-wrap">
          <Link
            to="/AddEmailTemplate"
            className="bg-gradient-to-r mt-3 sm:mt-0 from-[#1E38A3] to-[#2f64bb] hover:to-[#1E90FF] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-200"
          >
            + إضافة قالب جديد
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="hidden md:table min-w-full bg-[#1E38A3] rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#2f64bb] text-white">
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">اسم القالب</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">اسم المرسل</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">البريد الإلكتروني للمرسل</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">عنوان الرسالة</th>
                <th className="p-2 sm:p-3 text-center text-xs sm:text-sm">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {templateData.map((template) => (
                <tr key={template._id} className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center">
                  <td onClick={() => EmailTemplateDetails(template._id)} className="p-2 sm:p-3 text-xs sm:text-sm hover:text-[#2fceff] cursor-pointer">
                    {template.templateName}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">{template.senderName}</td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">{template.senderEmail}</td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm">
                    {template.emailSubject}
                  </td>
                  <td className="p-2 sm:p-3 text-xs sm:text-sm flex items-center justify-center">
                  <button
                 onClick={() => handleIsActiveTemplate(template._id, template.isActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                    template.isActive ? 'bg-green-600/90 hover:bg-green-600' : 'bg-gray-600/90 hover:bg-gray-600'
                }`}
              >
                {template.isActive ? (
                  <>
                    <ToggleRight className="w-4 h-4" />
                    <span>القالب مفعل</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4" />
                    <span>القالب معطل</span>
                  </>
                )}
              </button>
            
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* عرض البطاقات على الشاشات الصغيرة */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {templateData.map((template) => (
            <div key={template._id} className="bg-[#1E38A3] rounded-lg shadow-lg p-3 sm:p-4">
              <p onClick={() => EmailTemplateDetails(template._id)} className="mb-2 text-sm hover:text-[#2fceff] cursor-pointer">
                <span className="font-bold">اسم القالب: </span>{template.templateName}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">اسم المرسل: </span>{template.senderName}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-bold">البريد الإلكتروني: </span>{template.senderEmail}
              </p>
              <p className="mb-2 text-sm">
              عنوان الرسالة	: {template.emailSubject}
              </p>
              <button
                 onClick={() => handleIsActiveTemplate(template._id, template.isActive)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${
                    template.isActive ? 'bg-green-600/90 hover:bg-green-600' : 'bg-gray-600/90 hover:bg-gray-600'
                }`}
              >
                {template.isActive ? (
                  <>
                    <ToggleRight className="w-4 h-4" />
                    <span>القالب مفعل</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4" />
                    <span>القالب معطل</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateManagement;