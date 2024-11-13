import Header from "./Components/Header/Header";
import HomePage from "./Pages/Home/Home";
import LogIn from "./Pages/LogIn/Login";
import Error404 from "./Pages/Error404/Error404";
import SingUp from "./Pages/SingUp/SingUp";
import VpsServer from "./Pages/VPS_Server/VpsServer";
import DedicatedServer from "./Pages/DedicatedServerPlan/DedicatedServer";
import LinuxWebsiteHosting from "./Pages/WebsiteHostingLinux/LinuxWebsiteHosting";
import WindowsWebsiteHosting from "./Pages/WindowsWebsiteHosting/WindowsWebsiteHosting";
import DomainsPage from "./Pages/Domains/Domains";
import ControlPanel from "./Pages/UserControlPanel/UserControlPanel";
import UserProfile from "./Pages/UserControlPanel/UserProfile/UserProfile";
import ServiceControlPanel from "./Pages/UserControlPanel/ServiceControlPanel/ServiceControlPanel";
import VPSDetails from "./Pages/VPS_Details/VPS_Details";
import DedicatedOrderDetails from "./Pages/DedicatedServerDetails/DedicatedServerDetails";
import PaymentPage from "./Pages/Payment/Payment";
import InvoicePage from "./Pages/Invoice/InvoicePage";
import ServicesDashboard from "./Pages/ServiceControlPanel/ServicesDashboard";
import AllOrders from "./Pages/OrdersPage/AllOrders";
import EmailLogPage from "./Pages/EmailsLogPage/EmailLogPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/VpsServer" element={<VpsServer />} />
          <Route path="/DedicatedServer" element={<DedicatedServer />} />
          <Route
            path="/LinuxWebsiteHosting"
            element={<LinuxWebsiteHosting />}
          />
          <Route
            path="/WindowsWebsiteHosting"
            element={<WindowsWebsiteHosting />}
          />
          <Route path="/domains" element={<DomainsPage />} />
          <Route path="/SignUp" element={<SingUp />} />
          <Route path="/LogIn" element={<LogIn />} />

          <Route
            path="/UserControlPanel"
            element={
              <ProtectedRoute>
                <ControlPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route path="/VPSDetails/:productLink" element={<VPSDetails />} />
          <Route
            path="/DedicatedDetails/:productLink"
            element={<DedicatedOrderDetails />}
          />

          <Route
            path="/Payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/InvoicePage/:orderNumber"
            element={
              <ProtectedRoute>
                <InvoicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ServiceControlPanel/:serviceId/:orderNumber"
            element={
              <ProtectedRoute>
                <ServiceControlPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Services/:serviceType"
            element={
              <ProtectedRoute>
                <ServicesDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Orders"
            element={
              <ProtectedRoute>
                <AllOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EmailPage"
            element={
              <ProtectedRoute>
                <EmailLogPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
