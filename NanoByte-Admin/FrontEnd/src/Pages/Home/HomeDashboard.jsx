import React, { useMemo, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ReactECharts from "echarts-for-react";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
const HomeDashboard = () => {
  const [Statistic, setStatistic] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.post(
        `http://localhost:2100/api/statistics/count`
      );
      setStatistic(response.data.allStatistics);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setStatus("error");
    }
  };
  const statistics = [
    {
      title: "طلبات في الأنتظار",
      value: Statistic.pendingCount,
      color: "bg-[#3B82F6]",
      path: "/OrderManagement/Pending",
    }, // الأزرق الفاتح
    {
      title: "الرسائل غير المقروءة",
      value: Statistic.contactsCount,
      color: "bg-[#60A5FA]",
      path: "/ContactMessages",
    }, // الأزرق الفاتح جداً
    {
      title: "عدد المستحدمين",
      value: Statistic.usersCount,
      color: "bg-[#3B82F6]",
      path: "/AllUsers",
    }, // الأزرق الفاتح
    {
      title: "الأرباح",
      value: "549.62",
      color: "bg-[#60A5FA]",
      path: "/TutorialManagement",
    }, // الأزرق الفاتح جداً
  ];

  const data = [
    { name: "يناير", Profits: 0 },
    { name: "فبراير", Profits: 0 },
    { name: "مارس", Profits: 0 },
    { name: "أبريل", Profits: 0 },
    { name: "مايو", Profits: 0 },
    { name: "يونيو", Profits: 0 },
    { name: "يوليو", Profits: 0 },
    { name: "أغسطس", Profits: 0 },
    { name: "سبتمبر", Profits: 0 },
    { name: "أكتوبر", Profits: 0 },
    { name: "نوفمبر", Profits: 0 },
    { name: "ديسمبر", Profits: 549.62 },
  ];

  // إعدادات المخطط باستخدام ECharts
  const chartOptions = useMemo(
    () => ({
      xAxis: {
        type: "category",
        data: data.map((item) => item.name),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data.map((item) => item.Profits),
          type: "bar",
          itemStyle: {
            color: "#3B82F6", // الأزرق الفاتح
          },
        },
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
    }),
    [data]
  );
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-cairo">
      <Sidebar />
      <div className="flex-1 p-8 md:mr-64 mr-[75px]">
        {" "}
        {/* تعديل المسافة إلى اليمين */}
        <h1 className="text-3xl font-bold mb-6 text-white">الأحصائيات</h1>
        {/* إحصائيات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statistics.map((stat, index) => (
            <Link to={stat.path} key={index}>
            <div
              className={`${stat.color} text-white p-4 rounded shadow`}
            >
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            </Link>
          ))}
        </div>
        {/* تحليل المبيعات */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            تحليل المبيعات
          </h2>
          <ReactECharts
            option={chartOptions}
            style={{ height: "300px", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
