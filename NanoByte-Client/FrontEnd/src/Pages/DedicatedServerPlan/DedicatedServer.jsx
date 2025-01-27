import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import FeaturesOfOurServices1 from "./FeaturesOfOurServices3";
import FeaturesOfOurServices2 from "./FeaturesOfOurServices4";
import { Link } from "react-router-dom";

function DedicatedServer() {
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

  const renderPlans = () => {
    const topRowPlans = plans.slice(0, 3);
    const bottomRowPlans = plans.slice(3);

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {topRowPlans.map((plan, index) =>
            renderPlanCard(plan, index, topRowPlans.length)
          )}
        </div>
        {bottomRowPlans.length > 0 && (
          <div className="grid grid-cols-1 gap-6 mb-6">
            {bottomRowPlans.map((plan, index) =>
              renderPlanCard(plan, index + 3, plans.length, true)
            )}
          </div>
        )}
      </>
    );
  };

  const renderPlanCard = (plan, index, totalPlans, isBottomRow = false) => {
    const isMiddle = totalPlans >= 3 && index === 1 && !isBottomRow;
    const isLast = index === totalPlans - 1 && isBottomRow;

    return (
      <div
        key={plan._id}
        className={`flex flex-col p-6 mx-auto w-full text-center text-white bg-[#276baf] rounded-lg border border-[#1d3585] shadow-lg transition-all duration-300 
          ${
            isMiddle
              ? "sm:scale-100 lg:scale-105 hover:scale-110"
              : isLast
              ? "col-span-full max-w-full hover:scale-105"
              : "hover:scale-105"
          } hover:shadow-2xl hover:z-10`}
      >
        <h3 className="mb-3 text-xl sm:text-2xl lg:text-3xl font-bold">
          {plan.planTitle}
        </h3>
        <p className="font-light px-2 sm:px-4 lg:px-10 text-white text-sm lg:text-lg mb-4">
          {plan.secondaryTitle}
        </p>
        <div className="flex justify-center items-baseline my-4">
          <span className="mr-2 text-xl sm:text-2xl lg:text-3xl font-extrabold">
            ${plan.subscriptionDurations.oneMonth.price.toFixed(2)} USD
          </span>
          <span className="text-white">/شهري</span>
        </div>
        <ul className="mb-4 space-y-2 text-left text-gray-300">
          {plan.planDescription.split("\n").map((desc, idx) => (
            <li
              key={idx}
              className="flex items-center justify-center text-center space-x-3 text-xs sm:text-sm lg:text-base"
            >
              <span>{desc}</span>
            </li>
          ))}
        </ul>
        <Link
          to={`/DedicatedDetails/${plan.productLink}`}
          className="mt-auto text-white bg-[#214d90] hover:bg-[#31458a] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center transition-colors duration-300"
        >
          أطلب الأن
        </Link>
      </div>
    );
  };

  return (
    <>
      <title>الخوادم المركزية - NanoByte</title>
      <Header />
      <section className="font-cairo mt-[72px]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-5 text-2xl sm:text-3xl lg:text-4xl tracking-tight font-extrabold text-white">
              ( Dedicated ) إستضافة خوادم مركزية
            </h2>
            <p className="mb-5 font-light text-white text-sm sm:text-base lg:text-xl">
              .استعد لتجربة استثنائية ومتميزة مع نانوبايت هوست
              <br />
              .نقدم لك خدماتنا عالية الجودة لتلبية احتياجاتك بكفاءة واحترافية
            </p>
          </div>
          <div className="[direction:rtl]">{renderPlans()}</div>
        </div>
      </section>
      <FeaturesOfOurServices1 />
      <FeaturesOfOurServices2 />
      <Footer />
    </>
  );
}

export default DedicatedServer;
