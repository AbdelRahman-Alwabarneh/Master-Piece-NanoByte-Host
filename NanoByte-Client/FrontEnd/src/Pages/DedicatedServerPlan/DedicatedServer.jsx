
import React, { Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SectionDedicatedServer from "./Components/SectionDedicatedServer";
import AllDedicatedServer from "./Components/Card_DedicatedServer/AllDedicatedServer";
import Loading from "../../Components/Loading/Loading";

function DedicatedServer() {
  const FeaturesOfOurServices3 = lazy(() =>
    import("./Components/FeaturesOfOurServices3")
  );
  const FeaturesOfOurServices4 = lazy(() =>
    import("./Components/FeaturesOfOurServices4")
  );
  return (
    <>
      <title>الخوادم المركزية - NanoByte</title>
      <Header />
      <section dir="rtl" className="font-cairo mt-[72px]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <SectionDedicatedServer />
          <AllDedicatedServer />
        </div>
      </section>
      <Suspense fallback={<Loading />}>
        <FeaturesOfOurServices3 AnimatePresence={AnimatePresence} motion={motion}/>
        <FeaturesOfOurServices4 AnimatePresence={AnimatePresence} motion={motion}/>
      </Suspense>
      <Footer />
    </>
  );
}

export default DedicatedServer;
