import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Loading from "./Components/Loading/Loading";
import "./App.css";

// Lazy loading for all pages
const HomePage = lazy(() => import("./Pages/Home/Home"));
const LogIn = lazy(() => import("./Pages/LogIn/Login"));
const Error404 = lazy(() => import("./Pages/Error404/Error404"));
const SingUp = lazy(() => import("./Pages/SingUp/SingUp"));
const VpsServer = lazy(() => import("./Pages/VPS_Server/VpsServer"));
const DedicatedServer = lazy(() =>
  import("./Pages/DedicatedServerPlan/DedicatedServer")
);
const LinuxWebsiteHosting = lazy(() =>
  import("./Pages/WebsiteHostingLinux/LinuxWebsiteHosting")
);
const WindowsWebsiteHosting = lazy(() =>
  import("./Pages/WindowsWebsiteHosting/WindowsWebsiteHosting")
);
const DomainsPage = lazy(() => import("./Pages/Domains/Domains"));
const ControlPanel = lazy(() =>
  import("./Pages/UserControlPanel/UserControlPanel")
);
const UserProfile = lazy(() =>
  import("./Pages/UserControlPanel/UserProfile/UserProfile")
);
const ServiceControlPanel = lazy(() =>
  import("./Pages/UserControlPanel/ServiceControlPanel/ServiceControlPanel")
);
const VPSDetails = lazy(() => import("./Pages/VPS_Details/VPS_Details"));
const DedicatedOrderDetails = lazy(() =>
  import("./Pages/DedicatedServerDetails/DedicatedServerDetails")
);
const PaymentPage = lazy(() => import("./Pages/Payment/Payment"));
const InvoicePage = lazy(() => import("./Pages/Invoice/InvoicePage"));
const ServicesDashboard = lazy(() =>
  import("./Pages/ServiceControlPanel/ServicesDashboard")
);
const AllOrders = lazy(() => import("./Pages/OrdersPage/AllOrders"));
const EmailLogPage = lazy(() => import("./Pages/EmailsLogPage/EmailLogPage"));
const TutorialGroupPage = lazy(() =>
  import("./Pages/TutorialPage/TutorialGroupPage")
);
const TutorialPage = lazy(() => import("./Pages/TutorialPage/TutorialPage"));
const TutorialDetailsPage = lazy(() =>
  import("./Pages/TutorialPage/TutorialDetailsPage")
);
const GameHostingPage = lazy(() =>
  import("./Pages/GameHostingPage/GameHosting")
);
const AboutUs = lazy(() => import("./Pages/AboutUs/AboutUsPage"));
const ContactPage = lazy(() => import("./Pages/ContactPages/ContactPages"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading/>}>
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
          <Route path="/ExplanationsLibrary" element={<TutorialGroupPage />} />
          <Route
            path="/ExplanationsLibrary/tutorial/:Link"
            element={<TutorialPage />}
          />
          <Route
            path="/ExplanationsLibrary/tutorialdetails/:Link"
            element={<TutorialDetailsPage />}
          />

          <Route path="/GameHostingPage" element={<GameHostingPage />} />
          <Route path="/AboutNanobyte" element={<AboutUs />} />
          <Route path="/ContactNanobyte" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
