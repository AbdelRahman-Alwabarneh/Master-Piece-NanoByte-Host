import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonDedicatedServer from "./Button";
function AllDedicatedServer() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dedicatedServerPlans`
        );
        setPlans(response.data.DedicatedServerDataPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const goToDetails = (productLink) => {
    navigate(`/DedicatedDetails/${productLink}`);
  };

  const renderPlans = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => renderPlanCard(plan, index, plans.length))}
      </div>
    );
  };

  const renderPlanCard = (plan, index, totalPlans) => {
    const DefaultCard = (index + 1) % 3 === 1;  // For example, index 1, 4, 7, etc.
    const isHighlightedCard = (index + 1) % 3 === 2;      // For example, index 2, 5, 8, etc.
    return (
      <div
        key={plan._id}
        className={`flex flex-col p-6 mx-auto w-full text-center text-white bg-nano-bg-additional-400 rounded-lg border border-nano-primary-300/20 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10 ${isHighlightedCard && "scale-[1.03] hover:scale-[1.04]"}`}
      >
        <h3 className="mb-3 text-xl sm:text-2xl lg:text-3xl font-bold text-nano-text-100">
          {plan.planTitle}
        </h3>
        <p className="font-light px-2 sm:px-4 lg:px-10 text-nano-text-200 text-sm lg:text-lg mb-4">
          {plan.secondaryTitle}
        </p>
        <div className="flex justify-center items-baseline my-4">
          <span className="mr-2 text-xl sm:text-2xl lg:text-3xl font-extrabold text-nano-text-100">
            ${plan.subscriptionDurations.oneMonth.price.toFixed(2)} USD
          </span>
          <span className="text-nano-text-200">/شهري</span>
        </div>
        <ul className="mb-4 space-y-2 text-left text-nano-text-200">
          {plan.planDescription.split("\n").map((desc, idx) => (
            <li
              key={idx}
              className="flex items-center justify-center text-center space-x-3 text-xs sm:text-sm lg:text-base"
            >
              <span>{desc}</span>
            </li>
          ))}
        </ul>
          <ButtonDedicatedServer 
          onClick={() => goToDetails(plan.productLink)}
          />
      </div>
    );
  };
  return <>{renderPlans()}</>;
}

export default AllDedicatedServer;
