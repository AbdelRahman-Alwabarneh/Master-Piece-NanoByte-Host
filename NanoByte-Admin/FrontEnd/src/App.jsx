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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
