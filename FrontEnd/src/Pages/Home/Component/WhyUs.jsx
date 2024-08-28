import React from "react";
import { useInView } from "react-intersection-observer";
import svgexport_7 from "../../../Assets/Photo/svgexport-7.svg";
import svgexport_14 from "../../../Assets/Photo/svgexport-14.svg";
import svgexport_16 from "../../../Assets/Photo/svgexport-16.svg";
import svgexport_17 from "../../../Assets/Photo/svgexport-17.svg";
import svgexport_18 from "../../../Assets/Photo/svgexport-18.svg";
import svgexport_19 from "../../../Assets/Photo/svgexport-19.svg";
import svgexport_20 from "../../../Assets/Photo/svgexport-20.svg";

function WhyUs() {
  const AllWhyUs = [
    {
      src: svgexport_17,
      title: "جاهزية مضمونة %99",
      description:
        "خبرائنا متأهبون للتحديات مع الأعداد الشامل لتحقيق النجاح بأفضل شكل ممكن",
    },
    {
      src: svgexport_16,
      title: "سهولة الأستخدام",
      description: "لوحة تحكم سهلة ومميزة وسريعة مع ضمان للمنتج",
    },
    {
      src: svgexport_7,
      title: "سريع وموثوق",
      description:
        "اذا تم اكتشاف اي اختراق لخدمات العميل سيتم ازالتها من قبل فريقنا",
    },
    {
      src: svgexport_14,
      title: "خبراء متواجدون 24/7",
      description:
        "متخصصون يراقبون التذاكر والشبكات على مدار اليوم لضمان الخدمة",
    },
    {
      src: svgexport_20,
      title: "مميزات مثالية",
      description: "متوفر مميزات مثالية تناسب احتياجاتك وبكل اريحية",
    },
    {
      src: svgexport_19,
      title: "أداء عالي",
      description:
        "يمنحك الإعداد الفوري والآلي بالكامل على الفور دون التعقيدات",
    },
    {
      src: svgexport_16,
      title: "ضمان استعادة الاموال",
      description: "في حالة عدم رضاك عن خدماتنا يمكنك إستعادة اموالك بكل سلاسة",
    },
    {
      src: svgexport_18,
      title: "خوادم آمنة",
      description: "2TB تصل الى DDOS حماية من هجمات وضمان لصد الهجمات",
    },
  ];

  return (
    <div className="font-cairo from-purple-800 to-indigo-800 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white sm:text-4xl text-2xl font-bold text-center mb-5">
          لماذا نحن
        </h2>
        <p className="text-white text-center mb-16">
          تعرف على سبب ثقة اكثر من 1329 عميل حول العالم
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 max-md:max-w-lg mx-auto">
          {AllWhyUs.map((card, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.1, // جرب قيمة مختلفة هنا مثل 0.3 أو 0.5
            });

            return (
              <div
                key={index}
                ref={ref}
                className={`bg-[#182d7e] rounded-xl group p-8 text-center ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } transition-transform duration-500 ease-in-out text-white hover:bg-[#1d3697] hover:shadow-xl`}
              >
                <img
                  className="w-12 mb-6 inline-block"
                  src={card.src}
                  alt="Image description"
                />
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-gray-300 text-sm">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
