import React, { useState, useEffect } from "react";
import { Save, X , ToggleRight,ToggleLeft} from "lucide-react";
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
    <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white font-cairo">
      <Sidebar />
      <div className="p-2 sm:p-4 md:mr-64 mr-[75px] text-sm mt-2">
        <div className="max-w-full mx-auto">
          <div className="bg-blue-950 bg-opacity-30 hover:shadow-blue-800/10 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="flex justify-between border-b border-blue-700 pb-4 px-4 pt-4">
              <h2 className="text-lg font-semibold">إدارة خطة VPS</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4" dir="rtl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs text-gray-300 mb-1">اسم الخطة</label>
                  <input
                    type="text"
                    name="name"
                    value={plan.name}
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
                    name="processor"
                    value={plan.processor}
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
                    name="protection"
                    value={plan.protection}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="مثال: فايروول متقدم"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-xs text-gray-300 mb-1">المجموعة</label>
                  <input
                    type="text"
                    name="groupName"
                    value={plan.groupName}
                    onChange={handleGroupSearch}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                    className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
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
                  <label className="block text-xs text-gray-300 mb-1">الأسعار حسب المدة</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.entries(plan.subscriptionDurations).map(([durationKey, priceObj], index) => {
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
                            onChange={(e) => handlePriceChange(durationKey, e.target.value)}
                            className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                            placeholder="السعر"
                            required={durationValue === 1}
                          />
                        </div>
                      );
                    })}
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
                      className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
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
                  <span
                    className={`flex items-center gap-2 px-2 py-2 rounded transition-colors ${
                        plan.isUnlimited ? "text-white/100" : "text-white/80"
                    } whitespace-nowrap`}
                  >
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
                    placeholder="أدخل رابط المنتج"
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

export default VPSDetailsManagement;
