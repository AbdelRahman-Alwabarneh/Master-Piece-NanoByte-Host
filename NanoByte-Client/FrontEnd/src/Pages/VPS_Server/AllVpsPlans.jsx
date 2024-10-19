import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import ButtonVps from "./Button";
import FeaturesOfOurServices1 from "./FeaturesOfOurServices1";
import FeaturesOfOurServices2 from "./FeaturesOfOurServices2";
import { useNavigate } from "react-router-dom";
const VpsGroupsAndPlans = () => {
  const [groupsData, setGroupsData] = useState([]);
  const [plansData, setPlansData] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupsResponse = await axios.get(
          import.meta.env.VITE_USER_VPS_GROUP,
          { withCredentials: true }
        );
        const plansResponse = await axios.get(
          import.meta.env.VITE_USER_VPS_PLANS,
          { withCredentials: true }
        );

        setGroupsData(groupsResponse.data.vpsGroupsData);
        setPlansData(plansResponse.data.vpsDataPlans);
        const initialExpandedState = groupsResponse.data.vpsGroupsData.reduce(
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
    return plansData.filter((plan) => groupPlans.includes(plan._id));
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };
  const goToDetails = (productLink) => {
    navigate(`/VPSDetails/${productLink}`)
  };

  return (
    <>
      <title>خوادم مشتركة - NanoByte</title>
      <div className="font-cairo [direction:rtl] max-w-7xl mx-auto mt-[100px] mb-16">
        <h2 className="text-4xl font-bold text-center text-white mb-4 p-4 rounded-md">
          إستضافة خوادم مشتركة (VPS)
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
                  <div className="overflow-x-auto">
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
                              className="px-6 py-4 font-medium whitespace-nowrap"
                            >
                              {plan.planName}
                            </th>
                            <td className="px-6 py-4">{plan.ram}</td>
                            <td className="px-6 py-4">{plan.cpu}</td>
                            <td className="px-6 py-4">{plan.storage}</td>
                            <td className="px-6 py-4">
                              {plan.connectionSpeed}
                            </td>
                            <td className="px-6 py-4">{plan.security}</td>
                            <td className="px-6 py-4">
                              ${plan.subscriptionDurations.oneMonth.price} USD
                            </td>
                            <td className="px-6 py-4">
                              <span onClick={() => goToDetails(plan.planName)}>
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
        <FeaturesOfOurServices2 />
      </div>
    </>
  );
};

export default VpsGroupsAndPlans;
