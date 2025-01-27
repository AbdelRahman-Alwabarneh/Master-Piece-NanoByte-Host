import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SidebarComponent from "./Components/SidebarComponent";
import VPSTable from "./ServicesTables/VPSTable";
import DedicatedServerTable from "./ServicesTables/DedicatedServerTable";
import NoDataTable from "./ServicesTables/NoDataTable";
import { useParams, Link,useNavigate ,useLocation } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ServicesDashboard = () => {
  const { serviceType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
   useEffect(() => { 
    console.log(location.state?.onClose);
    
  if (location.state?.onClose) {
    toast.info('تم إلغاء عملية التجديد بنجاح', {
      position: "top-right",
      autoClose: 4000,
      limit: 1,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true, 
      rtl: true, 
      pauseOnFocusLoss: true, 
      draggable: true, 
      pauseOnHover: true, 
      theme: "colored",
      transition: Bounce,
      });
    navigate("/Services/VPS", { replace: true, state: {} });
  }
}, [location, navigate]);
  return (<>
  <ToastContainer />
      <Header />
<div className="font-cairo min-h-screen">
      <div className="container mx-auto px-4 mt-[150px] pb-8">
        <div className="lg:flex lg:flex-row-reverse gap-6 space-y-6 lg:space-y-0">
          <SidebarComponent />
          <div className="flex-1">
            {serviceType?.toLowerCase() === "vps" ? (
              <VPSTable />
            ) : serviceType?.toLowerCase() === "dedicatedserver" ? (
              <DedicatedServerTable />
            ) : <NoDataTable/>}
          </div>
        </div>
      </div>
    </div>
      <Footer /> 
</>
  );
};

export default ServicesDashboard;
