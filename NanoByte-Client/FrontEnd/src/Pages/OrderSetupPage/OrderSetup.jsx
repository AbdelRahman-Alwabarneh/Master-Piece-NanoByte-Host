import MetaTags from "./Components/MetaTags";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ContentOrderSetup from "./Components/ContentOrderSetup";
function OrderSetup() {
  return (
    <div dir="rtl">
      <MetaTags />
      <Header />
      <ContentOrderSetup/>
      <Footer />
    </div>
  );
}

export default OrderSetup;
