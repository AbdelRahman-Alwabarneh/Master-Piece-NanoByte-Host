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
          <Route path="/UserControlPanel" element={<ControlPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
