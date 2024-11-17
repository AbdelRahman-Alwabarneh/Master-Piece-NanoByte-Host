import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import TutorialSidebarComponent from "./Components/SidebarComponent";
import { CalendarDays } from "lucide-react"; // Icon from lucide-react

const TutorialPage = () => {
  const [tutorialGroups, setTutorialGroups] = useState([]);
  const navigate = useNavigate();
  const { Link } = useParams();

  useEffect(() => {
    const fetchTutorialGroups = async () => {
      try {
        const response = await axios.post(`http://localhost:2000/api/tutorialGroup/${Link}`,{},{ withCredentials: true });
        setTutorialGroups(response.data.AllTutorialGroup);
      } catch (error) {
        console.error("Error fetching tutorial groups:", error);
      }
    };
    fetchTutorialGroups();
  }, [Link]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <Header />
      <div className="font-cairo min-h-screen text-white text-right [direction:rtl]">
        <div className="container mx-auto px-4 mt-[150px] pb-8">
          <div className="lg:flex lg:flex-row gap-6 space-y-6 lg:space-y-0">
            <div className="mt-[3.8rem]"><TutorialSidebarComponent /></div>
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-semibold text-white mb-6">الشروحات</h1>

              {tutorialGroups.map((group) => (
                <div
                  key={group._id}
                  className="p-4 bg-[#194F86] rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
                >

                  <h2 className="text-lg font-bold mt-1">{group.groupName}</h2>
                  <p className="text-sm mt-1">{group.description}</p>

                  {group.Tutorial.map((tutorial) => (
                    <div
                      key={tutorial._id}
                      className="mt-4 p-4 bg-[#245c96] rounded-md"
                    >
                      <div className="flex items-center justify-start">
                      <CalendarDays className="w-4 h-4 ml-1" />
                        <span className="text-sm">
                          {new Date(tutorial.createdAt).toLocaleDateString("en-EG")}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mt-1">{tutorial.title}</h3>
                      <p className="text-sm mt-1">
                        {truncateText(tutorial.body.replace(/<\/?[^>]+(>|$)/g, ""), 50)}
                      </p>
                      <button
                        onClick={() => navigate(`/ExplanationsLibrary/tutorialdetails/${tutorial.Link}`)}
                        className="mt-2 text-blue-200 hover:text-blue-400 underline"
                      >
                        إقرأ المزيد
                      </button>
                    </div>
                  ))}
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

export default TutorialPage;
