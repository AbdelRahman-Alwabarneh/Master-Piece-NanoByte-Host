import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import ButtonVps from "./Button";
import FeaturesOfOurServices1 from "./FeaturesOfOurServices1";
import { useNavigate } from "react-router-dom";

const GameHostingGroupsAndPlans = () => {
  const [groupsData, setGroupsData] = useState([]);
  const [plansData, setPlansData] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/GroupGameHosting`,
          { withCredentials: true }
        );
        const plansResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/GameHosting`,
          { withCredentials: true }
        );

        setGroupsData(groupsResponse.data.groupsData);
        setPlansData(plansResponse.data.gameServer);
        const initialExpandedState = groupsResponse.data.groupsData.reduce(
          (acc, group) => {
            acc[group._id] = true;
            return acc;
          },
          {}
        );
        setExpandedGroups(initialExpandedState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getPlansForGroup = (groupPlans) => {
    return plansData.filter((plan) => 
      groupPlans.some(groupPlan => groupPlan._id === plan._id)
    );
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const goToDetails = (productLink) => {
    navigate(`/GameServerDetails/${productLink}`);
  };

  return (
    <>
      <title>خوادم الألعاب - NanoByte</title>
      <div className="font-cairo [direction:rtl] max-w-7xl mx-auto mt-[100px] mb-16">
        <h2 className="text-4xl font-bold text-center text-white mb-4 p-4 rounded-md">
          إستضافة خوادم الألعاب
        </h2>
        <p className="text-xl text-white text-center mb-12">
          كن مستعدا للانطلاق مع نانوبايت هوست
        </p>
        {groupsData.map((group) => (
          <div
            key={group._id}
            className="mb-8 bg-[#1b4976] rounded-lg overflow-hidden shadow-xl"
          >
            <div
              className="p-4 cursor-pointer flex justify-between items-center bg-[#235a92]"
              onClick={() => toggleGroup(group._id)}
            >
              <h3 className="text-sm font-bold text-white">
                {group.groupName}
              </h3>
              {expandedGroups[group._id] ? (
                <ChevronUp className="text-white" />
              ) : (
                <ChevronDown className="text-white" />
              )}
            </div>
            {expandedGroups[group._id] && (
              <div className="p-2">
                {group.plans.length === 0 ? (
                  <p className="text-white">هذه المجموعة فارغة</p>
                ) : (
                  <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-right text-gray-200">
                      <thead className="text-xs text-center uppercase bg-[#194f86] text-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            اسم الخطة
                          </th>
                          <th scope="col" className="px-6 py-3">
                            الذاكرة
                          </th>
                          <th scope="col" className="px-6 py-3">
                            المعالج
                          </th>
                          <th scope="col" className="px-6 py-3">
                            التخزين
                          </th>
                          <th scope="col" className="px-6 py-3">
                            سرعة الاتصال
                          </th>
                          <th scope="col" className="px-6 py-3">
                            الحماية
                          </th>
                          <th scope="col" className="px-6 py-3">
                            قواعد البيانات
                          </th>
                          <th scope="col" className="px-6 py-3">
                            السعر الشهري
                          </th>
                          <th scope="col" className="px-6 py-3">
                            طلب
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPlansForGroup(group.plans).map((plan, index) => (
                          <tr
                            key={plan._id}
                            className={`text-center border-b border-[#003366] text-white hover:bg-[#174776] ${
                              index % 2 === 0 ? "bg-[#235a92]" : "bg-[#194f86]"
                            }`}
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium whitespace-nowrap relative overflow-hidden"
                            >
                              {plan.planName}
                              {!plan.isUnlimited && (
                                <div
                                  className={`absolute -top-5 ${
                                    plan.quantity < 10
                                      ? "-right-10 -top-4"
                                      : plan.quantity < 100
                                      ? "-right-12"
                                      : "-right-14"
                                  } transform -translate-x-1/2 rounded bg-gradient-to-r from-blue-900 to-blue-700 text-white text-xs px-2 py-1 shadow-lg font-bold rotate-45 origin-bottom-left max-w-full overflow-hidden`}
                                  style={{
                                    backgroundImage: "linear-gradient(to right, #194f86, #1e3a8a)",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                                    borderBottom: "2px solid #142f60",
                                  }}
                                >
                                  متبقي {plan.quantity}
                                </div>
                              )}
                            </th>
                            <td className="px-6 py-4">{plan.ram}</td>
                            <td className="px-6 py-4">{plan.cpu}</td>
                            <td className="px-6 py-4">{plan.storage}</td>
                            <td className="px-6 py-4">{plan.connectionSpeed}</td>
                            <td className="px-6 py-4">{plan.security}</td>
                            <td className="px-6 py-4">{plan.databases}</td>
                            <td className="px-6 py-4">
                              ${plan.subscriptionDurations.oneMonth.price} USD
                            </td>
                            <td className="px-6 py-4">
                              <span
                                onClick={() =>
                                  !plan.isUnlimited && plan.quantity === 0
                                    ? null
                                    : goToDetails(plan.productLink)
                                }
                                className={
                                  !plan.isUnlimited && plan.quantity === 0
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                }
                              >
                                <ButtonVps />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <FeaturesOfOurServices1 />
     
      </div>
    </>
  );
};

export default GameHostingGroupsAndPlans;