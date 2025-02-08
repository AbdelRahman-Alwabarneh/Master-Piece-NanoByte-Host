import React, { useState, useEffect } from "react";
import axios from "axios";
import PlanCard from "./PlanCard";
import Loading from "../../../../Components/Loading/Loading";
const AllDedicatedServer = ({motion, AnimatePresence}) => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dedicatedServerPlans`
        );
        setPlans(data.DedicatedServerDataPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const rows = [];
  for (let i = 0; i < plans.length; i += 3) rows.push(plans.slice(i, i + 3));

  if (isLoading) {
    return <Loading />;
  }
  if (!plans.length)
    return (
      <div className="text-center text-nano-text-200 py-10">
        لا توجد خطط متاحة حاليًا
      </div>
    );

  return rows.map((row, rowIndex) => (
    <AnimatePresence key={rowIndex}>
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col md:flex-row sm:gap-6 w-full justify-center"
    >
      {row.map((plan) => (
        <PlanCard
          key={plan._id}
          plan={plan}
          isFullWidth={plans.length === 1}
        />
      ))}
    </motion.div>
    </AnimatePresence>
  ));
};

export default AllDedicatedServer;
