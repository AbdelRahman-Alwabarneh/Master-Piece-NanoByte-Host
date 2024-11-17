import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const TutorialSidebarComponent = () => {
  const location = useLocation();

  const menuItems = [
    { id: 1, title: "مكتبة الشروحات", path: "/ExplanationsLibrary" },
    { id: 2, title: "الأخبار والأعلانات", path: "/Services/dedicatedserver" },
  ];

  return (
    <div className="lg:w-64 w-full lg:ml-6 mb-6">
    <div className="bg-[#194f86] rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6 text-center">الدعم الفني</h2>
      <div className="space-y-4">
        <div>
          <ul className="space-y-2 text-gray-100">
            {menuItems.map((item) => (
              <Link 
                to={item.path} 
                key={item.id}
                className="block text-right"
              >
                <li
                  className={`p-2 rounded-md cursor-pointer transition-all duration-200 
                    ${location.pathname.toLowerCase().startsWith(item.path.toLowerCase()) 
                      ? 'bg-[#235a92] border-r-4 border-white shadow-md' 
                      : 'hover:bg-[#235a92] hover:border-r-4 hover:border-white/50'
                    }
                    relative group`}
                >
                  <div className="flex items-center justify-end gap-2">
                    <span className="flex-grow text-right">{item.title}</span>
                  </div>
                  <div 
                    className={`h-0.5 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-1
                      ${location.pathname.toLowerCase().startsWith(item.path.toLowerCase()) ? 'scale-x-100' : ''}`}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
};

export default TutorialSidebarComponent;