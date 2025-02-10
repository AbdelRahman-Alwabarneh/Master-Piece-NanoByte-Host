import React, { Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "../../Components/Header/Header";
import AllGameHostingPlans from "./Components/AllGameHostingPlans";
import SectionGameHosting from "./Components/SectionGameHosting";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Loading/Loading";
import MetaTags from "./Components/MetaTags";
const FeaturesOfOurServices1 = lazy(() =>
  import("./Components/FeaturesOfOurServices1")
);
function GameHostingPage() {
  return (
    <>
      <div dir="rtl">
        <MetaTags/>
        <Header />
        <SectionGameHosting AnimatePresence={AnimatePresence} motion={motion} />
        <AllGameHostingPlans
          AnimatePresence={AnimatePresence}
          motion={motion}
        />
        <Suspense fallback={<Loading />}>
          <FeaturesOfOurServices1 useInView={useInView} motion={motion} />
        </Suspense>
        <Footer />
      </div>
    </>
  );
}
export default GameHostingPage;
