import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../Redux/Slice/usersData";
import Loading from "../../Components/Loading/Loading";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { useParams } from "react-router-dom";
import {
    Menu,
    Home,
    User,
    FileText,
    ShoppingCart,
    Mail,
    Headphones
} from "lucide-react";

function UserSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const { id,OrderNumber } = useParams();

  const tabs = [
    { id: 'home', name: 'الملخص', path: `/userDetails/${id}`, icon: Home },
    { id: 'settings', name: 'الملف الشخصي', path: `/UserProfile/${id}`, icon: User },
    { id: 'invoices', name: 'الفواتير', path: '/invoices', icon: FileText },
    { id: 'products', name: 'المنتجات', path: `/ServiceManagement/${id}/${OrderNumber}`, icon: ShoppingCart },
    { id: 'email', name: 'البريد', path: '/email', icon: Mail },
  ];

  useEffect(() => {
    const activeTab = tabs.find(tab => tab.path === location.pathname);
    if (activeTab) {
      setActiveTab(activeTab.id);
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    setMenuOpen(false);
    navigate(tab.path);
  };

  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.UserData);

  useEffect(() => {
    if (status === 'idle' && id) {
      dispatch(userDetails(id));
    }
  }, [dispatch, id, status]);

  if (status === "loading") {
    return <Loading />;
  }
  if (!user || !user.UsersData || user.UsersData.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className='text-white font-cairo text-sm'>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">ملف - {user.UsersData.firstName}</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <Menu size={20} />
        </button>
      </header>
      <nav
        className={`flex flex-col md:flex-row justify-start text-white font-cairo md:justify-center bg-blue-900 bg-opacity-70 rounded-lg p-2 mb-6 shadow-lg transition-all duration-300 ${
          menuOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors mb-2 md:mb-0 md:mx-1 ${
              activeTab === tab.id ? 'bg-blue-800 shadow-inner' : 'hover:bg-blue-800'
            }`}
          >
            <tab.icon size={16} className="ml-2" />
            <span className="text-xs">{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default UserSidebar;
