import React, { Suspense, lazy } from "react";
import Header from "../../Components/Header/Header";
import SectionVPS_Server from "./Components/SectionVPS_Server";
import AllVpsPlans from "./Components/AllVpsPlans";
import Footer from "../../Components/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
      <SectionVPS_Server AnimatePresence={AnimatePresence} motion={motion} />
      <AllVpsPlans AnimatePresence={AnimatePresence} motion={motion} />
      <Suspense fallback={<Loading />}>
        <FeaturesOfOurServices1 useInView={useInView} motion={motion}/>
        <FeaturesOfOurServices2 useInView={useInView} motion={motion}/>
      </Suspense>
      <Footer />
    </div>
  );
}

export default VpsServer;
