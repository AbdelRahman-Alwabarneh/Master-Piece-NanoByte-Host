import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import Loading from "../../../Components/Loading/Loading";
import Swal from 'sweetalert2';
import { 
  Power, PowerOff, RotateCw, Eye, EyeOff, 
  RefreshCw, Server, Monitor, Key, ChevronDown,
  Cpu, HardDrive, Globe, MemoryStick
} from 'lucide-react';
import ServerRenewalModal from './VPSRenewalWorkflow/ServerRenewalModal';
const ServiceControlPanel = () => {
  const { serviceId, orderNumber } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOSDropdown, setShowOSDropdown] = useState(false);
  const [showOSOptions, setShowOSOptions] = useState(false);
  const [showPasswordDropdown, setShowPasswordDropdown] = useState(false);

  const operatingSystems = [
    {
      name: "Windows Server",
      versions: ["Windows-Server-2019", "Windows-Server-2012"]
    },
  ];


  useEffect(() => {
    fetchData();
  }, [serviceId, orderNumber]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service/Controlpanel/${serviceId}/${orderNumber}`,
        {},
        { withCredentials: true }
      );
      setData(response.data.service);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  const calculateTimeRemaining = (nextPaymentDate) => {
    const now = new Date();
    const end = new Date(nextPaymentDate);
    const diff = end - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `يوم ${days} ساعة ${hours}`;
  };

  if (loading) {
    return <Loading />;
  }
  
  if (data.status == "pending") {
    return <>
  <Header />
    <div className="h-screen text-right mt-[73px]">
    <div className="[direction:rtl] flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">الخادم الخاص بك قيد الأنشاء</span>
  </div>
</div>
 </div>
  <Footer />
  </>;
  }
  if (data.status == "expired") {
    return <>
  <Header />
    <div className="h-screen  text-right">
    <ServerRenewalModal serviceData={data} />
 </div>
  <Footer />
  </>;
  }

  const renderServerSpecs = () => {
    if (data.OrderdId.Servicetype === "VPS") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Globe, label: "عنوان الأي بي", value: data.privateIP },
            { icon: MemoryStick, label: "الرام", value: data.OrderdId.vpsId.ram },
            { icon: Cpu, label: "المعالج", value: data.OrderdId.vpsId.cpu },
            { icon: HardDrive, label: "المساحة", value: data.OrderdId.vpsId.storage }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse text-right bg-white/5 rounded-lg p-4 transition-all duration-300 hover:bg-white/10 transform hover:scale-[1.02]">
              <div className="p-3 bg-blue-500/20 rounded-lg shadow-inner">
                <item.icon className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <p className="text-blue-300">{item.label}</p>
                <p className="font-semibold text-blue-100">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      const specs = data.OrderdId.dedicatedServerId.planDescription.split('\n').filter(Boolean);
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2">
                <div className="p-3 bg-blue-500/20 rounded-lg shadow-inner">
                  <Cpu className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-blue-300">اسم الخطة</p>
                  <p className="font-semibold text-blue-100">{data.OrderdId.dedicatedServerId.planTitle}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2">
                <div className="p-3 bg-blue-500/20 rounded-lg shadow-inner">
                  <Server className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-blue-300">وصف الخطة</p>
                  <p className="font-semibold text-blue-100">{data.OrderdId.dedicatedServerId.secondaryTitle}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-100 mb-4">مواصفات تفصيلية</h3>
            <div className="grid gap-3">
              {specs.map((spec, index) => (
                <div key={index} className="text-blue-200 flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-right">
      <Header />
      <div className="text-white pt-20 pb-12 font-cairo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Server Info Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 shadow-xl border border-blue-400/20 transition-all duration-300 hover:bg-white/15 transform hover:scale-[1.01]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="p-3 bg-blue-500/30 rounded-lg shadow-inner">
                  <Server className="w-8 h-8 text-blue-200" />
                </div>
                <div className="text-center sm:text-right">
                  <h1 className="text-2xl font-bold text-blue-100">{data.domain || "جاري الأنشاء"}</h1>
                  <p className="text-blue-200 text-left">نشط</p>
                </div>
              </div>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button className="p-3 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-all duration-300 hover:scale-110 active:scale-95 transform">
                  <Power className="w-6 h-6 text-green-300" />
                </button>
                <button className="p-3 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-all duration-300 hover:scale-110 active:scale-95 transform">
                  <PowerOff className="w-6 h-6 text-red-300" />
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all duration-300 hover:scale-110 active:scale-95 transform">
                  <RotateCw className="w-6 h-6 text-blue-300" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Server Stats */}
                <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-blue-400/20 h-full">
                <h2 className="text-xl font-bold mb-6 text-blue-100">مواصفات الخادم</h2>
                {renderServerSpecs()}
              </div>
            </div>

            {/* Subscription Info */}
            <div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-blue-400/20 h-full">
                <h2 className="text-xl font-bold mb-6 text-blue-100">معلومات الاشتراك</h2>
                <div className="space-y-4">
                  {[
                    { label: "باقي للانتهاء", value: calculateTimeRemaining(data.OrderdId.nextPaymentDate) },
                    { label: "تاريخ الانتهاء", value: new Date(data.OrderdId.nextPaymentDate).toLocaleDateString() },
                    { label: "سعر التجديد", value: `$${data.OrderdId.renewalFee}` },
                    { label: "الحالة", value: data.OrderdId.paymentStatus }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 transition-all duration-300 hover:bg-white/10 transform hover:scale-[1.02]">
                      <p className="text-blue-300">{item.label}</p>
                      <p className="font-semibold text-blue-100">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Server Settings */}
            <div className="lg:col-span-3 space-y-6">
              {/* OS Selection - Nested Dropdowns */}
            {data.OrderdId.Servicetype === "VPS"?   <div className="relative">
                <button
                  onClick={() => {
                    setShowOSDropdown(!showOSDropdown);
                    setShowOSOptions(false);
                  }}
                  className="w-full bg-white/10 backdrop-blur-md p-6 rounded-xl flex justify-between items-center hover:bg-white/15 transition-all duration-300 border border-blue-400/20 group"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="p-3 bg-blue-500/20 rounded-lg shadow-inner group-hover:bg-blue-500/30 transition-all duration-300">
                      <Monitor className="w-6 h-6 text-blue-300" />
                    </div>
                    <span className="text-lg font-semibold text-blue-100">نظام التشغيل</span>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-blue-300 transition-transform duration-300 ${showOSDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showOSDropdown && (
                  <div className="mt-2 bg-white/10 backdrop-blur-md rounded-xl border border-blue-400/20 overflow-hidden">
                    {operatingSystems.map((os, index) => (
                      <div key={index}>
                        <button
                          onClick={() => setShowOSOptions(!showOSOptions)}
                          className="w-full p-4 text-right hover:bg-white/15 transition-all duration-300 text-blue-100 flex justify-between items-center"
                        >
                          <span>{os.name}</span>
                          <ChevronDown className={`w-5 h-5 text-blue-300 transition-transform duration-300 ${showOSOptions ? 'rotate-180' : ''}`} />
                        </button>
                        {showOSOptions && (
                          <div className="bg-white/5">
                            {os.versions.map((version, vIndex) => (
                              <button
                                key={vIndex}
                                className="w-full p-4 pr-8 text-right hover:bg-white/15 transition-all duration-300 text-blue-200"
                              >
                                {version}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div> : null}

              {/* Password Management */}
              <div className="relative">
                <button
                  onClick={() => setShowPasswordDropdown(!showPasswordDropdown)}
                  className="w-full bg-white/10 backdrop-blur-md p-6 rounded-xl flex justify-between items-center hover:bg-white/15 transition-all duration-300 border border-blue-400/20 group"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="p-3 bg-blue-500/20 rounded-lg shadow-inner group-hover:bg-blue-500/30 transition-all duration-300">
                      <Key className="w-6 h-6 text-blue-300" />
                    </div>
                    <span className="text-lg font-semibold text-blue-100">كلمة المرور</span>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-blue-300 transition-transform duration-300 ${showPasswordDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showPasswordDropdown && (
                  <div className="mt-2 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="كلمة المرور الجديدة"
                          className="w-full  text-right bg-white/5 p-4 rounded-lg border border-blue-400/20 placeholder-blue-300/50 text-blue-100 focus:outline-none focus:border-blue-400/40 transition-all duration-300"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors duration-300"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="تأكيد كلمة المرور"
                        className="w-full  text-right bg-white/5 p-4 rounded-lg border border-blue-400/20 placeholder-blue-300/50 text-blue-100 focus:outline-none focus:border-blue-400/40 transition-all duration-300"
                      />
                      
                      <button
                        onClick={generateRandomPassword}
                        className="w-full bg-blue-500/20 p-4 rounded-lg hover:bg-blue-500/30 transition-all duration-300 font-semibold text-blue-100 hover:scale-[1.01] active:scale-[0.99] transform"
                      >
                        توليد كلمة مرور تلقائية
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceControlPanel;