import { useState, Suspense, lazy } from "react";
import Cookies from "js-cookie";
import { CreditCard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getDurationText } from "../../../Components/utils/utils";
import useServiceDetails from "../Hook/useServiceDetails";
import PaymentOrderSummary from "./PaymentOrderSummary";
import SectionCreditCard from "./PaymentSection/SectionCreditCard";
import SectionPayPal from "./PaymentSection/SectionPayPal";
import useDiscount from "../Hook/useDiscount";
import handlePayPalApprove from "../Hook/handlePayPalApprove";
import Loading from "../../../Components/Loading/Loading";
import PlanChecker from "../../../Components/OutOfStockAlert/OutOfStockAlert";
const ServiceFetchErrorAlert = lazy(() => import("../../../Components/ServiceFetchErrorAlert/ServiceFetchErrorAlert"));

function ContentPayment() {
  const Service_Id = Cookies.get("Service_Id");
  const Subscription_Duration = Cookies.get("Subscription_Duration");
  const Discount_Code = Cookies.get("Discount_Code");
  const Service_Type = Cookies.get("Service_Type");
  const Product_Link = Cookies.get("Product_Link");
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [paymentError, setPaymentError] = useState("");
  const { serviceDetails, fetchError } = useServiceDetails({
    serviceType: Service_Type,
    productLink: Product_Link,
    duration: Subscription_Duration,
  });
  const { totalPrice, discountInfo, isLoadingDiscount } = useDiscount(
    Discount_Code,
    serviceDetails,
    Service_Id,
    Subscription_Duration,
    setPaymentError
  );
  if (fetchError) {
    return <Suspense fallback={<Loading />}><ServiceFetchErrorAlert hasError={fetchError} redirectTo="/" /></Suspense>;
  }
  
  if (!serviceDetails || isLoadingDiscount) {
    return <Loading />;
  }
  const serviceMap = {
    vpsDetails: {
      SelectedComponent: `استضافة خوادم مشتركة - ${serviceDetails.planName}`,
      SelectedServiceType: "VPS",
      redirectTo: "/VpsServer",

    },
    dedicatedServerDetails: {
      SelectedComponent: serviceDetails.planTitle,
      SelectedServiceType: "DedicatedServer",
      redirectTo: "/DedicatedServer",
    },
    GameHosting: {
      SelectedComponent: serviceDetails.planName,
      SelectedServiceType: "GameHosting",
      redirectTo: "/GameHostingPage",
    },
  };
  const {
    SelectedComponent,
    SelectedServiceType,
    redirectTo
  } = serviceMap[Service_Type] || {
    SelectedComponent: null,
    SelectedServiceType: null,
    redirectTo: "/",
  };
  const DurationText = getDurationText(Subscription_Duration);
  const price =
    serviceDetails.subscriptionDurations[Subscription_Duration].price;
    const setupFee = serviceDetails.setupFee;
    const appliedDiscount = discountInfo?.discountValue ?? null;

  const onPayPalApprove = handlePayPalApprove(
    SelectedComponent,
    Service_Id,
    DurationText,
    Discount_Code,
    Service_Type,
    totalPrice,
    Product_Link,
    SelectedServiceType,
    price,
    setupFee,
    appliedDiscount,
    setPaymentError,
    navigate
  );
  return (
    <>
      <div className="min-h-screen bg-nano-bg-100 mt-[72px] text-nano-text-100 p-4 md:p-8 font-cairo">
      <PlanChecker Product_Link={Product_Link} Service_Type={Service_Type} redirectTo={redirectTo}/>
        <AnimatePresence>
          <motion.h1
            key="payment-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl font-bold mb-8 text-center text-nano-text-100"
          >
            الدفع
          </motion.h1>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-2/3 px-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-nano-bg-additional-200 rounded-lg p-6 shadow-lg"
              >
                <h2 className="text-2xl font-semibold mb-4 border-b border-nano-border-100 pb-2 text-nano-text-200">
                  معلومات الدفع
                </h2>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <label
                      htmlFor="paymentMethod"
                      className="block mb-2 font-semibold text-nano-text-200"
                    >
                      طريقة الدفع:
                    </label>
                    <div className="relative">
                      <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="block w-full bg-nano-bg-additional-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-nano-primary-300 text-nano-text-100"
                      >
                        <option value="credit-card">بطاقة الائتمان</option>
                        <option value="paypal">PayPal</option>
                      </select>
                      <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nano-text-300 w-4 h-4 pointer-events-none" />
                    </div>
                  </motion.div>
                  {paymentMethod === "credit-card" && (
                    <SectionCreditCard
                      CreditCard={CreditCard}
                      motion={motion}
                    />
                  )}
                  {paymentMethod === "paypal" && (
                    <SectionPayPal motion={motion} />
                  )}
                </form>
              </motion.div>
            </div>
            <PaymentOrderSummary
              totalPrice={totalPrice}
              discountInfo={discountInfo}
              paymentError={paymentError}
              setPaymentError={setPaymentError}
              serviceDetails={serviceDetails}
              paymentMethod={paymentMethod}
              onPayPalApprove={onPayPalApprove}
              price={price}
              SelectedComponent={SelectedComponent}
              DurationText={DurationText}
              motion={motion}
              Product_Link={Product_Link}
              Service_Type={Service_Type}
            />
          </div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default ContentPayment;
