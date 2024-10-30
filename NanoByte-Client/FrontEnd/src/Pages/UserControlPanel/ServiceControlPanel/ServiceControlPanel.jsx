import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import Loading from "../../../Components/Loading/Loading";
import { 
  Power, PowerOff, RotateCw, Eye, EyeOff, 
  RefreshCw, Server, Monitor, Key, ChevronDown,
  Cpu, HardDrive, Globe, MemoryStick
} from 'lucide-react';

const ServiceControlPanel = () => {
  const { serviceId, orderNumber } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOSDropdown, setShowOSDropdown] = useState(false);
  const [showPasswordDropdown, setShowPasswordDropdown] = useState(false);

  const operatingSystems = ["Windows-Server-2019", "Windows-Server-2012"];

  useEffect(() => {
    fetchData();
  }, [serviceId, orderNumber]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:2000/api/service/Controlpanel/${serviceId}/${orderNumber}`,
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
    
    return `${hours} يوم ${days} ساعة`;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      <Header />
      <div className="text-white pt-24 pb-12 font-cairo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Server Info Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 shadow-lg border border-blue-400/20 transition-all hover:bg-white/15">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="p-3 bg-blue-500/30 rounded-lg shadow-inner">
                  <Server className="w-8 h-8 text-blue-200" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-100">{data.domain}</h1>
                  <p className="text-blue-200">نشط</p>
                </div>
              </div>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button className="p-3 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-all hover:scale-105 active:scale-95">
                  <Power className="w-6 h-6 text-green-300" />
                </button>
                <button className="p-3 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-all hover:scale-105 active:scale-95">
                  <PowerOff className="w-6 h-6 text-red-300" />
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all hover:scale-105 active:scale-95">
                  <RotateCw className="w-6 h-6 text-blue-300" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Server Stats */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-blue-400/20">
                <h2 className="text-xl font-bold mb-6 text-blue-100">مواصفات الخادم</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: Globe, label: "IP Address", value: data.privateIP },
                    { icon: MemoryStick, label: "RAM", value: data.OrderdId.vpsId.ram },
                    { icon: Cpu, label: "CPU", value: data.OrderdId.vpsId.cpu },
                    { icon: HardDrive, label: "Storage", value: data.OrderdId.vpsId.storage }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse bg-white/5 rounded-lg p-4 transition-all hover:bg-white/10">
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
              </div>
            </div>

            {/* Subscription Info */}
            <div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-blue-400/20">
                <h2 className="text-xl font-bold mb-6 text-blue-100">معلومات الاشتراك</h2>
                <div className="space-y-4">
                  {[
                    { label: "باقي للانتهاء", value: calculateTimeRemaining(data.OrderdId.nextPaymentDate) },
                    { label: "تاريخ الانتهاء", value: new Date(data.OrderdId.nextPaymentDate).toLocaleDateString() },
                    { label: "سعر التجديد", value: `$${data.OrderdId.renewalFee}` },
                    { label: "الحالة", value: data.OrderdId.paymentStatus }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 transition-all hover:bg-white/10">
                      <p className="text-blue-300">{item.label}</p>
                      <p className="font-semibold text-blue-100">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Server Settings */}
            <div className="lg:col-span-3 space-y-6">
              {/* OS Selection */}
              <div className="relative">
                <button
                  onClick={() => setShowOSDropdown(!showOSDropdown)}
                  className="w-full bg-white/10 backdrop-blur-md p-6 rounded-xl flex justify-between items-center hover:bg-white/15 transition-all border border-blue-400/20"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="p-3 bg-blue-500/20 rounded-lg shadow-inner">
                      <Monitor className="w-6 h-6 text-blue-300" />
                    </div>
                    <span className="text-lg font-semibold text-blue-100">نظام التشغيل</span>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-blue-300 transition-transform duration-300 ${showOSDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showOSDropdown && (
                  <div className="mt-2 bg-white/10 backdrop-blur-md rounded-xl border border-blue-400/20 overflow-hidden">
                    {operatingSystems.map((os) => (
                      <button
                        key={os}
                        className="w-full p-4 text-right hover:bg-white/15 transition-all text-blue-100"
                      >
                        {os}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Password Management */}
              <div className="relative">
                <button
                  onClick={() => setShowPasswordDropdown(!showPasswordDropdown)}
                  className="w-full bg-white/10 backdrop-blur-md p-6 rounded-xl flex justify-between items-center hover:bg-white/15 transition-all border border-blue-400/20"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="p-3 bg-blue-500/20 rounded-lg shadow-inner">
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
                          className="w-full bg-white/5 p-4 rounded-lg border border-blue-400/20 placeholder-blue-300/50 text-blue-100 focus:outline-none focus:border-blue-400/40"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="تأكيد كلمة المرور"
                        className="w-full bg-white/5 p-4 rounded-lg border border-blue-400/20 placeholder-blue-300/50 text-blue-100 focus:outline-none focus:border-blue-400/40"
                      />
                      <button
                        onClick={generateRandomPassword}
                        className="w-full bg-blue-500/20 p-4 rounded-lg hover:bg-blue-500/30 transition-all font-semibold text-blue-100 hover:scale-[1.01] active:scale-[0.99]"
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