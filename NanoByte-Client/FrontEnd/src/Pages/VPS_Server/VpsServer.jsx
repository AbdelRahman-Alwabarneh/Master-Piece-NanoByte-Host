import React, { Suspense, lazy } from "react";
import Header from "../../Components/Header/Header";
import AllVpsPlans from "./Components/AllVpsPlans";
import Footer from "../../Components/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import MetaTags from "./Components/MetaTags";
import Loading from "../../Components/Loading/Loading";
const FeaturesOfOurServices1 = lazy(() =>
  import("./Components/FeaturesOfOurServices1")
);
const FeaturesOfOurServices2 = lazy(() =>
  import("./Components/FeaturesOfOurServices2")
);

function VpsServer() {
  return (
    <div dir="rtl">
      <MetaTags />
      <Header />
      <AllVpsPlans AnimatePresence={AnimatePresence} motion={motion} />
      <Suspense fallback={<Loading />}>
        <FeaturesOfOurServices1 AnimatePresence={AnimatePresence} motion={motion}/>
        <FeaturesOfOurServices2 AnimatePresence={AnimatePresence} motion={motion}/>
      </Suspense>
      <Footer />
    </div>
  );
}

export default VpsServer;
