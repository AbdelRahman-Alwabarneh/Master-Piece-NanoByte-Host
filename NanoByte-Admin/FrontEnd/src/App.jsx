import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeDashboard from "./Pages/Home/HomeDashboard";
import AllUsers from "./Pages/Users/UsersDashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/AllUsers" element={<AllUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
