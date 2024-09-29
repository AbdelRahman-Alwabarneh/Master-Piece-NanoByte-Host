import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";

const AllUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "أحمد",
      lastName: "محمد",
      company: "شركة أ",
      services: "1",
      created: "2024-09-01",
      email: "test1@gmail.com",
    },
    {
      id: 2,
      firstName: "فاطمة",
      lastName: "علي",
      company: "شركة ب",
      services: "2",
      created: "2024-09-02",
      email: "test2@gmail.com",
    },
    {
      id: 3,
      firstName: "محمود",
      lastName: "حسن",
      company: "شركة ج",
      services: "3",
      created: "2024-09-03",
      email: "test3@gmail.com",
    },
  ]);

  return (
    <div className="flex min-h-screen text-white font-cairo">
      <Sidebar />
      <div className="flex-grow p-6 md:mr-64 mr-[75px]">
        <h1 className="text-3xl font-bold mb-6">جدول المستخدمين</h1>
        <div className="overflow-x-auto w-full">
          <table className="hidden md:table min-w-full bg-[#1E38A3] rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#2f64bb] text-white">
                <th className="p-3 text-center">المعرف</th>
                <th className="p-3 text-center">الاسم الأول</th>
                <th className="p-3 text-center">الاسم الأخير</th>
                <th className="p-3 text-center">البريد الألكتروني</th>
                <th className="p-3 text-center">اسم الشركة</th>
                <th className="p-3 text-center">الخدمات</th>
                <th className="p-3 text-center">تاريخ الإنشاء</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#3B82F6] hover:bg-[#2f64bb] transition-colors duration-200 text-center"
                >
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.company}</td>
                  <td className="p-3">{user.services}</td>
                  <td className="p-3">{user.created}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* عرض البطاقات على الشاشات الصغيرة */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-[#1E38A3] rounded-lg shadow-lg p-4"
              >
                <p className="mb-2">
                  <span className="font-bold">المعرف</span>
                  {user.id}
                </p>
                <p className="mb-2">
                  <span className="font-bold">الاسم الأول</span>
                  {user.firstName}
                </p>
                <p className="mb-2">
                  <span className="font-bold">الاسم الأخير</span>
                  {user.lastName}
                </p>
                <p className="mb-2">
                  <span className="font-bold">اسم الشركة</span>
                  {user.company}
                </p>
                <p className="mb-2">
                  <span className="font-bold">الخدمات</span>
                  {user.services}
                </p>
                <p className="mb-2">
                  <span className="font-bold">تاريخ الإنشاء</span>
                  {user.created}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
