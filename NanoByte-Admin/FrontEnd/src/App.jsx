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
import PendingOrderManagement from "./Pages/OrderManagement/PendingOrder";
import OrderDetails from "./Pages/OrderManagement/OrderDetails";
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
          <Route path="/PendingOrderManagement" element={<PendingOrderManagement />} />
          <Route path="/OrderDetails/:orderNumber" element={<OrderDetails />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
