import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Link,useNavigate } from "react-router-dom";
import { OctagonX,CircleCheckBig, Eye, Trash, ChevronDown, ChevronUp ,Settings2 } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { HiddenVPSPlan} from "../../Redux/Slice/VPSManagementSlice";
import { useDispatch, useSelector } from "react-redux";

const VPSManagement = () => {
  const [vpsGroups, setVPSGroups] = useState([]);
  const [vpsPlans, setVPSPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [groupsResponse, plansResponse] = await Promise.all([
        axios.get("http://localhost:2100/api/vpsGroup"),
        axios.get("http://localhost:2100/api/vpsManagement")
      ]);
      setVPSGroups(groupsResponse.data.AllvpsGroup);
      setVPSPlans(plansResponse.data.VPSPlanData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleIsHiddenPlan = async (id, isHidden) => {
    const actionText = isHidden ? "إظهار" : "إخفاء";
    const successText = isHidden ? "تم إظهار" : "تم إخفاء";
    const confirmText = isHidden ? "هل تريد إظهار" : "هل تريد إخفاء";
  
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: `${confirmText} خطة الـ VPS؟`,
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
        dispatch(HiddenVPSPlan(id))
        
        setVPSPlans(plans =>
          plans.map(plan =>
            plan._id === id ? { ...plan, isHidden: !isHidden } : plan
          )
        );

        Swal.fire({
          title: `${successText}!`,
          text: `تم ${successText} خطة الـ VPS بنجاح.`,
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
          text: `حدث خطأ أثناء ${actionText} الخطة.`,
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

  const handleVPSClick = (vpsId) => {
    navigate(`/VPSDetailsManagement/${vpsId}`);
  };
  if (loading) {
    return <Loading />;
  }

  if (!vpsGroups || vpsGroups.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="flex min-h-screen text-white font-cairo bg-gradient-to-br from-[#1E38A3] to-[#0B1437]">
      <Sidebar />
      <div className="flex-grow p-4 md:p-6 md:mr-64 mr-[75px] overflow-x-hidden">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          مجموعات خطط الـ VPS
        </h1>
  
        <div className="mb-6 flex justify-end space-x-2 rtl:space-x-reverse">
          <Link
            to="/addVPSPlan"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-200 text-xs sm:text-sm md:text-base"
          >
            + إضافة خطة جديدة
          </Link>
          <Link
            to="/CreateGroup"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-200 text-xs sm:text-sm md:text-base"
          >
            + إضافة مجموعة جديدة
          </Link>
        </div>
  
        <div className="space-y-6">
          {vpsGroups.map((group) => (
            <div key={group._id} className="bg-[#2f64bb] rounded-lg shadow-xl overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-opacity-80 hover:bg-opacity-100 transition-all duration-300"
                onClick={() => toggleGroup(group._id)}
              >
                <h2 className="text-sm sm:text-base md:text-sm font-semibold">
                  {group.groupName}
                </h2>
                <div className="flex">
                  
                  <Link to={`/DetailsVPSGroup/${group._id}`} className="hover:text-[#b0caff]">
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
                <div className="p-4 bg-[#1E38A3] bg-opacity-50">
                  <p className="mb-4 text-xs sm:text-[13px] whitespace-pre-wrap">{group.description}</p>
                  {group.plans.length > 0 ? (
                    <>
                      {/* Table view for large screens */}
                      <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm text-left">
                          <thead className="text-[10px] sm:text-xs uppercase bg-[#2f64bb] bg-opacity-50 text-center">
                            <tr>
                              <th className="px-4 py-3">اسم الخطة</th>
                              <th className="px-4 py-3">الذاكرة</th>
                              <th className="px-4 py-3">الأنوية</th>
                              <th className="px-4 py-3">التخزين</th>
                              <th className="px-4 py-3">سرعة الاتصال</th>
                              <th className="px-4 py-3">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vpsPlans
                              .filter((plan) => group.plans.includes(plan._id))
                              .map((plan) => (
                                <tr
                                  key={plan._id}
                                  className="bg-[#2f64bb] text-center bg-opacity-30 border-b border-[#3B82F6] hover:bg-opacity-50 transition-colors duration-200"
                                >
                                  <td
                                    className="px-4 py-3 cursor-pointer hover:text-[#9de3ff]"
                                    onClick={() => handleVPSClick(plan._id)}
                                  >
                                    {plan.planName}
                                  </td>
                                  <td className="px-4 py-3">{plan.ram}</td>
                                  <td className="px-4 py-3">{plan.cpu}</td>
                                  <td className="px-4 py-3">{plan.storage}</td>
                                  <td className="px-4 py-3">{plan.connectionSpeed}</td>
                                  <td className="px-4 py-3 flex items-center justify-center">
                                    <button
                                      onClick={() =>
                                        handleIsHiddenPlan(plan._id, plan.isHidden)
                                      }
                                      className={`flex items-center justify-center space-x-1 p-2 text-white rounded-md transition duration-300 ${
                                        plan.isHidden
                                          ? "bg-green-500 hover:bg-green-600"
                                          : "bg-red-500 hover:bg-red-600"
                                      }`}
                                    >
                                      {plan.isHidden ? (
                                        <>
                                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                          <span className="text-[10px] sm:text-xs">استرجاع</span>
                                        </>
                                      ) : (
                                        <>
                                          <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                                          <span className="text-[10px] sm:text-xs">حذف</span>
                                        </>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
  
                      {/* Card view for small screens */}
                      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {vpsPlans
                          .filter((plan) => group.plans.includes(plan._id))
                          .map((plan) => (
                            <div
                              key={plan._id}
                              className="bg-[#2f64bb] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              <h3
                                className="font-semibold mb-2 text-center cursor-pointer hover:text-[#9de3ff] text-sm"
                                onClick={() => handleVPSClick(plan._id)}
                              >
                                {plan.planName}
                              </h3>
                              <div className="text-xs sm:text-sm space-y-1">
                                <p>الذاكرة: {plan.ram}</p>
                                <p>الأنوية: {plan.cpu}</p>
                                <p>التخزين: {plan.storage}</p>
                                <p>سرعة الاتصال: {plan.connectionSpeed}</p>
                              </div>
                              <button
                                onClick={() =>
                                  handleIsHiddenPlan(plan._id, plan.isHidden)
                                }
                                className={`mt-3 w-full flex items-center justify-center space-x-1 p-2 text-white rounded-md transition duration-300 ${
                                  plan.isHidden
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-red-500 hover:bg-red-600"
                                }`}
                              >
                                {plan.isHidden ? (
                                  <>
                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="text-[10px] sm:text-xs">استرجاع</span>
                                  </>
                                ) : (
                                  <>
                                    <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="text-[10px] sm:text-xs">حذف</span>
                                  </>
                                )}
                              </button>
                            </div>
                          ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-white text-sm">هذه المجموعة فارغة</p>
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

export default VPSManagement;