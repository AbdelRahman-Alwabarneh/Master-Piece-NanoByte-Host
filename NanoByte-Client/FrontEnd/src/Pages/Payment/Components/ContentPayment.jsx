import { useState } from "react";
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

function ContentPayment() {
  const Service_Id = Cookies.get("Service_Id");
  const Subscription_Duration = Cookies.get("Subscription_Duration");
  const Discount_Code = Cookies.get("Discount_Code");
  const Service_Type = Cookies.get("Service_Type");
  const Product_Link = Cookies.get("Product_Link");
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [paymentError, setPaymentError] = useState("");

  const { serviceDetails } = useServiceDetails({
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

  if (!serviceDetails || isLoadingDiscount) return <Loading />;

  const componentMap = {
    vpsDetails: `استضافة خوادم مشتركة - ${serviceDetails.planName}`,
    dedicatedServerDetails: serviceDetails.planTitle,
  };

  const serviceTypeMap = {
    vpsDetails: "VPS",
    dedicatedServerDetails: "DedicatedServer",
  };

  const SelectedComponent = componentMap[Service_Type] || null;
  const SelectedServiceType = serviceTypeMap[Service_Type] || null;
  const DurationText = getDurationText(Subscription_Duration);
  const price =
    serviceDetails.subscriptionDurations[Subscription_Duration].price;

  const onPayPalApprove = handlePayPalApprove(
    SelectedComponent,
    Service_Id,
    DurationText,
    Discount_Code,
    Service_Type,
    totalPrice,
    Product_Link,
    SelectedServiceType,
    setPaymentError,
    navigate
  );

  return (
    <>
      <div className="min-h-screen bg-nano-bg-100 mt-[72px] text-nano-text-100 p-4 md:p-8 font-cairo">
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
              serviceDetails={serviceDetails}
              paymentMethod={paymentMethod}
              onPayPalApprove={onPayPalApprove}
              price={price}
              SelectedComponent={SelectedComponent}
              DurationText={DurationText}
              motion={motion}
              AnimatePresence={AnimatePresence}
            />
          </div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default ContentPayment;
