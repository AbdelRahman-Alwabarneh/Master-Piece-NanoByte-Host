import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function DedicatedServer() {
  const Plans = [
    {
      name: "AMD Ryzen™ 7 3800X",
      incentivize: "خطة متقدمة بأداء استثنائي وحماية قوية",
      Duration: "شهري",
      Description: [
        "AMD Ryzen™ 7 3800X (max. 16x 4.4 Ghz)",
        "64GB DDR4 RAM ECC",
        "NVMe SSD 2x 512GB STORAGE",
        "Unlimited traffic (fair use policy)",
        "1x IPv4 + 1x IPMI / KVM included IP address",
        "DDoS protection 4.5Tbit/s",
        "Location Frankfurt - DE",
      ],
      price: "$145.00 USD",
    },
    {
      name: "AMD Ryzen™ 5 3600",
      incentivize: "خطة قوية مع أداء مذهل وحماية متقدمة",
      Duration: "شهري",
      Description: [
        "AMD Ryzen™ 5 3600 (max. 12x 4.2 Ghz)",
        "64GB DDR4 RAM ECC",
        "NVMe SSD 2x 256GB STORAGE",
        "Unlimited traffic (fair use policy)",
        "1x IPv4 + 1x IPMI / KVM included IP address",
        "DDoS protection 4.5Tbit/s",
        "1 month minimum contract term",
        "Location Frankfurt - DE",
      ],
      price: "$99.99 USD",
    },
    {
      name: "Intel Core i7-4770",
      incentivize: "خطة مثالية بأداء قوي وسعر مناسب",
      Duration: "شهري",
      Description: [
        "CPU Intel Core i7-4770",
        "RAM 4x RAM 8192 MB DDR3",
        "HDD 2x HDD SATA 2,0 TB Enterprise",
        "Traffic 1 Gbit/s - Unlimited",
        "Location HEL1-DC2 (Finland, HEL)",
      ],
      price: "$40.00 USD",
    },
  ];

  return (
    <>
            <title>الخوادم المركزية - NanoByte</title>
      <Header />
      <section className="font-cairo mt-[72px]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-5 text-4xl tracking-tight font-extrabold text-white">
              ( Dedicated ) إستضافة خوادم مركزية
            </h2>
            <p className="mb-5 font-light text-white sm:text-xl">
              استعد لتجربة استثنائية ومتميزة مع نانوبايت هوست.
              <br />
              نقدم لك خدماتنا عالية الجودة لتلبية احتياجاتك بكفاءة واحترافية.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-12 lg:space-y-0 mt-[100px]">
            {Plans.map((Plan, index) => (
              <div
                key={Plan.name}
                className={`flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-[#14256a] rounded-lg border border-[#1d3585] shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
                  index === 1
                    ? "hover:scale-[1.12] scale-[1.10]"
                    : "hover:scale-105"
                }`}
              >
                <h3 className="mb-3 text-3xl font-bold">{Plan.name}</h3>
                <p className="font-light px-10 text-gray-300 sm:text-lg mb-4">
                  {Plan.incentivize}
                </p>
                <div className="flex  justify-center items-baseline my-4">
                  <span className="mr-2 text-3xl font-extrabold">
                    {Plan.price}
                  </span>
                  <span className="text-gray-400">/{Plan.Duration}</span>
                </div>
                <ul
                  role="list"
                  className="mb-4 space-y-2 text-left text-gray-300"
                >
                  {Plan.Description.map((desc, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center text-center space-x-3"
                    >
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-auto text-white bg-[#192393] hover:bg-[#0F1A3D] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                >
                  أطلب الأن
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default DedicatedServer;
