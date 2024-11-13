import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const NoDataTable = () => {
  const [services, setServices] = useState([]);

  return (
    <>
      <div className="overflow-x-auto bg-[#194f86] rounded-lg shadow-lg">
        <table className="w-full text-sm text-right text-gray-200">
          <thead className="text-xs text-center uppercase bg-[#194f86] text-gray-100 border-b border-[#003366]">
            <tr>
              <th scope="col" className="px-6 py-3">
                لوحة التحكم
              </th>
              <th scope="col" className="px-6 py-3">
                حالة الخادم
              </th>
              <th scope="col" className="px-6 py-3">
                باقي للخادم
              </th>
              <th scope="col" className="px-6 py-3">
                مواصفات الخادم
              </th>
              <th scope="col" className="px-6 py-3">
                IP الخاص
              </th>
              <th scope="col" className="px-6 py-3">
                اسم الخادم
              </th>
              <th scope="col" className="px-6 py-3">
                اسم الخطة
              </th>
            </tr>
          </thead>
        </table>
      </div>
      {!services || services.length === 0 ? (
        <>
          <div className="min-h-screen text-white p-2 sm:p-4 font-cairo text-sm mt-6">
            <div className="max-w-7xl mx-auto">
              <div className="mt-6 text-center">
                <h2 className="text-lg font-bold mb-2">
                لا تمتلك خوادم مركزية
                </h2>
                <p className="text-md">
                لطلب خادم مركزي انتقل لصفحة الخوادم المركزية
                </p>
                <Link
                  to={`/DedicatedServer`}
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  أطلب خادم مركزي الأن
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NoDataTable;
