import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeroSection from "./Component/HeroSection";

function HomePage() {
  return (
    <>
   <div className="bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)]">
    <title>البوابة الرئيسية - NanoByte</title>
      <Header />
      <HeroSection/>
      <Footer/></div>
    </>
  );
}

export default HomePage;
