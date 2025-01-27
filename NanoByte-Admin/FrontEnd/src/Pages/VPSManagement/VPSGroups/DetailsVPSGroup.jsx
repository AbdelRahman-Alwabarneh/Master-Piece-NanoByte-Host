import React, { useEffect, useState } from "react";
import axios from "axios";
import { Save, X, Search, User, Users } from "lucide-react";
import Swal from "sweetalert2";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";

const DetailsVPSGroup = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/vpsGroup/${id}`);
        const groupData = response.data.DetailsvpsGroup;
        setGroup(groupData);
        setGroupName(groupData.groupName);
        setGroupDescription(groupData.description);
        setIsVisible(groupData.isVisible);
        setSelectedUsers(groupData.users);
      } catch (error) {
        console.error("Error fetching group data:", error);
        Swal.fire("خطأ!", "فشل في جلب بيانات المجموعة.", "error");
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/usersData`);
        setUsers(response.data.UsersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire("خطأ!", "فشل في جلب بيانات المستخدمين.", "error");
      }
    };

    fetchGroupData();
    fetchUserData();
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const groupData = {
      groupName,
      description: groupDescription,
      isVisible,
      users: selectedUsers,
    };
  
    Swal.fire({
      title: "تأكيد تحديث المجموعة",
      text: "هل أنت متأكد من تحديث هذه المجموعة؟",
      icon: "question",
      iconColor: "#ffcc00", // اللون المخصص للأيقونة
      background: "#18296C", // اللون الخلفي
      color: "#ffffff", // لون النص
      showCancelButton: true,
      confirmButtonText: "نعم، قم بالتحديث",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#1E38A3", // لون زر التأكيد
      cancelButtonColor: "#d33", // لون زر الإلغاء
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL_ADMIN}/api/vpsGroup/${id}`,
            { groupData }
          );
          Swal.fire({
            title: "تم بنجاح!",
            text: response.data.message,
            icon: "success",
            iconColor: "#28a745", // اللون المخصص لأيقونة النجاح
            background: "#18296C", // اللون الخلفي
            color: "#ffffff", // لون النص
            confirmButtonColor: "#1E38A3", // لون زر التأكيد
            confirmButtonText: "حسناً",
          });
        } catch (error) {
          Swal.fire({
            title: "خطأ!",
            text: "فشل في تحديث المجموعة.",
            icon: "error",
            iconColor: "#ff0000", // اللون المخصص لأيقونة الخطأ
            background: "#18296C", // اللون الخلفي
            color: "#ffffff", // لون النص
            confirmButtonColor: "#1E38A3", // لون زر التأكيد
            confirmButtonText: "موافق",
          });
          console.error("Error updating group:", error);
        }
      }
    });
  };
  

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  if (!group) {
    return <div className="min-h-screen bg-gradient-to-br text-white font-cairo md:mr-64 mr-[75px] text-sm sm:text-base flex items-center justify-center">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br text-white font-cairo md:mr-64 mr-[75px] text-sm sm:text-base">
      <Sidebar />
      <div className="p-2 sm:p-4 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-blue-950 bg-opacity-30 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-blue-500/10"
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/20">
            <h2 className="text-xl sm:text-2xl font-bold text-white">تعديل المجموعة</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
                اسم المجموعة
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full bg-gray-500/10 bg-opacity-50 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white placeholder-white/50 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 text-xs sm:text-sm"
                placeholder="أدخل اسم المجموعة"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
                وصف المجموعة
              </label>
              <textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="w-full bg-gray-500/10 bg-opacity-50 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white placeholder-white/50 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 text-xs sm:text-sm max-h-40 h-40"
                placeholder="أدخل وصف المجموعة"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => setIsVisible(!isVisible)}
                className="mr-2 rounded border-white/30 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-xs sm:text-sm mr-1 text-white/80">
              إظهار المجموعة
              </label>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
                اختيار المستخدمين
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setDropdownOpen(true)}
                  className="w-full bg-gray-500/10 bg-opacity-50 rounded-lg border border-white/10 focus:border-blue-400 focus:ring focus:ring-blue-300 text-white placeholder-white/50 px-3 sm:px-4 py-1.5 sm:py-2 pr-8 sm:pr-10 transition-all duration-200 text-xs sm:text-sm"
                  placeholder="ابحث عن المستخدمين..."
                />   
                <div
                  onClick={() => {setDropdownOpen(false); setSearchTerm("");}}
                  className="cursor-pointer absolute top-1.5 sm:top-[9px] left-1 sm:left-2 text-white rounded-full p-0.5 sm:p-1 hover:bg-[#ff343465] transition-all duration-200"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <Search className="absolute top-1.5 sm:top-2.5 right-2 sm:right-3 h-4 w-4 sm:h-5 sm:w-5 text-white/50" />
                {dropdownOpen && (
                  <div className="mt-1 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg max-h-40 sm:max-h-48 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => toggleUserSelection(user._id)}
                        className={`flex justify-between items-center p-1.5 sm:p-2 cursor-pointer hover:bg-white/20 ${
                          selectedUsers.includes(user._id) ? "bg-blue-600/50" : ""
                        }`}
                      >
                        <span className="text-white flex items-center text-xs sm:text-sm">
                          <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          {user.firstName} ({user.email})
                        </span>
                        {selectedUsers.includes(user._id) && (
                          <span className="text-blue-300 text-xs sm:text-sm">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedUsers.length > 0 && (
              <div className="mt-3 sm:mt-4">
                <h3 className="text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2 flex items-center">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  المستخدمين المختارين ({selectedUsers.length})
                </h3>
                <div className="bg-white/10 rounded-lg border border-white/20 p-2 sm:p-4 sm:pb-0 overflow-auto">
                  {users
                    .filter((user) => selectedUsers.includes(user._id))
                    .map((user) => (
                      <div
                        key={user._id}
                        className="flex justify-between items-center mb-2 pb-2 border-b border-white/20 last:border-b-0"
                      >
                        <span className="text-white text-xs sm:text-sm">
                          {user.firstName} ({user.email})
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleUserSelection(user._id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <X className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-500/10 bg-opacity-50 border-t border-white/10 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
            <button
              type="button"
              className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 border border-white/30 rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              إلغاء
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center"
            >
              <Save className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsVPSGroup;