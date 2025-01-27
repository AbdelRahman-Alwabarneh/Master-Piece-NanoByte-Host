import React, { useState, useEffect } from 'react';
import { Save, X, Search, Tag, Calendar, Percent, DollarSign, Hash, Users, FileText, Server, Database,TicketPercent } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../Components/Sidebar/Sidebar";

const AddDiscountCode = () => {
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState({
    codeName: '',
    discountValue: '',
    discountType: 'percentage',
    authorizedUserId: [],
    startTime: null,
    expiresAt: null,
    isActive: true,
    maxUsage: '',
    maxUsagePerUser: '',
    applicableServiceIds: [],
    adminNotes: '',
  });
  const [vpsSearchTerm, setVpsSearchTerm] = useState('');
  const [dedicatedSearchTerm, setDedicatedSearchTerm] = useState('');
  const [vpsDropdownOpen, setVpsDropdownOpen] = useState(false);
  const [dedicatedDropdownOpen, setDedicatedDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vpsPlans, setVpsPlans] = useState([]);
  const [dedicatedServers, setDedicatedServers] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchVpsPlans();
    fetchDedicatedServers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/usersData`);
      setUsers(response.data.UsersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire('خطأ!', 'فشل في جلب بيانات المستخدمين.', 'error');
    }
  };

  const fetchVpsPlans = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/vpsManagement`);
      setVpsPlans(response.data.VPSPlanData);
    } catch (error) {
      console.error('Error fetching VPS plans:', error);
      Swal.fire('خطأ!', 'فشل في جلب خطط VPS.', 'error');
    }
  };

  const fetchDedicatedServers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/DedicatedServerManagement`);
      setDedicatedServers(response.data.DedicatedServerData);
    } catch (error) {
      console.error('Error fetching Dedicated Servers:', error);
      Swal.fire('خطأ!', 'فشل في جلب خوادم مخصصة.', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDiscountCode(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateDates = () => {
    if (discountCode.startTime && discountCode.expiresAt) {
      const start = new Date(discountCode.startTime);
      const end = new Date(discountCode.expiresAt);
      if (start >= end) {
        return "تاريخ البدء يجب أن يكون قبل تاريخ الانتهاء";
      }
    }
    return null;
  };

  const validateUsageLimits = () => {
    const maxUsage = parseInt(discountCode.maxUsage);
    const maxUsagePerUser = parseInt(discountCode.maxUsagePerUser);
    if (maxUsage && maxUsagePerUser && maxUsagePerUser > maxUsage) {
      return "الحد الأقصى للاستخدام لكل مستخدم يجب ألا يتجاوز الحد الأقصى للاستخدام";
    }
    return null;
  };

  const toggleUserSelection = (userId) => {
    setDiscountCode(prev => ({
      ...prev,
      authorizedUserId: prev.authorizedUserId.includes(userId)
        ? prev.authorizedUserId.filter(id => id !== userId)
        : [...prev.authorizedUserId, userId]
    }));
  };

  const toggleServiceSelection = (serviceId) => {
    setDiscountCode(prev => ({
      ...prev,
      applicableServiceIds: prev.applicableServiceIds.includes(serviceId)
        ? prev.applicableServiceIds.filter(id => id !== serviceId)
        : [...prev.applicableServiceIds, serviceId]
    }));
  };

  const filteredVpsPlans = vpsPlans.filter(plan =>
    plan.planName.toLowerCase().includes(vpsSearchTerm.toLowerCase())
  );

  const filteredDedicatedServers = dedicatedServers.filter(server =>
    server.planTitle.toLowerCase().includes(dedicatedSearchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateCode = () => {
    const newCode = Math.random().toString(36).substring(2, 12).toUpperCase();
    setDiscountCode({ ...discountCode, codeName: newCode });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dateError = validateDates();
    const usageError = validateUsageLimits();
    
    if (dateError || usageError) {
      Swal.fire({
        title: "خطأ!",
        text: dateError || usageError,
        icon: "error",
        iconColor: "#ff0000",
        background: "#18296C",
        color: "#ffffff",
        confirmButtonColor: "#1E38A3",
        confirmButtonText: "موافق"
      });
      return;
    }
  
    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد إضافة كود الخصم الجديد؟",
        icon: "warning",
        iconColor: "#ffcc00",
        background: "#18296C",
        color: "#ffffff",
        showCancelButton: true,
        confirmButtonColor: "#1E38A3",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، أضف الكود",
        cancelButtonText: "إلغاء"
      });
  
      if (result.isConfirmed) {
        const response = await axios.post(`${import.meta.env.VITE_API_URL_ADMIN}/api/discountCode`, discountCode);
        const newServerId = response.data.discountCode._id;
        if (response.status === 201) {
          Swal.fire({
            title: 'تم بنجاح!',
            text: 'تم إضافة كود الخصم بنجاح.',
            icon: 'success',
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: 'حسناً'
          }).then(() => {
            navigate(`/DetailsDiscountCode/${newServerId}`);
          });
        } else {
          throw new Error("حدث خطأ أثناء الإضافة");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ!",
        text: "فشل في إضافة كود الخصم.",
        icon: "error",
        iconColor: "#ff0000",
        background: "#18296C",
        color: "#ffffff",
        confirmButtonColor: "#1E38A3",
        confirmButtonText: "موافق"
      });
      console.error("Error:", error);
    }
  };
  

  return (
<div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white font-cairo">
  <Sidebar />
  <div className="p-2 sm:p-4 md:mr-64 mr-[75px] text-sm mt-2">
    <div className="max-w-full mx-auto">
      <div className="bg-blue-950 bg-opacity-30 hover:shadow-blue-800/10 rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <div className="flex justify-between border-b border-blue-700 pb-2 mb-4">
          <h2 className="text-lg font-semibold">إضافة كود خصم جديد</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs text-gray-300 mb-1">اسم الكود</label>
              <div className="relative">
                <input
                  type="text"
                  name="codeName"
                  value={discountCode.codeName}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200 pr-10"
                  required
                />
                <Tag className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={generateCode}
                  className="absolute top-1.5 left-2 text-gray-400 rounded-full p-1 transition-all duration-200 hover:text-white"
                >
                  <TicketPercent className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-gray-300 mb-1">قيمة الخصم</label>
              <div className="relative">
                <input
                  type="number"
                  name="discountValue"
                  value={discountCode.discountValue}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200 pr-10"
                  required
                />
                {discountCode.discountType === 'percentage' ? 
                  <Percent className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" /> :
                  <DollarSign className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
                }
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-xs text-gray-300 mb-1">نوع الخصم</label>
              <select
                name="discountType"
                value={discountCode.discountType}
                onChange={handleChange}
                className="w-full text-xs bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-1 transition-all duration-200"
              >
                <option value="percentage" className="bg-blue-950 text-xs">نسبة مئوية</option>
                <option value="fixed" className="bg-blue-950 text-xs">مبلغ ثابت</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-gray-300 mb-1">تاريخ البدء</label>
              <div className="relative">
                <input
                  type="datetime-local"
                  name="startTime"
                  value={discountCode.startTime || ''}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200"
                />
                      <Calendar 
        className="absolute top-2.5 right-3 h-5 w-5 text-white/50 cursor-pointer" 
        onClick={() => document.querySelector('input[name="startTime"]').showPicker()}
      />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-gray-300 mb-1">تاريخ الانتهاء</label>
              <div className="relative">
                <input
                  type="datetime-local"
                  name="expiresAt"
                  value={discountCode.expiresAt || ''}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200"
                />
                 <Calendar 
        className="absolute top-2.5 right-3 h-5 w-5 text-white/50 cursor-pointer" 
        onClick={() => document.querySelector('input[name="expiresAt"]').showPicker()}
      />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-gray-300 mb-1">الحد الأقصى للاستخدام</label>
              <div className="relative">
                <input
                  type="number"
                  name="maxUsage"
                  value={discountCode.maxUsage}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200 pr-10"
                />
                <Hash className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-gray-300 mb-1">الحد الأقصى للاستخدام لكل مستخدم</label>
              <div className="relative">
                <input
                  type="number"
                  name="maxUsagePerUser"
                  value={discountCode.maxUsagePerUser}
                  onChange={handleChange}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200 pr-10"
                />
                <Hash className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-2">
              <label className="block text-xs text-gray-300 mb-1">المستخدمون المصرح لهم</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setDropdownOpen(true)}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200 pr-10"
                  placeholder="ابحث عن المستخدمين..."
                />
                <Search className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
                <div
                  onClick={() => {setDropdownOpen(false); setSearchTerm("");}}
                  className="cursor-pointer absolute top-2 left-2 text-white rounded-full p-1 hover:bg-red-500/50 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </div>
                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-blue-950 bg-opacity-95 rounded-lg border border-blue-700 shadow-lg max-h-48 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => toggleUserSelection(user._id)}
                        className={`flex justify-between items-center p-2 cursor-pointer hover:bg-blue-800/50 ${
                          discountCode.authorizedUserId.includes(user._id) ? 'bg-blue-700/50' : ''
                        }`}
                      >
                        <span className="text-white flex items-center">
                          <Users className="h-4 w-4 ml-2" />
                          {user.firstName} ({user.email})
                        </span>
                        {discountCode.authorizedUserId.includes(user._id) && (
                          <span className="text-blue-300">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {discountCode.authorizedUserId.length > 0 && (
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <h3 className="text-xs text-gray-300 flex items-center">
                  <Users className="h-5 w-5 ml-2" />
                  المستخدمون المختارون ({discountCode.authorizedUserId.length})
                </h3>
                <div className="bg-gray-400/10 rounded border border-blue-700 p-4 max-h-40 overflow-auto">
                  {users
                    .filter((user) => discountCode.authorizedUserId.includes(user._id))
                    .map((user) => (
                      <div key={user._id} className="flex justify-between items-center mb-2 pb-2 border-b border-blue-700 last:border-b-0">
                        <span className="text-white text-sm">
                          {user.firstName} ({user.email})
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleUserSelection(user._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="col-span-1 sm:col-span-2 space-y-2">
              <label className="block text-xs text-gray-300 mb-1">خطط VPS المطبقة</label>
              <div className="relative">
                <input
                  type="text"
                  value={vpsSearchTerm}
                  onChange={(e) => setVpsSearchTerm(e.target.value)}
                  onFocus={() => setVpsDropdownOpen(true)}
                  className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200 pr-10"
                  placeholder="ابحث عن خطط VPS..."
                />
                   <div
                  onClick={() => { setVpsDropdownOpen(false); setVpsSearchTerm(""); }}
                  className="cursor-pointer absolute top-2 left-2 text-white rounded-full p-1 hover:bg-red-500/50 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </div>
                <Search className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
                {vpsDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-blue-950 bg-opacity-95 rounded-lg border border-blue-700 shadow-lg max-h-48 overflow-y-auto">
                    {filteredVpsPlans.map((plan) => (
                      <div
                        key={plan._id}
                        onClick={() => toggleServiceSelection(plan._id)}
                        className={`flex justify-between items-center p-2 cursor-pointer hover:bg-blue-800/50 ${
                          discountCode.applicableServiceIds.includes(plan._id) ? 'bg-blue-700/50' : ''
                        }`}
                      >
                        <span className="text-white flex items-center">
                          <Server className="h-4 w-4 ml-2" />
                          {plan.planName}
                        </span>
                        {discountCode.applicableServiceIds.includes(plan._id) && (
                          <span className="text-blue-300">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {discountCode.applicableServiceIds.some(id => vpsPlans.some(plan => plan._id === id)) && (
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <h3 className="text-xs text-gray-300 flex items-center">
                  <Server className="h-5 w-5 ml-2" />
                  خطط VPS المختارة ({discountCode.applicableServiceIds.filter(id => vpsPlans.some(plan => plan._id === id)).length})
                </h3>
                <div className="bg-gray-400/10 rounded border border-blue-700 p-4 max-h-40 overflow-auto">
                  {vpsPlans
                    .filter((plan) => discountCode.applicableServiceIds.includes(plan._id))
                    .map((plan) => (
                      <div key={plan._id} className="flex justify-between items-center mb-2 pb-2 border-b border-blue-700 last:border-b-0">
                        <span className="text-white text-sm">
                          {plan.planName}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleServiceSelection(plan._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

{/* Dedicated Servers Selection */}
<div className="col-span-1 sm:col-span-2 space-y-2">
  <label className="block text-xs text-gray-300 mb-1">الخوادم المخصصة المطبقة</label>
  <div className="relative">
    <input
      type="text"
      value={dedicatedSearchTerm}
      onChange={(e) => setDedicatedSearchTerm(e.target.value)}
      onFocus={() => setDedicatedDropdownOpen(true)}
      className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200 pr-10"
      placeholder="ابحث عن الخوادم المخصصة..."
    />
        <div
                 onClick={() => { setDedicatedDropdownOpen(false);}}
                  className="cursor-pointer absolute top-2 left-2 text-white rounded-full p-1 hover:bg-red-500/50 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </div>
    <Search className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
    {dedicatedDropdownOpen && (
      <div className="absolute z-10 mt-1 w-full bg-blue-950 bg-opacity-95 rounded-lg border border-blue-700 shadow-lg max-h-48 overflow-y-auto">
        {filteredDedicatedServers.map((server) => (
          <div
            key={server._id}
            onClick={() => toggleServiceSelection(server._id)}
            className={`flex justify-between items-center p-2 cursor-pointer hover:bg-blue-800/50 ${
              discountCode.applicableServiceIds.includes(server._id) ? 'bg-blue-700/50' : ''
            }`}
          >
            <span className="text-white flex items-center">
              <Database className="h-4 w-4 ml-2" />
              {server.planTitle}
            </span>
            {discountCode.applicableServiceIds.includes(server._id) && (
              <span className="text-blue-300">✓</span>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

{/* Selected Dedicated Servers Display */}
{discountCode.applicableServiceIds.some(id => dedicatedServers.some(server => server._id === id)) && (
  <div className="col-span-1 sm:col-span-2 space-y-2">
    <h3 className="text-xs text-gray-300 flex items-center">
      <Database className="h-5 w-5 ml-2" />
      الخوادم المخصصة المختارة ({discountCode.applicableServiceIds.filter(id => dedicatedServers.some(server => server._id === id)).length})
    </h3>
    <div className="bg-gray-400/10 rounded border border-blue-700 p-4 max-h-40 overflow-auto">
      {dedicatedServers
        .filter((server) => discountCode.applicableServiceIds.includes(server._id))
        .map((server) => (
          <div key={server._id} className="flex justify-between items-center mb-2 pb-2 border-b border-blue-700 last:border-b-0">
            <span className="text-white text-sm">
              {server.planTitle}
            </span>
            <button
              type="button"
              onClick={() => toggleServiceSelection(server._id)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
    </div>
  </div>
)}

{/* Admin Notes */}
<div className="col-span-1 sm:col-span-2 space-y-2">
  <label className="block text-xs text-gray-300 mb-1">ملاحظات الإدارة</label>
  <div className="relative">
    <textarea
      name="adminNotes"
      value={discountCode.adminNotes}
      onChange={handleChange}
      className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 transition-all duration-200 h-24 max-h-64 min-h-28 pr-10"
    />
    <FileText className="absolute top-2.5 right-3 h-5 w-5 text-gray-400" />
  </div>
</div>

{/* Form Actions */}
<div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 sm:space-x-reverse mt-6">
  <button
    type="button"
    className="w-full sm:w-auto px-6 py-2 border border-blue-700 rounded bg-gray-400/10 text-white hover:bg-blue-800/50 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center"
  >
    <X className="h-5 w-5 ml-2" />
    إلغاء
  </button>
  <button
    type="submit"
    className="w-full sm:w-auto px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center"
  >
    <Save className="h-5 w-5 ml-2" />
    حفظ كود الخصم
  </button>
</div>
</div>
        </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default AddDiscountCode;