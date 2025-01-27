import React, { useState, useEffect } from "react";
import { Save, X, ToggleLeft , ToggleRight , Minus, Infinity } from "lucide-react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";

const AddGameServerPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [groups, setGroups] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [plan, setPlan] = useState({
    planName: "",
    ram: "",
    cpu: "",
    storage: "",
    connectionSpeed: "",
    security: "",
    databases: "",
    prices: Array.from({ length: 6 }, (_, i) => ({
      duration: i + 1,
      price: "",
    })),
    setupFee: "",
    quantity: "",
    isUnlimited: isUnlimited,
    productLink: "",
    groupId: "",
    groupName: "",
    isHidden: false
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/GroupGameHosting`);
      setGroups(response.data.GamesHostingGroup);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlan((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePriceChange = (index, value) => {
    const newPrices = [...plan.prices];
    newPrices[index].price = value;
    setPlan((prev) => ({ ...prev, prices: newPrices }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تأكد أن المجموعة محددة
    if (!plan.groupId) {
      Swal.fire({
        title: "خطأ!",
        text: "يجب اختيار مجموعة صالحة.",
        icon: "error",
        iconColor: "#ff0000",
        background: "#18296C",
        color: "#ffffff",
        confirmButtonColor: "#1E38A3",
        confirmButtonText: "موافق",
      });
      return;
    }

    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "هل تريد إضافة خطة الـ Game Server الجديدة؟",
      icon: "warning",
      iconColor: "#ffcc00",
      background: "#18296C",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#1E38A3",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL_ADMIN}/api/GameHosting`, { gameData: plan });
          const addedGameServerPlanId = response.data.GameServer._id;
          Swal.fire({
            title: "تمت الإضافة!",
            text: "تم إضافة خطة الـ Game Server بنجاح.",
            icon: "success",
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "موافق",
          }).then(async () => {
            await axios.patch(`${import.meta.env.VITE_API_URL_ADMIN}/api/GroupGameHosting/${addedGameServerPlanId}`, {plan});

            navigate(`/GameHostingPlanDetails/${addedGameServerPlanId}`);
          });
        } catch (error) {
          Swal.fire({
            title: "خطأ!",
            text: "حدث خطأ أثناء إضافة الخطة.",
            icon: "error",
            iconColor: "#ff0000",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "موافق",
          });
        }
      }
    });
  };

  const handleToggle = () => {
    setPlan((prev) => ({
      ...prev,
      isUnlimited: !prev.isUnlimited,
    }));
  };

  const handleGroupSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPlan(prev => ({ ...prev, groupName: value }));
    setShowDropdown(true);

    // Auto-select if there's an exact match
    const exactMatch = groups.find(group => group.groupName.toLowerCase() === value.toLowerCase());
    if (exactMatch) {
      handleGroupSelect(exactMatch);
    } else {
      setPlan(prev => ({ ...prev, groupId: "" }));
    }
  };

  const handleGroupSelect = (group) => {
    setPlan(prev => ({
      ...prev,
      groupId: group._id,
      groupName: group.groupName
    }));
    setShowDropdown(false);
    setSearchTerm(group.groupName);
  };

  const filteredGroups = groups.filter(group =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white font-cairo">
    <Sidebar />
    <div className="p-2 sm:p-4 md:mr-64 mr-[75px] text-sm mt-2">
      <div className="max-w-full mx-auto">
        <div className="bg-blue-950 bg-opacity-30 hover:shadow-blue-800/10 rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="flex justify-between border-b border-blue-700 pb-2 mb-4">
            <h2 className="text-lg font-semibold">إضافة خطة Game Server جديدة</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">اسم الخطة</label>
                <input
                  type="text"
                  name="planName"
                  value={plan.planName}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل اسم الخطة"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">الرام</label>
                <input
                  type="text"
                  name="ram"
                  value={plan.ram}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="مثال: 8GB"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">المعالج</label>
                <input
                  type="text"
                  name="cpu"
                  value={plan.cpu}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="مثال: Intel Core i7"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">مساحة التخزين</label>
                <input
                  type="text"
                  name="storage"
                  value={plan.storage}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="مثال: 500GB SSD"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">سرعة الاتصال</label>
                <input
                  type="text"
                  name="connectionSpeed"
                  value={plan.connectionSpeed}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="مثال: 1Gbps"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">الحماية</label>
                <input
                  type="text"
                  name="security"
                  value={plan.security}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="مثال: فايروول متقدم"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">قواعد البيانات</label>
                <input
                  type="text"
                  name="databases"
                  value={plan.databases}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="مثال: MySQL, PostgreSQL"
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-xs text-gray-300 mb-1">المجموعة</label>
                <input
                  type="text"
                  name="groupName"
                  value={searchTerm}
                  onChange={handleGroupSearch}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="البحث عن مجموعة"
                  required
                />
                {showDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-blue-800 bg-opacity-95 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredGroups.map((group) => (
                      <div
                        key={group._id}
                        className="px-4 py-2 hover:bg-blue-700/50 cursor-pointer text-white"
                        onClick={() => handleGroupSelect(group)}
                      >
                        {group.groupName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">الأسعار حسب المدة</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {plan.prices.map((priceObj, index) => (
                    <div key={index} className="flex flex-col">
                      <label className="text-xs text-white/60 mb-1">
                        {priceObj.duration} {priceObj.duration === 1 ? "شهر" : "أشهر"}
                      </label>
                      <input
                        type="number"
                        value={priceObj.price}
                        onChange={(e) => handlePriceChange(index, e.target.value)}
                        className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                        placeholder="السعر"
                        required={priceObj.duration === 1}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">رسوم الإعداد</label>
                <input
                  type="number"
                  name="setupFee"
                  value={plan.setupFee}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="أدخل رسوم الأعداد"
                  required
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">الكمية</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="quantity"
                    value={plan.quantity}
                    onChange={handleChange}
                    className={`${plan.isUnlimited ? "cursor-not-allowed" : ""} w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200`}
                    placeholder="أدخل الكمية"
                    disabled={plan.isUnlimited}
                    readOnly={plan.isUnlimited}
                  />
                  <div
                    onClick={handleToggle}
                    className={`flex items-center space-x-2 text-sm cursor-pointer rounded mr-1 ${
                      plan.isUnlimited ? 'bg-green-600/90 hover:bg-green-600' : 'bg-gray-600/90 hover:bg-gray-600'
                    }`}
                  >
                    <span className={`flex items-center gap-2 px-2 py-2 rounded transition-colors ${
                      plan.isUnlimited ? "text-white/100" : "text-white/80"
                    } whitespace-nowrap`}>
                      {plan.isUnlimited ? (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          <span>لانهائي</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>لانهائي</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs text-gray-300 mb-1">رابط المنتج</label>
                <input
                  type="text"
                  name="productLink"
                  value={plan.productLink}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                  placeholder="https://example.com/(product)"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600/90 hover:bg-gray-600 rounded flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                حفظ الخطة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddGameServerPlan;