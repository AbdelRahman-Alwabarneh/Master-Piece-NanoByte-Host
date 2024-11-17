import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import TutorialSidebarComponent from "./Components/SidebarComponent";
import { CalendarDays } from "lucide-react"; // Icon from lucide-react

const TutorialGroupPage = () => {
  const [tutorialGroups, setTutorialGroups] = useState([]);
  const navigate = useNavigate();

  // Fetch tutorial groups data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:2000/api/tutorialGroup",{},{ withCredentials: true });
        setTutorialGroups(response.data.AllTutorialGroup);
      } catch (error) {
        console.error("Error fetching tutorial groups:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="font-cairo min-h-screen text-white text-right">
        <div className="container mx-auto px-4 mt-[150px] pb-8">
          <div className="lg:flex lg:flex-row-reverse gap-6 space-y-6 lg:space-y-0">
          <div className="mt-[3.8rem]"><TutorialSidebarComponent /></div>
            <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-semibold text-white mb-6">أقسام الشروحات</h1>

              {tutorialGroups.map((group) => (
                <div
                  key={group._id}
                  onClick={() => navigate(`/ExplanationsLibrary/tutorial/${group.Link}`)}
                  className="p-4 bg-[#194F86] rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
                >
                     <div className="flex items-center justify-end ">
                      <span className="text-sm">{new Date(group.createdAt).toLocaleDateString("en-EG")}</span>
                      <CalendarDays className="w-4 h-4 ml-1" />
                    </div>
      
                    <h2 className="text-lg font-bold mt-1">{group.groupName}</h2>

                  <p className="text-sm mt-1">{group.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorialGroupPage;
