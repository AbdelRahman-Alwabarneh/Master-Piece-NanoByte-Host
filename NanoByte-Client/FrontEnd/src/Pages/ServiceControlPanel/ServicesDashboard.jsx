import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SidebarComponent from "./Components/SidebarComponent";
import VPSTable from "./ServicesTables/VPSTable";
import DedicatedServerTable from "./ServicesTables/DedicatedServerTable";
import NoDataTable from "./ServicesTables/NoDataTable";
import { useParams, Link } from "react-router-dom";

const ServicesDashboard = () => {
  const { serviceType } = useParams();

  return (<>
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
