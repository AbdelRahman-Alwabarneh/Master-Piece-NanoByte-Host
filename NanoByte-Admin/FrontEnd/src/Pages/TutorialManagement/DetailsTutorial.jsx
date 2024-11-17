import React, { useState, useEffect } from "react";
import { X, Save, Edit } from "lucide-react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "../../Components/Loading/Loading";
const TutorialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tutorial, setTutorial] = useState({
    title: "",
    body: "",
    visibleToRegisteredOnly: false,
    groupId: null,
    groupName: null,
    Link: "",
    oldGroupId: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setloading] = useState(true);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTutorial((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:2100/api/tutorialGroup");
        setGroups(response.data.AllTutorialGroup);
        setloading(false)
      } catch (error) {
        console.error("Error fetching groups:", error);
        setloading(false)
      }
    };
    fetchGroups();

    const fetchTutorial = async () => {
      try {
        const response = await axios.get(`http://localhost:2100/api/tutorial/${id}`);
        setTutorial(response.data.TutorialDetails);
        setTutorial((prev) => ({...prev,oldGroupId:response.data.TutorialDetails.groupId}));
        setloading(false)
        
      } catch (error) {
        console.error("Error fetching tutorial:", error);
        setloading(false)

      }
    };
    fetchTutorial();
  }, [id]);

  const handleGroupSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setTutorial((prev) => ({ ...prev, groupName: value }));
    setShowDropdown(true);

    const exactMatch = groups.find(
      (group) => group.groupName.toLowerCase() === value.toLowerCase()
    );
    if (exactMatch) {
      handleGroupSelect(exactMatch);
    } else {
      setTutorial((prev) => ({ ...prev, groupId: "" }));
    }
  };

  const handleGroupSelect = (group) => {
    setTutorial((prev) => ({
      ...prev,
      groupId: group._id,
      groupName: group.groupName,
    }));
    setShowDropdown(false);
    setSearchTerm(group.groupName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "هل تريد تحديث هذا التوتوريال؟",
        icon: "warning",
        iconColor: "#ffcc00",
        background: "#18296C",
        color: "#ffffff",
        showCancelButton: true,
        confirmButtonColor: "#1E38A3",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
      });

      if (result.isConfirmed) {
        const response = await axios.put(`http://localhost:2100/api/tutorial/${id}`, {
          tutorialData: tutorial,
        });
        await axios.patch(`http://localhost:2100/api/tutorialGroup/${id}`, {tutorial});

        if (response.status === 200) {
          Swal.fire({
            title: "تم التحديث!",
            text: "تم تحديث التوتوريال بنجاح.",
            icon: "success",
            iconColor: "#28a745",
            background: "#18296C",
            color: "#ffffff",
            confirmButtonColor: "#1E38A3",
            confirmButtonText: "موافق",
          })
        } else {
          throw new Error("حدث خطأ أثناء التحديث");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "خطأ!",
        text: "حدث خطأ أثناء تحديث البيانات. الرجاء المحاولة مرة أخرى.",
        icon: "error",
        iconColor: "#ff0000",
        background: "#18296C",
        color: "#ffffff",
        confirmButtonColor: "#1E38A3",
        confirmButtonText: "موافق",
      });
      console.error("Error:", error);
    }
  };

  const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );
if(loading){
return <Loading/>
}

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#1A318C_0%,_#161E41_100%)] text-white font-cairo">
      <Sidebar />
      <div className="p-2 sm:p-4 md:mr-64 mr-[75px] text-sm mt-2">
        <div className="max-w-full mx-auto">
          <div className="bg-blue-950 bg-opacity-30 hover:shadow-blue-800/10 rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="flex justify-between border-b border-blue-700 pb-2 mb-4">
              <h2 className="text-lg font-semibold">تفاصيل المحتوى التعليمي</h2>
           
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs text-gray-300 mb-1">
                    العنوان
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={tutorial.title}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="أدخل عنوان المحتوى التعليمي"
                    required
                   
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <div className="relative">
                    <label className="block text-xs text-gray-300 mb-1">المجموعة</label>
                    <input
                      type="text"
                      name="groupName"
                      value={tutorial.groupName}
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
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs text-gray-300 mb-1">
                    المحتوى
                  </label>
                  <div className="overflow-hidden h-96 rounded-lg shadow-lg bg-white">
                    <ReactQuill
                      name="body"
                      value={tutorial.body}
                      onChange={(content) =>
                        setTutorial((prev) => ({
                          ...prev,
                          body: content,
                        }))
                      }
                      className="h-96 border-none text-black text-end"
                      modules={modules}
                      theme="snow"
                     
                    />
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs text-gray-300 mb-1">
                    الرابط 
                  </label>
                  <input
                    type="text"
                    name="Link"
                    value={tutorial.Link}
                    onChange={handleChange}
                    className="w-full bg-gray-400/10 bg-opacity-50 rounded border border-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-300 px-4 py-2 transition-all duration-200"
                    placeholder="أدخل رابط المحتوى التعليمي"
                    required
                 
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="visibleToRegisteredOnly"
                      checked={tutorial.visibleToRegisteredOnly}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
             
                    />
                    <label className="mr-1 text-xs text-gray-300">
                      مرئي للمسجلين فقط
                    </label>
                  </div>
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
                    حفظ التعديلات
                  </button>
                </div>
         
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetails;