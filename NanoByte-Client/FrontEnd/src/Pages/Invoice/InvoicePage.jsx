import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ContentInvoice from "./Components/ContentInvoice";
import MetaTagsInvoicePage from "./Components/MetaTagsInvoicePage";
const InvoicePage = () => {
  return (
    <div dir="rtl">
      <MetaTagsInvoicePage />
      <Header />
      <ContentInvoice/>
      <Footer />
      </div>
  );
};

export default InvoicePage;
