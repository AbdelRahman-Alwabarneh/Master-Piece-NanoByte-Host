import React, { useState,useEffect } from "react";
import { Save, X, ChevronsUpDown, Plus, Minus, Infinity } from "lucide-react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addVPS } from "../../Redux/Slice/VPSManagementSlice";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
const AddVPSPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [groups, setGroups] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [plan, setPlan] = useState({
    name: "",
    ram: "",
    processor: "",
    storage: "",
    connectionSpeed: "",
    protection: "",
    prices: Array.from({ length: 6 }, (_, i) => ({
      duration: i + 1,
      price: "",
    })),
    quantity: "",
    isUnlimited: isUnlimited,
    productLink: "",
    groupId: "",
    groupName: "",
  });
  
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_VPS_GROUP);
      setGroups(response.data.AllvpsGroup);
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
      text: "هل تريد إضافة خطة الـ VPS الجديدة؟",
      icon: "warning",
      iconColor: "#ffcc00",
      background: "#18296C",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#1E38A3",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addVPS({ plan }))
          .unwrap()
          .then((response) => {
            const addedVPSId = response.VPS._id;
            Swal.fire({
              title: "تمت الإضافة!",
              text: "تم إضافة خطة الـ VPS بنجاح.",
              icon: "success",
              iconColor: "#28a745",
              background: "#18296C",
              color: "#ffffff",
              confirmButtonColor: "#1E38A3",
              confirmButtonText: "موافق",
            }).then( async () => {
              await axios.patch(`${import.meta.env.VITE_VPS_GROUP}/${addedVPSId}`, {plan});
              navigate(`/VPSDetailsManagement/${addedVPSId}`);
            });
          })
          .catch((error) => {
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
          });
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
    <div className="min-h-screen bg-gradient-to-br text-white font-cairo">
      <Sidebar />
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 md:mr-64 mr-[75px]">
        <form
          onSubmit={handleSubmit}
          className=" mx-auto bg-white/5 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-4 sm:px-8 sm:py-6 border-b border-white/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
            إضافة خطة VPS جديدة
            </h2>
          </div>
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                اسم الخطة
              </label>
              <input
                type="text"
                name="name"
                value={plan.name}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="أدخل اسم الخطة"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                الرام
              </label>
              <input
                type="text"
                name="ram"
                value={plan.ram}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="مثال: 8GB"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                المعالج
              </label>
              <input
                type="text"
                name="processor"
                value={plan.processor}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="مثال: Intel Core i7"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                مساحة التخزين
              </label>
              <input
                type="text"
                name="storage"
                value={plan.storage}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="مثال: 500GB SSD"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                سرعة الاتصال
              </label>
              <input
                type="text"
                name="connectionSpeed"
                value={plan.connectionSpeed}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="مثال: 1Gbps"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                الحماية
              </label>
              <input
                type="text"
                name="protection"
                value={plan.protection}
                onChange={handleChange} 
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="مثال: فايروول متقدم"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-white/80 mb-2">
                المجموعة
              </label>
              <input
                type="text"
                name="groupName"
                value={searchTerm}
                onChange={handleGroupSearch}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="البحث عن مجموعة"
                required
              />
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-[#6c7ab8] rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredGroups.map((group) => (
                    <div
                      key={group._id}
                      className="px-4 py-2 hover:bg-white/20 cursor-pointer text-white"
                      onClick={() => handleGroupSelect(group)}
                    >
                      {group.groupName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                الأسعار حسب المدة
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {plan.prices.map((priceObj, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-xs text-white/60 mb-1">
                      {priceObj.duration}{" "}
                      {priceObj.duration === 1 ? "شهر" : "أشهر"}
                    </label>
                    <input
                      type="number"
                      value={priceObj.price}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                      placeholder="السعر"
                      required={priceObj.duration === 1 ? true : false}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                الكمية
              </label>
              <div className="flex items-center">
                <div className="flex-grow ml-2">
                  <input
                    type="number"
                    name="quantity"
                    value={plan.quantity}
                    onChange={handleChange}
                    className={`${
                      plan.isUnlimited ? "cursor-not-allowed" : null
                    } w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200`}
                    placeholder="أدخل الكمية"
                    disabled={plan.isUnlimited}
                    readOnly={plan.isUnlimited}
                  />
                </div>
                <div
                  onClick={handleToggle}
                  className={`flex items-center space-x-2 cursor-pointer px-4 py-3 rounded-lg ${
                    plan.isUnlimited ? "bg-green-500" : "bg-white/5"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      plan.isUnlimited ? "text-white" : "text-white/80"
                    } whitespace-nowrap`}
                  >
                    {plan.isUnlimited ? "لا نهائي" : "محدود"}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                رابط المنتج
              </label>
              <input
                type="text"
                name="productLink"
                value={plan.productLink}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="https://example.com/(product)"
                required
              />
            </div>
          </div>
          <div className="px-6 py-4 sm:px-8 sm:py-6 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0">
            <button
              type="button"
              className="w-full ml-2 sm:w-auto px-6 py-2 border border-white/30 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200 flex items-center justify-center"
            >
              <X className="w-5 h-5 ml-2" />
              إلغاء
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
            >
              <Save className="w-5 h-5 ml-2" />
              حفظ الخطة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVPSPlan;
