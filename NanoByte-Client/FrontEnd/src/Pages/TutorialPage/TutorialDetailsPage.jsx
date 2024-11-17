import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import TutorialSidebarComponent from "./Components/SidebarComponent";
import { CalendarDays } from "lucide-react";

const TutorialDetailsPage = () => {
  const { Link } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorialDetails = async () => {
      try {
        const response = await axios.post(`http://localhost:2000/api/tutorial/${Link}`,{},{ withCredentials: true });
        setTutorial(response.data.TutorialByLink[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutorial details:", error);
        setLoading(false);
      }
    };

    fetchTutorialDetails();
  }, [Link]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="font-cairo min-h-screen bg-[#194F86] text-white text-right ">
          <div className="container mx-auto px-4 mt-[150px] pb-8">
            <div className="lg:flex lg:flex-row-reverse gap-6 space-y-6 lg:space-y-0">
              <div className="mt-[3.8rem]">
                <TutorialSidebarComponent />
              </div>
              <div className="flex-1 space-y-4">
                <div className="bg-[#1d5480] p-6 rounded-lg shadow-lg">
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="font-cairo min-h-screen  text-white text-right [direction:rtl]">
        <div className="container mx-auto px-4 mt-[150px] pb-8">
          <div className="lg:flex lg:flex-row gap-6 space-y-6 lg:space-y-0">
            <div className="mt-[3.8rem]">
              <TutorialSidebarComponent />
            </div>
            
            <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-semibold text-white mb-6">الشروحات - {tutorial.title}</h1>

              <div className="bg-[#1d5480] p-6 rounded-lg shadow-lg ">
                <h1 className="text-3xl mb-4 border-b border-white pb-2">{tutorial.title}</h1>
                <div
                  className="text-white"
                  dangerouslySetInnerHTML={{ __html: tutorial.body }}
                ></div>
                <div className="flex items-center justify-end mt-4 text-gray-300">
                  <span>
                  <span className="ml-1">تاريخ النشر</span>
                    
                    {new Date(tutorial.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                  <CalendarDays className="w-5 h-5 mr-1" />

                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorialDetailsPage;