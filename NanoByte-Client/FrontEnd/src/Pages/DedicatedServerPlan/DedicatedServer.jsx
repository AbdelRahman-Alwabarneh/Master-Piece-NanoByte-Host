
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SectionDedicatedServer from "./Components/SectionDedicatedServer";
import FeaturesOfOurServices3 from "./Components/FeaturesOfOurServices3";
import FeaturesOfOurServices4 from "./Components/FeaturesOfOurServices4";
import AllDedicatedServer from "./Components/AllDedicatedServer";
function DedicatedServer() {
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
      <FeaturesOfOurServices3 />
      <FeaturesOfOurServices4 />
      <Footer />
    </>
  );
}

export default DedicatedServer;
