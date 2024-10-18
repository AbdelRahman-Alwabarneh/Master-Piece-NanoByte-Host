import React, { useState, useEffect } from 'react';
import { Save, X, Search, Tag, Calendar, Percent, DollarSign, Hash, Users, FileText, Server, Database, TicketPercent } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../Components/Sidebar/Sidebar";

const DetailsDiscountCode = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    fetchDiscountCodeDetails();
    fetchUsers();
    fetchVpsPlans();
    fetchDedicatedServers();
  }, [id]);

  const fetchDiscountCodeDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_DISCOUNT_CODE}/${id}`);
      const details = response.data.DiscountCodeDetails;
      setDiscountCode({
        ...details,
        startTime: details.startTime ? new Date(details.startTime).toISOString().slice(0, 16) : null,
        expiresAt: details.expiresAt ? new Date(details.expiresAt).toISOString().slice(0, 16) : null,
      });
    } catch (error) {
      console.error('Error fetching discount code details:', error);
      Swal.fire('خطأ!', 'فشل في جلب تفاصيل كود الخصم.', 'error');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_USERS_DATA);
      setUsers(response.data.UsersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire('خطأ!', 'فشل في جلب بيانات المستخدمين.', 'error');
    }
  };

  const fetchVpsPlans = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_VPS_MANAGEMENT);
      setVpsPlans(response.data.VPSPlanData);
    } catch (error) {
      console.error('Error fetching VPS plans:', error);
      Swal.fire('خطأ!', 'فشل في جلب خطط VPS.', 'error');
    }
  };

  const fetchDedicatedServers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_DEDICATED_SERVER_MANAGEMENT);
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
        text: "هل تريد تحديث كود الخصم؟",
        icon: "warning",
        iconColor: "#ffcc00",
        background: "#18296C",
        color: "#ffffff",
        showCancelButton: true,
        confirmButtonColor: "#1E38A3",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، قم بالتحديث",
        cancelButtonText: "إلغاء"
      });
  
      if (result.isConfirmed) {
        const response = await axios.put(`${import.meta.env.VITE_DISCOUNT_CODE}/${id}`, discountCode);
        
        if (response.status === 200) {
          Swal.fire({
            title: 'تم بنجاح!',
            text: 'تم تحديث كود الخصم بنجاح.',
            icon: 'success',
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: 'حسناً'
          })
        } else {
          throw new Error("حدث خطأ أثناء التحديث");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ!",
        text: "فشل في تحديث كود الخصم.",
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
    <div className="min-h-screen bg-gradient-to-br text-white font-cairo">
      <Sidebar />
      <div className="p-4 text-sm sm:p-6 lg:p-8 md:mr-64 mr-[75px]">
        <form onSubmit={handleSubmit} className="mx-auto bg-white/5 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/20">
            <h2 className="text-2xl font-bold">تفاصيل كود الخصم</h2>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">اسم الكود</label>
                <div className="relative">
                  <input
                    type="text"
                    name="codeName"
                    value={discountCode.codeName}
                    onChange={handleChange}
                    className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10"
                    required
                  />
                  <Tag className="absolute top-2.5 right-3 h-5 w-5 text-white/50" />
                  <button
        type="button"
        onClick={generateCode} // وظيفة توليد الكود
        className="cursor-pointer absolute top-1.5 left-2 text-white rounded-full p-1 transition-all duration-200"
      >
        <TicketPercent className='h-5 w-5 text-white/50'/>
      </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">قيمة الخصم</label>
                <div className="relative">
                  <input
                    type="number"
                    name="discountValue"
                    value={discountCode.discountValue}
                    onChange={handleChange}
                    className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10"
                    required
                  />
                  {discountCode.discountType === 'percentage' ? 
                    <Percent className="absolute top-2.5 right-3 h-5 w-5 text-white/50" /> :
                    <DollarSign className="absolute top-2.5 right-3 h-5 w-5 text-white/50" />
                  }
                </div>
              </div>
            </div>
            {/* Discount Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">نوع الخصم</label>
              <select
                name="discountType"
                value={discountCode.discountType}
                onChange={handleChange}
                className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white px-4 py-2"
              >
                <option className="bg-[#6A7398]" value="percentage">نسبة مئوية</option>
                <option className="bg-[#6A7398]" value="fixed">مبلغ ثابت</option>
              </select>
            </div>
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">تاريخ البدء</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={discountCode.startTime || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 
                               focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10 
                               appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                  />
                  <Calendar 
                    className="absolute top-2.5 right-3 h-5 w-5 text-white/50 cursor-pointer" 
                    onClick={() => document.querySelector('input[name="startTime"]').showPicker()}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">تاريخ الانتهاء</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    name="expiresAt"
                    value={discountCode.expiresAt || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 
                               focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10 
                               appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                  />
                  <Calendar 
                    className="absolute top-2.5 right-3 h-5 w-5 text-white/50 cursor-pointer" 
                    onClick={() => document.querySelector('input[name="expiresAt"]').showPicker()}
                  />
                </div>
              </div>
            </div>
                        {/* Usage Limits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">الحد الأقصى للاستخدام</label>
                <div className="relative">
                  <input
                    type="number"
                    name="maxUsage"
                    value={discountCode.maxUsage}
                    onChange={handleChange}
                    className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10"
                  />
                  <Hash className="absolute top-2.5 right-3 h-5 w-5 text-white/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">الحد الأقصى للاستخدام لكل مستخدم</label>
                <div className="relative">
                  <input
                    type="number"
                    name="maxUsagePerUser"
                    value={discountCode.maxUsagePerUser}
                    onChange={handleChange}
                    className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10"
                  />
                  <Hash className="absolute top-2.5 right-3 h-5 w-5 text-white/50" />
                </div>
              </div>
            </div>
  
            {/* User Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">المستخدمون المصرح لهم</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setDropdownOpen(true)}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10"
                  placeholder="ابحث عن المستخدمين..."
                />
                <Search className="absolute top-2.5 right-3 h-5 w-5 text-white/50" />
                <div
                  onClick={() => {setDropdownOpen(false); setSearchTerm("");}}
                  className="cursor-pointer absolute top-2 left-2 text-white rounded-full p-1 hover:bg-red-500/50 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </div>
                {dropdownOpen && (
                  <div className="mt-1 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg max-h-48 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => toggleUserSelection(user._id)}
                        className={`flex justify-between items-center p-2 cursor-pointer hover:bg-white/20 ${
                          discountCode.authorizedUserId.includes(user._id) ? 'bg-blue-600/50' : ''
                        }`}
                      >
                        <span className="text-white flex items-center">
                          <Users className="h-4 w-4 mr-2" />
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
  
            {/* Selected Users Display */}
            {discountCode.authorizedUserId.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  المستخدمون المختارون ({discountCode.authorizedUserId.length})
                </h3>
                <div className="bg-white/10 rounded-lg border border-white/20 p-4 max-h-40 overflow-auto">
                  {users
                    .filter((user) => discountCode.authorizedUserId.includes(user._id))
                    .map((user) => (
                      <div key={user._id} className="flex justify-between items-center mb-2 pb-2 border-b border-white/20 last:border-b-0">
                        <span className="text-white text-sm">
                          {user.firstName} ({user.email})
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleUserSelection(user._id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
  
            {/* VPS Plans Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">خطط VPS المطبقة</label>
              <div className="relative">
                <input
                  type="text"
                  value={vpsSearchTerm}
                  onChange={(e) => setVpsSearchTerm(e.target.value)}
                  onFocus={() => setVpsDropdownOpen(true)}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10"
                  placeholder="ابحث عن خطط VPS..."
                />
                <Search className="absolute top-2.5 right-3 h-5 w-5 text-white/50" />
                <div
                  onClick={() => { setVpsDropdownOpen(false); setVpsSearchTerm(""); }}
                  className="cursor-pointer absolute top-2 left-2 text-white rounded-full p-1 hover:bg-red-500/50 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </div>
                {vpsDropdownOpen && (
                  <div className="mt-1 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg max-h-48 overflow-y-auto">
                    {filteredVpsPlans.map((plan) => (
                      <div
                        key={plan._id}
                        onClick={() => toggleServiceSelection(plan._id)}
                        className={`flex justify-between items-center p-2 cursor-pointer hover:bg-white/20 ${
                          discountCode.applicableServiceIds.includes(plan._id) ? 'bg-blue-600/50' : ''
                        }`}
                      >
                        <span className="text-white flex items-center">
                          <Server className="h-4 w-4 mr-2" />
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
  
            {/* Selected VPS Plans Display */}
            {discountCode.applicableServiceIds.some(id => vpsPlans.some(plan => plan._id === id)) && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  خطط VPS المختارة ({discountCode.applicableServiceIds.filter(id => vpsPlans.some(plan => plan._id === id)).length})
                </h3>
                <div className="bg-white/10 rounded-lg border border-white/20 p-4 max-h-40 overflow-auto">
                  {vpsPlans
                    .filter((plan) => discountCode.applicableServiceIds.includes(plan._id))
                    .map((plan) => (
                      <div key={plan._id} className="flex justify-between items-center mb-2 pb-2 border-b border-white/20 last:border-b-0">
                        <span className="text-white text-sm">
                          {plan.planName}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleServiceSelection(plan._id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Dedicated Servers Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">الخوادم المخصصة المطبقة</label>
              <div className="relative">
                <input
                  type="text"
                  value={dedicatedSearchTerm}
                  onChange={(e) => setDedicatedSearchTerm(e.target.value)}
                  onFocus={() => setDedicatedDropdownOpen(true)}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10"
                  placeholder="ابحث عن الخوادم المخصصة..."
                />
                <Search className="absolute top-2.5 right-3 h-5 w-5 text-white/50" />
                <div
                  onClick={() => { setDedicatedDropdownOpen(false); }}
                  className="cursor-pointer absolute top-2 left-2 text-white rounded-full p-1 hover:bg-red-500/50 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </div>
                {dedicatedDropdownOpen && (
                  <div className="relative">
                    <div className="mt-1 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg max-h-48 overflow-y-auto">
                      {filteredDedicatedServers.map((server) => (
                        <div
                          key={server._id}
                          onClick={() => toggleServiceSelection(server._id)}
                          className={`flex justify-between items-center p-2 cursor-pointer hover:bg-white/20 ${
                            discountCode.applicableServiceIds.includes(server._id) ? 'bg-blue-600/50' : ''
                          }`}
                        >
                          <span className="text-white flex items-center">
                            <Database className="h-4 w-4 mr-2" />
                            {server.planTitle}
                          </span>
                          {discountCode.applicableServiceIds.includes(server._id) && (
                            <span className="text-blue-300">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Dedicated Servers Display */}
            {discountCode.applicableServiceIds.some(id => dedicatedServers.some(server => server._id === id)) && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  الخوادم المخصصة المختارة ({discountCode.applicableServiceIds.filter(id => dedicatedServers.some(server => server._id === id)).length})
                </h3>
                <div className="bg-white/10 rounded-lg border border-white/20 p-4 max-h-40 overflow-auto">
                  {dedicatedServers
                    .filter((server) => discountCode.applicableServiceIds.includes(server._id))
                    .map((server) => (
                      <div key={server._id} className="flex justify-between items-center mb-2 pb-2 border-b border-white/20 last:border-b-0">
                        <span className="text-white text-sm">
                          {server.planTitle}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleServiceSelection(server._id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

              {/* Admin Notes */}
              <div>
              <label className="block text-sm font-medium mb-2">ملاحظات الإدارة</label>
              <div className="relative">
                <textarea
                  name="adminNotes"
                  value={discountCode.adminNotes}
                  onChange={handleChange}
                  className="w-full bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white px-4 py-2 pr-10 h-24 max-h-64 min-h-28"
                />
                             <FileText className="absolute top-2.5 right-3 h-5 w-5 text-white/50" />
              </div>
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
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsDiscountCode;
