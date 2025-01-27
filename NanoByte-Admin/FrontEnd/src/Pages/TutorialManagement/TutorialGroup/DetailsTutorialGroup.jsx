import React, { useState, useEffect } from "react";
import axios from "axios";
import { Save, X } from "lucide-react";
import Swal from "sweetalert2";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { useNavigate, useParams } from 'react-router-dom';

const DetailsTutorialGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [visibleToRegisteredOnly, setVisibleToRegisteredOnly] = useState(false);
  const [tutorials, setTutorials] = useState([]);
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/tutorialGroup/${id}`);
        const group = response.data.DetailsTutorialGroup;
        
        setGroupName(group.groupName);
        setGroupDescription(group.description);
        setIsVisible(group.isVisible);
        setVisibleToRegisteredOnly(group.visibleToRegisteredOnly);
        setTutorials(group.Tutorial || []);
        setLink(group.Link);
      } catch (error) {
        Swal.fire({
          title: "خطأ!",
          text: "فشل في جلب بيانات المجموعة",
          icon: "error",
          iconColor: "#ff0000",
          background: "#18296C",
          color: "#ffffff",
          confirmButtonColor: "#1E38A3",
          confirmButtonText: "موافق",
        });
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const groupData = {
      groupName,
      description: groupDescription,
      isVisible,
      visibleToRegisteredOnly,
      Tutorial: tutorials,
      Link: link,
    };
  
    Swal.fire({
      title: "تأكيد تحديث المجموعة",
      text: "هل أنت متأكد من تحديث هذه المجموعة التعليمية؟",
      icon: "question",
      iconColor: "#ffcc00",
      background: "#18296C",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonText: "نعم، حدّث المجموعة",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#1E38A3",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL_ADMIN}/api/tutorialGroup/${id}`,
            { groupData }
          );
  
          Swal.fire({
            title: "تم بنجاح!",
            text: response.data.message,
            icon: "success",
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "حسناً",
          }).then(() => {
            navigate(`/DetailsTutorialGroup/${id}`);
          });
        } catch (error) {
          Swal.fire({
            title: "خطأ!",
            text: "فشل في تحديث المجموعة.",
            icon: "error",
            iconColor: "#ff0000",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "موافق",
          });
          console.error("Error updating group:", error);
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br text-white font-cairo md:mr-64 mr-[75px] text-sm sm:text-base">
      <Sidebar />
      <div className="p-2 sm:p-4 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-950 bg-opacity-30 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-blue-500/10"
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/20">
            <h2 className="text-xl sm:text-2xl font-bold text-white">تحديث المجموعة التعليمية</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
                اسم المجموعة
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full bg-gray-500/10 bg-opacity-50 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white placeholder-white/50 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 text-xs sm:text-sm"
                placeholder="أدخل اسم المجموعة التعليمية"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
                وصف المجموعة
              </label>
              <textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="w-full bg-gray-500/10 bg-opacity-50 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white placeholder-white/50 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 text-xs sm:text-sm max-h-40 h-40"
                placeholder="أدخل وصف المجموعة التعليمية"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
                رابط المجموعة
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white placeholder-white/50 px-3 sm:px-4 py-1.5 sm:py-2 pr-8 transition-all duration-200 text-xs sm:text-sm"
                  placeholder="أدخل رابط المجموعة التعليمية"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => setIsVisible(!isVisible)}
                  className="mr-2 rounded border-white/30 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-xs sm:text-sm mr-1 text-white/80">
                  إظهار المجموعة
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={visibleToRegisteredOnly}
                  onChange={() => setVisibleToRegisteredOnly(!visibleToRegisteredOnly)}
                  className="mr-2 rounded border-white/30 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-xs sm:text-sm mr-1 text-white/80">
                  مرئية للمستخدمين المسجلين فقط
                </label>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-500/10 bg-opacity-50 border-t border-white/10 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 border border-white/30 rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              إلغاء
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
            >
              <Save className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsTutorialGroup;