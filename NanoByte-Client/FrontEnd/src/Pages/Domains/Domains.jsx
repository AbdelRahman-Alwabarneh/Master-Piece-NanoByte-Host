import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import SearchDomains from "./Component/SearchDomains";
import DomainTable from "./Component/DomainTable";
import PlansWebsiteHosting from "./Component/PlansWebsiteHosting";
function DomainsPage() {
  return (
    <>
      <title> الرئيسية - NanoByte</title>
      <Header />
      <SearchDomains />
      <DomainTable />
      <PlansWebsiteHosting />
      <Footer />
    </>
  );
}

export default DomainsPage;
