import ButtonDedicatedServer from "../Button";
import { useNavigate } from "react-router-dom";

function PlanCard({ plan, isFullWidth = false }) {
  const navigate = useNavigate();
  const goToDetails = (productLink) =>
    navigate(`/DedicatedDetails/${productLink}`);

  return (
    <>
      <div
        className={`relative overflow-hidden flex flex-col p-4 sm:p-6 text-center mt-6 text-white bg-nano-bg-additional-400 rounded-xl border border-nano-primary-300/20 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10 ${
          isFullWidth ? "w-full" : "md:flex-1"
        }`}
      >
        <h3 className="mb-2 sm:mb-3 text-lg sm:text-2xl lg:text-3xl font-bold text-nano-text-100">
          {plan.planTitle}
        </h3>
        {!plan.isUnlimited && (
          <div
            className={`absolute -top-[0.75rem]  ${
              plan.quantity < 10
                ? "-right-[2.2rem] -top-4"
                : plan.quantity < 100
                ? "-right-[2.5rem]"
                : "-right-12"
            } transform -translate-x-1/2 rounded bg-gradient-to-r text-white text-xs px-2 py-1 shadow-lg font-bold rotate-45 origin-bottom-left max-w-full overflow-hidden`}
            style={{
              backgroundImage: "linear-gradient(90deg, #577CB2, #3D5A80)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              borderBottom: "2px solid #142f60",
            }}
          >
            متبقي {plan.quantity}
          </div>
        )}
        <p className="font-light px-2 sm:px-4 lg:px-10 text-nano-text-200 text-xs sm:text-sm lg:text-lg mb-3 sm:mb-4">
          {plan.secondaryTitle}
        </p>
        <div className="flex flex-col justify-center  items-center my-2 sm:my-4">
          <span className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-nano-text-100">
            ${plan.subscriptionDurations?.oneMonth?.price?.toFixed(2) || "N/A"}{" "}
            USD
          </span>
          <span className="text-nano-text-200 text-xs sm:text-base">شهري</span>
        </div>
        <ul className="mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-center text-nano-text-200">
          {plan.planDescription?.split("\n").map((desc, idx) => (
            <li
              key={idx}
              className="flex items-center justify-center text-center text-xs sm:text-sm lg:text-base"
            >
              {desc}
            </li>
          ))}
        </ul>
        <ButtonDedicatedServer
          onClick={() =>
            !plan.isUnlimited && plan.quantity == 0
              ? null
              : goToDetails(plan.productLink)
          }
          quantity={plan.quantity}
          isUnlimited={plan.isUnlimited}
        />
      </div>
    </>
  );
}

export default PlanCard;
