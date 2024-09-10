import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import HeroSection from "./Component/HeroSection";
import WhyUs from "./Component/WhyUs";
import ServiceCards from "./Component/ServiceCards";
import FAQ from "./Component/FAQ/FAQ";
import SignupSuccessfull from "../../Components/Login&Sginup/signupSuccess";
function HomePage() {
  return (
    <>
      <div className="bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)]">
        <title>البوابة الرئيسية - NanoByte</title>
        <Header />
        <HeroSection />
        <ServiceCards />
        <WhyUs />
        <FAQ />
        <Footer />
        <SignupSuccessfull />
      </div>
    </>
  );
}

export default HomePage;
