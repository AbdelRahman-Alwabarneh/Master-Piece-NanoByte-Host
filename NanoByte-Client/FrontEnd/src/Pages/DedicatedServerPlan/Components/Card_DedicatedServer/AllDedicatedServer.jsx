import React, { useState, useEffect } from "react";
import axios from "axios";
import PlanCard from "./PlanCard";
import Loading from "../../../../Components/Loading/Loading";
const AllDedicatedServer = () => {
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
    <div
      key={rowIndex}
      className="flex flex-col md:flex-row sm:gap-6 w-full justify-center"
    >
      {row.map((plan) => (
        <PlanCard
          key={plan._id}
          plan={plan}
          isFullWidth={plans.length === 1}
        />
      ))}
    </div>
  ));
};

export default AllDedicatedServer;
