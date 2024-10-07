import React, { useMemo } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ReactECharts from "echarts-for-react";

const HomeDashboard = () => {
  const statistics = [
    { title: "عدد الطلبات", value: "20", color: "bg-[#3B82F6]" }, // الأزرق الفاتح
    { title: "عدد الرسائل", value: "20", color: "bg-[#60A5FA]" }, // الأزرق الفاتح جداً
    { title: "عدد المستحدمين", value: "20", color: "bg-[#3B82F6]" }, // الأزرق الفاتح
    { title: "الأرباح", value: "20", color: "bg-[#60A5FA]" }, // الأزرق الفاتح جداً
  ];

  const data = [
    { name: "يناير", Profits: 200 },
    { name: "فبراير", Profits: 300 },
    { name: "مارس", Profits: 600 },
    { name: "أبريل", Profits: 200 },
    { name: "مايو", Profits: 500 },
    { name: "يونيو", Profits: 222 },
    { name: "يوليو", Profits: 520 },
    { name: "أغسطس", Profits: 300 },
    { name: "سبتمبر", Profits: 80 },
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
            <div
              key={index}
              className={`${stat.color} text-white p-4 rounded shadow`}
            >
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
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
