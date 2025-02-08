
import React, { Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SectionDedicatedServer from "./Components/SectionDedicatedServer";
import AllDedicatedServer from "./Components/Card_DedicatedServer/AllDedicatedServer";
import Loading from "../../Components/Loading/Loading";
import MetaTagsDedicated from "./Components/MetaTagsDedicated";
function DedicatedServer() {
  const FeaturesOfOurServices3 = lazy(() =>
    import("./Components/FeaturesOfOurServices3")
  );
  const FeaturesOfOurServices4 = lazy(() =>
    import("./Components/FeaturesOfOurServices4")
  );
  return (
    <div dir="rtl">
      <MetaTagsDedicated />
      <Header />
      <section className="font-cairo mt-[72px]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <SectionDedicatedServer AnimatePresence={AnimatePresence} motion={motion}/>
          <AllDedicatedServer AnimatePresence={AnimatePresence} motion={motion}/>
        </div>
      </section>
      <Suspense fallback={<Loading />}>
        <FeaturesOfOurServices3 motion={motion} useInView={useInView} />
        <FeaturesOfOurServices4 motion={motion} useInView={useInView}/>
      </Suspense>
      <Footer />
      </div>
  );
}

export default DedicatedServer;
