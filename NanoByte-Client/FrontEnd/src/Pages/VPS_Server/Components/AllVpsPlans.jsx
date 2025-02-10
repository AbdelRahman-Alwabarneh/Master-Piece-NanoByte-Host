import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonVps from "./Button";
import { ChevronDown, ChevronUp } from "lucide-react";

const VpsGroupsAndPlans = ({ motion, AnimatePresence }) => {
  const [groupsData, setGroupsData] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/vpsGroup`,
          { withCredentials: true }
        );
        setGroupsData(groupsResponse.data.vpsGroupsData);
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

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const goToDetails = (productLink) => {
    navigate(`/VPSDetails/${productLink}`);
  };

  return (
    <>
      <div className="font-cairo max-w-[1400px] mx-auto mb-16">
        <AnimatePresence>
          {groupsData.map((group) => (
            <div
              key={group._id}
              className="mb-10 bg-nano-bg-additional-200 rounded-2xl overflow-hidden shadow-2xl border border-nano-primary-300/20 transition-all duration-300 shadow-nano-primary-300/20 hover:shadow-nano-primary-200/30 hover:shadow-xl"
            >
              {/* Group Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-6 cursor-pointer flex justify-between items-center bg-gradient-to-r from-nano-bg-additional-300 to-nano-bg-additional-400 border-b border-nano-primary-300/20"
                onClick={() => toggleGroup(group._id)}
                style={{ userSelect: "none" }}
              >
                <h3 className="text-xl font-bold text-white">
                  {group.groupName}
                </h3>
                <ChevronDown
                  className={`text-white w-6 h-6 transition-transform duration-300 ${
                    expandedGroups[group._id] ? "rotate-180" : ""
                  }`}
                />
              </motion.div>

              {/* Group Content */}
              <AnimatePresence>
                {expandedGroups[group._id] && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="p-4"
                  >
                    {group.plans.length === 0 ? (
                      <p className="text-white text-lg p-4 text-center">
                        هذه المجموعة فارغة
                      </p>
                    ) : (
                      <div className="overflow-x-auto relative rounded-xl">
                        <table className="w-full text-base text-right">
                          {/* Table Header */}
                          <thead className="text-sm uppercase bg-nano-bg-additional-600 text-nano-text-100">
                            <tr>
                              {[
                                "اسم الخطة",
                                "الذاكرة",
                                "المعالج",
                                "التخزين",
                                "سرعة الاتصال",
                                "الحماية",
                                "السعر الشهري",
                                "طلب",
                              ].map((header) => (
                                <th
                                  key={header}
                                  scope="col"
                                  className="px-8 py-5 text-center font-bold"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          {/* Table Body */}
                          <tbody>
                            {group.plans.map((plan, index) => (
                              <tr
                                key={plan._id}
                                className={`text-center border-b border-nano-primary-300/10 text-white transition-colors duration-200 hover:bg-nano-hover-200 
                            ${
                              index % 2 === 0
                                ? "bg-nano-bg-additional-400/50"
                                : "bg-nano-bg-additional-300/50"
                            }`}
                              >
                                {/* Plan Name Cell */}
                                <th
                                  scope="row"
                                  className="px-8 py-6 font-medium whitespace-nowrap relative"
                                >
                                  <div className="text-lg font-bold text-nano-text-100">
                                    {plan.planName}
                                  </div>
                                  {!plan.isUnlimited && (
                                    <div
                                      className={`absolute -top-[0.55rem] ${
                                        plan.quantity < 10
                                          ? "-right-9 -top-4"
                                          : plan.quantity < 100
                                          ? "-right-[2.5rem]"
                                          : "-right-12"
                                      } transform -translate-x-1/2 rounded bg-gradient-to-r text-white text-xs px-2 py-1 shadow-lg font-bold rotate-45 origin-bottom-left max-w-full overflow-hidden`}
                                      style={{
                                        backgroundImage:
                                          "linear-gradient(90deg, #577CB2, #3D5A80)",
                                        boxShadow:
                                          "0 4px 6px rgba(0, 0, 0, 0.3)",
                                        borderBottom: "2px solid #142f60",
                                      }}
                                    >
                                      متبقي {plan.quantity}
                                    </div>
                                  )}
                                </th>
                                {/* Resource Cells */}
                                {[
                                  plan.ram,
                                  plan.cpu,
                                  plan.storage,
                                  plan.connectionSpeed,
                                  plan.security,
                                ].map((value, i) => (
                                  <td
                                    key={i}
                                    title={`${plan.planName}`}
                                    className="px-8 py-6 text-nano-text-200"
                                  >
                                    {value}
                                  </td>
                                ))}
                                {/* Price Cell */}
                                <td className="px-8 py-6">
                                  <span className="text-nano-text-100 font-bold ">
                                    ${plan.subscriptionDurations.oneMonth.price}{" "}
                                    USD
                                  </span>
                                </td>
                                {/* Action Button Cell */}
                                <td className="px-8 py-6">
                                  <div
                                    className={`transform transition-transform duration-200 
                              ${
                                !plan.isUnlimited && plan.quantity === 0
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer hover:scale-105"
                              }`}
                                    onClick={() =>
                                      !plan.isUnlimited && plan.quantity === 0
                                        ? null
                                        : goToDetails(plan.planName)
                                    }
                                  >
                                    <ButtonVps
                                      isUnlimited={
                                        !plan.isUnlimited && plan.quantity === 0
                                          ? false
                                          : true
                                      }
                                      quantity={plan.quantity}
                                    />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default VpsGroupsAndPlans;
