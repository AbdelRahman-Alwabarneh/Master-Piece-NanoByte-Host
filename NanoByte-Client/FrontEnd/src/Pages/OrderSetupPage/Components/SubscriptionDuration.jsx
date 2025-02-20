import { ChevronDown } from "lucide-react";

function SubscriptionDuration({
  serviceDetails,
  selectedDuration,
  setSelectedDuration,
  getDurationText,
  motion,
  AnimatePresence,
}) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-nano-bg-additional-200 rounded-lg p-4 shadow-lg"
        >
          <label
            htmlFor="duration"
            className="block mb-2 font-semibold text-nano-text-100"
          >
            مدة الاشتراك:
          </label>
          <div className="relative">
            <select
              id="duration"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="block w-full bg-nano-bg-additional-300 text-nano-text-100 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-nano-primary-300"
            >
              {Object.entries(serviceDetails.subscriptionDurations).map(
                ([key, value]) => (
                  <option key={key} value={key}>
                    {getDurationText(key)} - ${value.price}
                  </option>
                )
              )}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nano-text-100 w-4 h-4 pointer-events-none" />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default SubscriptionDuration;
