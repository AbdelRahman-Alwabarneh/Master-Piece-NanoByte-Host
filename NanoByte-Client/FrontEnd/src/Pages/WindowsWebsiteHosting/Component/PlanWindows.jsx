import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import FeaturesOfOurServices5 from "./FeaturesOfOurServices5";

function PlanWindows() {
  const Plans = [
    {
      name: "خطة الأعمال",
      incentivize: "خطة متقدمة بأداء استثنائي وحماية قوية",
      Duration: "شهري",
      Description: [
        "مساحة تخزين غير محدودة",
        "عدد المواقع الإلكترونية غير محدودة",
        "عدد الإيميلات غير محدودة",
        "حركة البيانات غير محدودة",
      ],
      price: "$9.99 USD",
    },
    {
      name: "الخطة الإحترافية",
      incentivize: "خطة قوية مع أداء مذهل وحماية متقدمة",
      Duration: "شهري",
      Description: [
        "300GB SSD مساحة تخزين",
        "30 عدد المواقع الإلكترونية",
        "عدد الإيميلات غير محدودة",
        "حركة البيانات غير محدودة",
      ],
      price: "$4.99 USD",
    },
    {
      name: "الخطة الأساسية",
      incentivize: "خطة مثالية بأداء قوي وسعر مناسب",
      Duration: "شهري",
      Description: [
        "20GB SSD مساحة تخزين",
        "موقع واحد فقط إلكتروني",
        "إيميلات عدد 5 إيميلات",
        "حركة بيانات غير محدودة",
      ],
      price: "$1.99 USD",
    },
  ];

  return (
    <>
      <title>إستضافة مواقع لينيكس - NanoByte</title>
      <Header />
      <section className="font-cairo mt-[72px]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-5 text-4xl tracking-tight font-extrabold text-white">
              (Plesk) إستضافة مواقع ويندوز
            </h2>
            <p className="mb-5 font-light text-white sm:text-xl">
              .NET إستضافة تدعم تطبيقات الويندوز مثل ولغات البرمجة التي تدعمها
              تطبيقات الويندوز
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Link to="/LinuxWebsiteHosting">
                <button className="w-full sm:w-auto bg-transparent border border-white text-white font-bold py-3 px-6 rounded-[10px] shadow-lg transform transition-all duration-500 ease-in-out hover:bg-blue-700 hover:scale-110 hover:brightness-110 hover:animate-pulse">
                  إستضافة مواقع لينيكس
                </button>
              </Link>
              <Link to="/WindowsWebsiteHosting">
                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-[10px] shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse">
                  إستضافة مواقع الويندوز
                </button>
              </Link>
            </div>
          </div>

          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-12 lg:space-y-0 mt-[100px]">
            {Plans.map((Plan, index) => (
              <div
                key={Plan.name}
                className={`flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-[#276baf] rounded-lg border border-[#1d3585] shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
                  index === 1
                    ? "hover:scale-[1.12] scale-[1.10]"
                    : "hover:scale-105"
                }`}
              >
                <h3 className="mb-3 text-3xl font-bold">{Plan.name}</h3>
                <p className="font-light px-10 text-white sm:text-lg mb-4">
                  {Plan.incentivize}
                </p>
                <div className="flex  justify-center items-baseline my-4">
                  <span className="mr-2 text-3xl font-extrabold">
                    {Plan.price}
                  </span>
                  <span className="text-white">/{Plan.Duration}</span>
                </div>
                <ul
                  role="list"
                  className="mb-4 space-y-2 text-left text-gray-300"
                >
                  {Plan.Description.map((desc, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center text-center space-x-3 text-[1.1rem] font-semibold py-3"
                    >
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-auto text-white bg-[#214d90] hover:bg-[#31458a] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                >
                  أطلب الأن
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesOfOurServices5 />
      <Footer />
    </>
  );
}

export default PlanWindows;
