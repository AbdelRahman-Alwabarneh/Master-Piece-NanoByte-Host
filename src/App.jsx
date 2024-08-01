import Header from "./Component/Header/Header";
import HomePage from "./Component/Home/Home";
import LogIn from "./Component/LogIn/Login";
import Error404 from "./Component/Error404/Error404";
import SingUp from "./Component/SingUp/SingUp";
import VpsServer from "./Component/VPS_Server/VpsServer";
import DedicatedServer from "./Component/DedicatedServerPlan/DedicatedServer";
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
          <Route path="/SingUp" element={<SingUp />} />
          <Route path="/LogIn" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
