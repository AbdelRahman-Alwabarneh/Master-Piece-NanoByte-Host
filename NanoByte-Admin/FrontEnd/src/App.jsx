import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeDashboard from "./Pages/Home/HomeDashboard";
import AllUsers from "./Pages/Users/UsersDashboard";
import UserDetails from "./Pages/Users/UserDetails/UserDetails";
import UserProfile from "./Pages/Users/UserProfile/UserProfile";
import Error404 from "./Pages/Error404/Error404";
import VPSManagement from "./Pages/VPSManagement/VPSManagement";
import AddVPSPlan from "./Pages/VPSManagement/addVPSPlan";
import VPSDetailsManagement from "./Pages/VPSManagement/VPSDetailsManagement";
import CreateGroup from "./Pages/VPSManagement/VPSGroups/CreateVPSGroup";
import DetailsVPSGroup from "./Pages/VPSManagement/VPSGroups/DetailsVPSGroup";
import DedicatedServerManagement from "./Pages/DedicatedServerManagement/DedicatedServerManagement";
import AddDedicatedServer from "./Pages/DedicatedServerManagement/addDedicatedServer";
import DedicatedServerDetails from "./Pages/DedicatedServerManagement/DetailsDedicatedServer";
import DiscountCodeManagement from "./Pages/DiscountCode/DiscountCodeManagement";
import AddDiscountCode from "./Pages/DiscountCode/addDiscountCode";
import DetailsDiscountCode from "./Pages/DiscountCode/DetailsDiscountCode";
import OrderManagement from "./Pages/OrderManagement/OrderManagement";
import OrderDetails from "./Pages/OrderManagement/OrderDetails";
import OrdersPage from "./Pages/Users/OrdersPage/OrdersPage";
import ServiceManagement from "./Pages/Users/ServiceManagement/ServiceManagement";
import AddEmailTemplate from "./Pages/MailTemplates/addMailTemplates";
import EmailTemplateManagement from "./Pages/MailTemplates/MailTemplatesManagement";
import EmailTemplateDetails from "./Pages/MailTemplates/MailTemplateDetails";
import EmailLogsPage from "./Pages/Users/Emailpage/Emailpage";
import AddWebsiteHosting from "./Pages/WebsiteHosting/AddWebsiteHosting";
import WebsiteHostingDetails from "./Pages/WebsiteHosting/DetailsWebsiteHosting";
import WebsiteHostingManagement from "./Pages/WebsiteHosting/WebsiteHostingManagement";
import CreateGroupGameHosting from "./Pages/GameHosting/GameHostingGroups/CreateGroupGameHosting";
import DetailsGroupGameHosting from "./Pages/GameHosting/GameHostingGroups/DetailsGroupGameHosting";
import AddGameServerPlan from "./Pages/GameHosting/addGameHosting";
import GameHostingPlanDetails from "./Pages/GameHosting/DetailsGameHosting";
import GameHostingManagement from "./Pages/GameHosting/GameHostingManagement";
import AddDomainService from "./Pages/DomainService/AddDomainService";
import DomainServiceDetails from "./Pages/DomainService/DetailsDomainService";
import DomainServiceManagement from "./Pages/DomainService/DomainServiceManagement";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/userDetails/:id" element={<UserDetails />} />
          <Route path="/UserProfile/:id" element={<UserProfile />} />
          <Route path="/VPSManagement" element={<VPSManagement />} />
          <Route path="/CreateGroup" element={<CreateGroup />} />
          <Route path="/DetailsVPSGroup/:id" element={<DetailsVPSGroup />} />
          <Route path="/AddVPSPlan" element={<AddVPSPlan />} />
          <Route
            path="/VPSDetailsManagement/:id"
            element={<VPSDetailsManagement />}
          />
          <Route path="/AddDedicatedServer" element={<AddDedicatedServer />} />
          <Route path="/DedicatedServerManagement" element={<DedicatedServerManagement />} />
          <Route path="/DedicatedServerDetails/:id" element={<DedicatedServerDetails />} />
          <Route path="/DiscountCodeManagement" element={<DiscountCodeManagement />} />
          <Route path="/AddDiscountCode" element={<AddDiscountCode />} />
          <Route path="/DetailsDiscountCode/:id" element={<DetailsDiscountCode />} />
          <Route path="/OrderManagement/:orderStatus" element={<OrderManagement />} />
          <Route path="/OrderDetails/:orderNumber" element={<OrderDetails />} />
          <Route path="/Orders/:id" element={<OrdersPage />} />
          <Route path="/ServiceManagement/:id/:OrderNumber" element={<ServiceManagement />} />
          <Route path="/AddEmailTemplate" element={<AddEmailTemplate />} />
          <Route path="/EmailTemplateManagement" element={<EmailTemplateManagement />} />
          <Route path="/EmailTemplateDetails/:id" element={<EmailTemplateDetails />} />
          <Route path="/EmailLogsPage/:id" element={<EmailLogsPage />} />
          <Route path="/AddWebsiteHosting" element={<AddWebsiteHosting />} />
          <Route path="/WebsiteHostingDetails/:id" element={<WebsiteHostingDetails />} />
          <Route path="/WebsiteHostingManagement" element={<WebsiteHostingManagement />} />
          <Route path="/CreateGroupGameHosting" element={<CreateGroupGameHosting />} />
          <Route path="/DetailsGroupGameHosting/:id" element={<DetailsGroupGameHosting />} />
          <Route path="/AddGameServerPlan" element={<AddGameServerPlan />} />
          <Route path="/GameHostingPlanDetails/:id" element={<GameHostingPlanDetails />} />
          <Route path="/GameHostingManagement" element={<GameHostingManagement />} />
          <Route path="/AddDomainService" element={<AddDomainService />} />
          <Route path="/DomainServiceDetails/:id" element={<DomainServiceDetails />} />
          <Route path="/DomainServiceManagement" element={<DomainServiceManagement />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
