import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import svgexport_7 from "../../Assets/Photo/svgexport-7.svg";
import svgexport_14 from "../../Assets/Photo/svgexport-14.svg";
import svgexport_16 from "../../Assets/Photo/svgexport-16.svg";
import svgexport_17 from "../../Assets/Photo/svgexport-17.svg";
import svgexport_18 from "../../Assets/Photo/svgexport-18.svg";
import svgexport_19 from "../../Assets/Photo/svgexport-19.svg";
import svgexport_20 from "../../Assets/Photo/svgexport-20.svg";

const AboutUs = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: "🖥️",
      title: "خوادم VPS",
      description: "خوادم افتراضية مرنة بمواصفات متقدمة"
    },
    {
      icon: "⚡",
      title: "خوادم مخصصة",
      description: "استضافة عالية الأداء بموارد حصرية"
    },
    {
      icon: "🎮",
      title: "استضافة الألعاب",
      description: "حلول مخصصة لضمان أداء مثالي"
    },
    {
      icon: "🌐",
      title: "استضافة المواقع",
      description: "استضافة سريعة وآمنة بتوافر عالي"
    }
  ];

  const whyUsCards = [
    {
      src: svgexport_17,
      title: "جاهزية مضمونة %99",
      description: "خبرائنا متأهبون للتحديات مع الأعداد الشامل لتحقيق النجاح بأفضل شكل ممكن"
    },
    {
      src: svgexport_16,
      title: "سهولة الأستخدام",
      description: "لوحة تحكم سهلة ومميزة وسريعة مع ضمان للمنتج"
    },
    {
      src: svgexport_7,
      title: "سريع وموثوق",
      description: "اذا تم اكتشاف اي اختراق لخدمات العميل سيتم ازالتها من قبل فريقنا"
    },
    {
      src: svgexport_14,
      title: "خبراء متواجدون 24/7",
      description: "متخصصون يراقبون التذاكر والشبكات على مدار اليوم لضمان الخدمة"
    },
    {
      src: svgexport_20,
      title: "مميزات مثالية",
      description: "متوفر مميزات مثالية تناسب احتياجاتك وبكل اريحية"
    },
    {
      src: svgexport_19,
      title: "أداء عالي",
      description: "يمنحك الإعداد الفوري والآلي بالكامل على الفور دون التعقيدات"
    },
    {
      src: svgexport_16,
      title: "ضمان استعادة الاموال",
      description: "في حالة عدم رضاك عن خدماتنا يمكنك إستعادة اموالك بكل سلاسة"
    },
    {
      src: svgexport_18,
      title: "خوادم آمنة",
      description: "2TB تصل الى DDOS حماية من هجمات وضمان لصد الهجمات"
    }
  ];

  const objectives = [
    {
      title: "تجربة سلسة",
      description: "نقدم تجربة استضافة سريعة وسلسة للأفراد والشركات"
    },
    {
      title: "ثقة طويلة المدى",
      description: "نبني الثقة مع عملائنا من خلال الخدمات المرنة والدعم المستمر"
    },
    {
      title: "حلول مبتكرة",
      description: "نتميز في السوق بتقديم حلول مبتكرة بأسعار تنافسية"
    },
    {
      title: "مرونة كاملة",
      description: "نتيح للعملاء ترقية خططهم وتعديل مواصفات الخوادم حسب احتياجاتهم"
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#1A318C] to-[#161E41] font-cairo mt-[75px] text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              عن نانوبايت هوست
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              نقدم حلول استضافة احترافية تلبي جميع احتياجاتك
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#1b328c] hover:bg-[#1d3697] rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Why Us Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">لماذا نانوبايت</h2>
            <p className="text-xl text-blue-200 text-center mb-12">
              تعرف على سبب ثقة الناس بنانوبايت هوست
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUsCards.map((card, index) => {
                const { ref, inView } = useInView({
                  triggerOnce: true,
                  threshold: 0.1
                });

                return (
                  <motion.div
                    key={index}
                    ref={ref}
                    className={`bg-[#182d7e] rounded-xl p-6 text-center hover:bg-[#1d3697] transition-all duration-300 hover:shadow-xl ${
                      inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                  >
                    <img
                      src={card.src}
                      alt={card.title}
                      className="w-12 h-12 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-blue-200 text-sm">{card.description}</p>
                  </motion.div>
                )}
              )}
            </div>
          </motion.div>

          {/* Objectives Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">أهدافنا</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  className="bg-[#182d7e] rounded-xl p-6 hover:bg-[#1d3697] transition-all duration-300 hover:shadow-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{objective.title}</h3>
                  <p className="text-blue-200">{objective.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div 
            className="text-center max-w-4xl mx-auto bg-[#182d7e] rounded-2xl p-8 hover:bg-[#1d3697] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">رؤيتنا</h2>
            <p className="text-xl text-blue-200 leading-relaxed">
              نسعى في Nanobyte Host لتقديم حلول استضافة عالية الأداء تناسب جميع العملاء، 
              من الأفراد إلى الشركات الكبرى، مع استجابة ودعم فني لا مثيل لهما.
            </p>
          </motion.div>

        
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;