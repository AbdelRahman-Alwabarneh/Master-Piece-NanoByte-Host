import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Link, useNavigate } from "react-router-dom";
import { OctagonX, CircleCheckBig, ChevronDown, ChevronUp, Settings2, ToggleRight, ToggleLeft } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const TutorialManagement = () => {
  const [tutorialGroups, setTutorialGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/tutorialGroup`);
      setTutorialGroups(response.data.AllTutorialGroup);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleIsTutorialHidden = async (id, isHidden) => {
    const actionText = isHidden ? "إظهار" : "إخفاء";
    const successText = isHidden ? "تم إظهار" : "تم إخفاء";
    const confirmText = isHidden ? "هل تريد إظهار" : "هل تريد إخفاء";

    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: `${confirmText} التوريال؟`,
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
        await axios.patch(`${import.meta.env.VITE_API_URL_ADMIN}/api/tutorial/${id}`);
        fetchData();

        Swal.fire({
          title: `${successText}!`,
          text: `تم ${successText} التوريال بنجاح.`,
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
          text: `حدث خطأ أثناء ${actionText} التوريال.`,
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

  const navigate = useNavigate();

  const handleTutorialClick = (tutorialId) => {
    navigate(`/TutorialDetails/${tutorialId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (!tutorialGroups || tutorialGroups.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="flex min-h-screen text-white font-cairo bg-gradient-to-br from-[#1E38A3] to-[#0B1437]">
      <Sidebar />
      <div className="flex-grow p-4 md:p-6 md:mr-64 mr-[75px] overflow-x-hidden">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          الشروحات
        </h1>

        <div className="mb-6 flex justify-end space-x-2 rtl:space-x-reverse">
          <Link
            to="/CreateTutorial"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-200 text-xs sm:text-sm md:text-base"
          >
            + إضافة محتوى تعليمي
          </Link>
          <Link
            to="/CreateTutorialGroup"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-200 text-xs sm:text-sm md:text-base"
          >
            + إضافة مجموعة جديدة
          </Link>
        </div>

        <div className="space-y-6">
      {tutorialGroups.map((group) => (
        <div key={group._id} className="bg-[#1E38A3] rounded-lg shadow-lg overflow-hidden">
          <div
            className="flex justify-between items-center p-5 cursor-pointer bg-opacity-80 hover:bg-opacity-100 transition-all duration-300"
            onClick={() => toggleGroup(group._id)}
          >
             <h2 className="text-sm sm:text-base md:text-sm font-semibold">
                  {group.groupName}
                </h2>
                <div className="flex">
                  <Link to={`/DetailsTutorialGroup/${group._id}`} className="hover:text-[#b0caff]">
                    <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
                  </Link>
                  {group.isVisible ? (
                    <CircleCheckBig className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-green-300" />
                  ) : (
                    <OctagonX className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-red-500" />
                  )}
                  {expandedGroups[group._id] ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
          </div>
          {expandedGroups[group._id] && (
            <div className="p-5 bg-[#2542b7] hover:shadow-blue-800/10 text-white">
                  <p className="mb-4 text-xs sm:text-[13px] whitespace-pre-wrap">{group.description}</p>

              {group.Tutorial.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.Tutorial.map((tutorial) => (
                    <div
                      key={tutorial._id}
                      className="bg-[#1c3289] bg-opacity-50 hover:shadow-blue-300/10 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{new Date(tutorial.createdAt).toLocaleDateString()}</span>
                      </div>
                      <Link to={`/TutorialDetails/${tutorial._id}`}
                        className="text-white font-semibold mt-2 cursor-pointer hover:text-[#9de3ff]"
                        onClick={() => handleTutorialClick(tutorial.Link)}
                      >
                        {tutorial.title}
                      </Link>
                      <div className="mt-4 flex justify-between">
                        <Link to={`/TutorialDetails/${tutorial._id}`} className="text-xs text-[#9de3ff] hover:underline">
                          إقرأ المزيد
                        </Link>
                        <button
                          onClick={() => handleIsTutorialHidden(tutorial._id, tutorial.isHidden)}
                          className={`flex items-center gap-2 px-3 py-1 rounded text-xs transition-colors ${
                            tutorial.isHidden ? 'bg-gray-600/90 hover:bg-gray-600' : 'bg-green-600/90 hover:bg-green-600'
                          }`}
                        >
                          {tutorial.isHidden ? (
                            <>
                              <ToggleLeft className="w-4 h-4" />
                              <span>معطل</span>
                            </>
                          ) : (
                            <>
                              <ToggleRight className="w-4 h-4" />
                              <span>فعال</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 text-sm">هذه المجموعة فارغة</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default TutorialManagement;