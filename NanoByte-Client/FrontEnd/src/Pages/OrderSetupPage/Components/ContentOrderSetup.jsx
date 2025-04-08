import React, { useState, useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useServiceDetails from "./useServiceDetails";
import { getDurationText } from "../../../Components/utils/utils";
import Loading from "../../../Components/Loading/Loading";
import PromoCode from "./PromoCode";
import SubscriptionDuration from "./SubscriptionDuration";
import OrderSummary from "./OrderSummary";
import PlanChecker from "../../../Components/OutOfStockAlert/OutOfStockAlert";
const ServiceFetchErrorAlert = lazy(() => import("../../../Components/ServiceFetchErrorAlert/ServiceFetchErrorAlert"));
const VPSDetails = lazy(() => import("./ServiceDetails/VPSDetails"));
const DedicatedOrderDetails = lazy(() =>
import("./ServiceDetails/DedicatedServerDetails")
);
const GameHosting = lazy(() => import("./ServiceDetails/GameHosting"));
const ContentOrderSetup = () => {
  const location = useLocation();
  const serviceType = location.pathname.split("/")[2];
  const { serviceDetails, totalPrice, setTotalPrice, fetchError } =
    useServiceDetails(serviceType);
  const [selectedDuration, setSelectedDuration] = useState("oneMonth");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState(null);

  useEffect(() => {
    if (serviceDetails) {
      const newPrice =
        serviceDetails.subscriptionDurations[selectedDuration].price;
      setTotalPrice(newPrice);
    }
  }, [selectedDuration, serviceDetails, setTotalPrice]);

  const componentMap = {
    vpsDetails: {
      component: (
        <VPSDetails
          serviceDetails={serviceDetails}
          motion={motion}
          AnimatePresence={AnimatePresence}
        />
      ),
      redirectTo: "/VpsServer",
    },
    dedicatedServerDetails: {
      component: (
        <DedicatedOrderDetails
          serviceDetails={serviceDetails}
          motion={motion}
          AnimatePresence={AnimatePresence}
        />
      ),
      redirectTo: "/DedicatedServer",
    },
    GameHosting: {
      component: (
        <GameHosting
          serviceDetails={serviceDetails}
          motion={motion}
          AnimatePresence={AnimatePresence}
        />
      ),
      redirectTo: "/GameHostingPage",
    },
  };
  
  const selectedConfig = componentMap[serviceType] || {};
  const SelectedComponent = selectedConfig.component || null;
  const SelectedredirectTo = selectedConfig.redirectTo || null;

  if(fetchError){   
    return <Suspense fallback={<Loading />}><ServiceFetchErrorAlert hasError={fetchError} redirectTo={SelectedredirectTo} /></Suspense>
  }

  if (!serviceDetails && !fetchError) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen bg-nano-bg-100 mt-[72px] text-white p-4 md:p-8 font-cairo text-right text-sm">
        <PlanChecker Product_Link={serviceDetails.productLink} Service_Type={serviceType} redirectTo={SelectedredirectTo}/>
        <AnimatePresence>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl font-bold mb-8 text-center"
          >
            إعداد الطلب
          </motion.h1>
        </AnimatePresence>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8 order-2 lg:order-1">
            <div className="space-y-6">
              <Suspense fallback={<Loading />}>{SelectedComponent}</Suspense>
              <SubscriptionDuration
                serviceDetails={serviceDetails}
                setSelectedDuration={setSelectedDuration}
                getDurationText={getDurationText}
                motion={motion}
                AnimatePresence={AnimatePresence}
              />
              <PromoCode
                serviceId={serviceDetails._id}
                setupFee={serviceDetails.setupFee}
                totalPrice={totalPrice}
                onDiscountChange={({ amount, code }) => {
                  setDiscountAmount(amount);
                  setDiscountCode(code);
                }}
                motion={motion}
                AnimatePresence={AnimatePresence}
              />
            </div>
          </div>
          <OrderSummary
            serviceDetails={serviceDetails}
            totalPrice={totalPrice}
            discountCode={discountCode}
            discountAmount={discountAmount}
            selectedDuration={selectedDuration}
            serviceType={serviceType}
            getDurationText={getDurationText}
            motion={motion}
            AnimatePresence={AnimatePresence}
          />
        </div>
      </div>
    </>
  );
};

export default ContentOrderSetup;
