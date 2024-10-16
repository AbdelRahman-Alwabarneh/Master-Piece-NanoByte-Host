import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { VPSDetails, updateVPS } from "../../Redux/Slice/VPSManagementSlice";
import { useParams } from "react-router-dom";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import axios from "axios";

const VPSDetailsManagement = () => {
  const dispatch = useDispatch();
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
    subscriptionDurations: {
      oneMonth: { price: "", enabled: true },
      twoMonths: { price: "", enabled: true },
      threeMonths: { price: "", enabled: true },
      fourMonths: { price: "", enabled: true },
      fiveMonths: { price: "", enabled: true },
      sixMonths: { price: "", enabled: true },
    },
    setupFee: "",
    quantity: "",
    isUnlimited: isUnlimited,
    productLink: "",
    groupId: "",
    groupName: "",
    oldgroupId: "",
  });
  const { currentVPS, status } = useSelector((state) => state.VPSData);
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      dispatch(VPSDetails(id));
    }
    fetchGroups();
  }, [dispatch, id]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_VPS_GROUP);
      setGroups(response.data.AllvpsGroup);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    if (currentVPS) {
      setPlan((prev) => ({
        ...prev,
        name: currentVPS.VPSDetails?.planName || "",
        ram: currentVPS.VPSDetails?.ram || "",
        processor: currentVPS.VPSDetails?.cpu || "",
        storage: currentVPS.VPSDetails?.storage || "",
        connectionSpeed: currentVPS.VPSDetails?.connectionSpeed || "",
        protection: currentVPS.VPSDetails?.security || "",
        subscriptionDurations: {
          oneMonth: {
            price: currentVPS.VPSDetails?.subscriptionDurations?.oneMonth?.price || "",
            enabled: currentVPS.VPSDetails?.subscriptionDurations?.oneMonth?.enabled || true,
          },
          twoMonths: {
            price: currentVPS.VPSDetails?.subscriptionDurations?.twoMonths?.price || "",
            enabled: currentVPS.VPSDetails?.subscriptionDurations?.twoMonths?.enabled || true,
          },
          threeMonths: {
            price: currentVPS.VPSDetails?.subscriptionDurations?.threeMonths?.price || "",
            enabled: currentVPS.VPSDetails?.subscriptionDurations?.threeMonths?.enabled || true,
          },
          fourMonths: {
            price: currentVPS.VPSDetails?.subscriptionDurations?.fourMonths?.price || "",
            enabled: currentVPS.VPSDetails?.subscriptionDurations?.fourMonths?.enabled || true,
          },
          fiveMonths: {
            price: currentVPS.VPSDetails?.subscriptionDurations?.fiveMonths?.price || "",
            enabled: currentVPS.VPSDetails?.subscriptionDurations?.fiveMonths?.enabled || true,
          },
          sixMonths: {
            price: currentVPS.VPSDetails?.subscriptionDurations?.sixMonths?.price || "",
            enabled: currentVPS.VPSDetails?.subscriptionDurations?.sixMonths?.enabled || true,
          },
        },
        setupFee: currentVPS.VPSDetails?.setupFee || 0,
        quantity: currentVPS.VPSDetails?.quantity || "",
        isUnlimited: currentVPS.VPSDetails?.isUnlimited || false,
        productLink: currentVPS.VPSDetails?.productLink || "",
        groupId: currentVPS.VPSDetails?.groupId || "",
        groupName: currentVPS.VPSDetails?.groupName || "",
        oldgroupId: currentVPS.VPSDetails?.groupId || "",
      }));
    }
  }, [currentVPS]);
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <NoDataFound />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlan((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePriceChange = (duration, value) => {
    setPlan((prev) => ({
      ...prev,
      subscriptionDurations: {
        ...prev.subscriptionDurations,
        [duration]: {
          ...prev.subscriptionDurations[duration],
          price: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "هل تريد تحديث خطة الـ VPS؟",
      icon: "warning",
      iconColor: "#ffcc00",
      background: "#18296C",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#1E38A3",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
      padding: "2em",
      backdrop: "rgba(22, 30, 65, 0.8)",
      position: "center",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(updateVPS({ plan, id }))
          // تنفيذ PATCH request باستخدام axios
          await axios.patch(`${import.meta.env.VITE_VPS_GROUP}/${id}`, {plan});

          // تحديث البيانات بعد النجاح
          dispatch(VPSDetails(id));
          Swal.fire({
            title: "تم التحديث!",
            text: "تم تحديث خطة الـ VPS بنجاح.",
            icon: "success",
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "موافق",
            padding: "2em",
            backdrop: "rgba(22, 30, 65, 0.8)",
            position: "center",
          });
        } catch (error) {
          Swal.fire({
            title: "خطأ!",
            text: "حدث خطأ أثناء تحديث الخطة.",
            icon: "error",
            iconColor: "#ff0000",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "موافق",
            padding: "2em",
            backdrop: "rgba(22, 30, 65, 0.8)",
            position: "center",
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
              إدارة خطة VPS
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
                type="search"
                name="groupName"
                value={plan.groupName}
                onChange={handleGroupSearch}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="البحث عن مجموعة"
                required
              />
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-[#6c7ab8] backdrop-blur-none rounded-md shadow-lg max-h-60 overflow-auto">
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
                {Object.entries(plan.subscriptionDurations).map(
                  ([durationKey, priceObj], index) => {
                    const durationMapping = {
                      oneMonth: 1,
                      twoMonths: 2,
                      threeMonths: 3,
                      fourMonths: 4,
                      fiveMonths: 5,
                      sixMonths: 6,
                    };

                    const durationValue = durationMapping[durationKey];

                    return (
                      <div key={durationKey} className="flex flex-col">
                        <label className="text-xs text-white/60 mb-1">
                          {durationValue} {durationValue === 1 ? "شهر" : "أشهر"}
                        </label>
                        <input
                          type="number"
                          value={priceObj.price}
                          onChange={(e) =>
                            handlePriceChange(durationKey, e.target.value)
                          }
                          className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                          placeholder="السعر"
                          required={priceObj.duration === 1 ? true : false}
                          
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
              رسوم الإعداد
              </label>
              <input
                type="number"
                name="setupFee"
                value={plan.setupFee}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-white placeholder-white/50 px-4 py-2 transition-all duration-200"
                placeholder="أدخل رسوم الأعداد"
                required
              />
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
                        plan.isUnlimited ? "text-white/100" : "text-white/80"
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

export default VPSDetailsManagement;
