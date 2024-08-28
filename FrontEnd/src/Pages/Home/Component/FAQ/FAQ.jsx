import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./button";
import { useInView } from 'react-intersection-observer';

function FAQ() {
  const [FAQ1, setFAQ1] = useState(false);
  const [FAQ2, setFAQ2] = useState(false);
  const [FAQ3, setFAQ3] = useState(false);
  const [FAQ4, setFAQ4] = useState(false);
  const [FAQ5, setFAQ5] = useState(false);
  const [FAQ6, setFAQ6] = useState(false);

  function toggleFAQ(setFAQ) {
    setFAQ(prev => !prev);
  }

  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });
  const [ref3, inView3] = useInView({ triggerOnce: true });
  const [ref4, inView4] = useInView({ triggerOnce: true });
  const [ref5, inView5] = useInView({ triggerOnce: true });
  const [ref6, inView6] = useInView({ triggerOnce: true });

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b font-cairo text-white [direction:rtl] ">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg font-medium max-w-3xl mx-auto">
            أكثر الأسئلة شيوعاً يمكنك التعرف عليها من هنا
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {/* FAQ 1 */}
          <div
            ref={ref1}
            className={`transition-all duration-500 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl ${inView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button
              onClick={() => toggleFAQ(setFAQ1)}
              type="button"
              id="question1"
              data-state="closed"
              className="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-lg border-blue-700"
            >
              <span className="text-lg sm:text-xl font-semibold text-white">
                ما هي الخطط المتوفرة لدى نانوبايت هوست؟
              </span>
              <i className={`text-white ${FAQ1 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
            </button>
            <div id="answer1" className={`${FAQ1 ? "block" : "hidden"} px-6 py-4`}>
              <p className="text-white font-medium text-base">
                <span className="font-bold">تقدم نانوبايت مجموعة متنوعة من خطط الاستضافة لتلبية احتياجات عملائها:</span>
                <br/><br/>
                <span className="hover:text-[#56c1ff]"><Link to="/ss"><span className="font-bold">خطط الاستضافة المشتركة :</span> لدينا 10 خطط خوادم مشتركة تضمن لك الأداء والاستقرار الأمثل لك.</Link></span>
                <br/><br/>
                <span className="hover:text-[#56c1ff]"><Link to="/ss"><span className="font-bold">خطط الاستضافة المركزية:</span> تتوفر لدينا 3 خطط خوادم مركزية توفر لك قوة وأمانًا عاليين لمتطلبات الأعمال الكبيرة.</Link></span>
                <br/><br/>
                <span className="hover:text-[#56c1ff]"><Link to="/ss"><span className="font-bold">خطط استضافة المواقع على Windows أو Linux:</span> نقدم 3 خطط استضافة مواقع متوافقة مع أنظمة التشغيل Windows و Linux لتلبية احتياجات مختلف العملاء.</Link></span>
              </p>
            </div>
          </div>

          {/* FAQ 2 */}
          <div
            ref={ref2}
            className={`transition-all duration-500 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button
              onClick={() => toggleFAQ(setFAQ2)}
              type="button"
              id="question2"
              data-state="closed"
              className="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-lg border-blue-700"
            >
              <span className="text-lg sm:text-xl font-semibold text-white">
                كيف يمكنني الشراء من الموقع؟
              </span>
              <i className={`text-white ${FAQ2 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
            </button>
            <div id="answer2" className={`${FAQ2 ? "block" : "hidden"} px-6 py-4`}>
              <p className="text-white font-medium text-base">
                <span className="font-bold">اختر نوع الاستضافة المناسب لاحتياجاتك: </span>(<span className="hover:text-[#56c1ff]"><Link>مشتركة،</Link></span> <span className="hover:text-[#56c1ff]"><Link>مركزية،</Link></span> أو استضافة مواقع على <span className="hover:text-[#56c1ff]"><Link>Windows</Link></span>/<span className="hover:text-[#56c1ff]"><Link>Linux</Link></span>).
                <br/><br/>
                <span className="font-bold">اختر الخطة المناسبة:</span> اختر الخطة التي تناسب متطلباتك.
                <br/><br/>
                <span className="font-bold">طلب الخطة:</span> قم بالضغط على "أطلب الآن".
                <br/><br/>
                <span className="font-bold">تأكيد الطلب:</span> قم بمراجعة تفاصيل الخطة وقم بتأكيد الطلب بعد قراءتها بعناية.
                <br/><br/>
                <span className="font-bold">إدخال معلومات الدفع:</span> اختر طريقة الدفع المناسبة وقم بإدخال المعلومات الخاصة بها.
                <br/><br/>
                <span className="font-bold">تلقي تأكيد الشراء:</span> ستتلقى رسالة تأكيد عبر البريد الإلكتروني تحتوي على تفاصيل الطلب وتعليمات تفعيل الاستضافة.
              </p>
            </div>
          </div>

          {/* FAQ 3 */}
          <div
            ref={ref3}
            className={`transition-all duration-500 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl ${inView3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button
              onClick={() => toggleFAQ(setFAQ3)}
              type="button"
              id="question3"
              data-state="closed"
              className="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-lg border-blue-700"
            >
              <span className="text-lg sm:text-xl font-semibold text-white">
                كيف يمكنني الدخول للخادم؟
              </span>
              <i className={`text-white ${FAQ3 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
            </button>
            <div id="answer3" className={`${FAQ3 ? "block" : "hidden"} px-6 py-4`}>
              <p className="text-white font-medium text-base">
                <span className="font-bold">تشغيل Remote Desktop Connection:</span> على جهاز الكمبيوتر الخاص بك، اضغط على مفتاح "Windows" ثم اكتب "Remote Desktop Connection" في شريط البحث.
                <br/><br/>
                <span className="font-bold">إدخال عنوان IP:</span> اكتب عنوان IP الخاص بالخادم في الحقل "Computer".
                <br/><br/>
                <span className="font-bold">إدخال اسم المستخدم:</span> اضغط على "Show Options" ثم أدخل اسم المستخدم الخاص بالخادم.
                بعد ذلك، اضغط على زر "Connect" لإدخال كلمة المرور.
                <br/><br/>
                <span className="font-bold">إدخال كلمة المرور:</span> قم بإدخال كلمة المرور الخاصة بالخادم ثم اضغط على "OK".
                <br/><br/>
                <span className="font-bold">قبول الشهادة:</span> قد تظهر لك نافذة تحذيرية تتعلق بالشهادة الأمنية. قم بالنقر على "Yes" لمتابعة الاتصال.
              </p>
            </div>
          </div>

          {/* FAQ 4 */}
          <div
            ref={ref4}
            className={`transition-all duration-500 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl ${inView4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button
              onClick={() => toggleFAQ(setFAQ4)}
              type="button"
              id="question4"
              data-state="closed"
              className="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-lg border-blue-700"
            >
              <span className="text-lg sm:text-xl font-semibold text-white">
                ما هي المدة التي يستغرقها تفعيل الاستضافة؟
              </span>
              <i className={`text-white ${FAQ4 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
            </button>
            <div id="answer4" className={`${FAQ4 ? "block" : "hidden"} px-6 py-4`}>
              <p className="text-white font-medium text-base">
                <span className="font-bold">تفعيل استضافة المواقع: </span> يستغرق عادةً من 24 إلى 48 ساعة لتفعيل استضافة المواقع، حسب نوع الاستضافة والمتطلبات الفنية.
                <br/><br/>
                <span className="font-bold">تفعيل الاستضافة المشتركة أو المركزية:</span> يمكن أن يستغرق وقتًا أقل، حيث يتم تفعيلها عادةً خلال 24 ساعة.
                <br/><br/>
                <span className="font-bold">تفعيل استضافة المواقع على أنظمة التشغيل: </span> عادةً ما يستغرق من 1 إلى 2 يوم عمل، حيث يتطلب إعداد نظام التشغيل والتكوينات الخاصة.
              </p>
            </div>
          </div>

          {/* FAQ 5 */}
          <div
            ref={ref5}
            className={`transition-all duration-500 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl ${inView5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button
              onClick={() => toggleFAQ(setFAQ5)}
              type="button"
              id="question5"
              data-state="closed"
              className="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-lg border-blue-700"
            >
              <span className="text-lg sm:text-xl font-semibold text-white">
                هل يمكنني تغيير خطة الاستضافة بعد الشراء؟
              </span>
              <i className={`text-white ${FAQ5 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
            </button>
            <div id="answer5" className={`${FAQ5 ? "block" : "hidden"} px-6 py-4`}>
              <p className="text-white font-medium text-base">
                <span className="font-bold">نعم، يمكنك تغيير خطة الاستضافة بعد الشراء:</span>
                <br/><br/>
                <span className="font-bold">تقديم طلب تغيير:</span> اتصل بفريق الدعم الفني لتقديم طلب تغيير الخطة.
                <br/><br/>
                <span className="font-bold">التأكيد والمراجعة:</span> سيتم مراجعة الطلب وتأكيد التغيير من قبل فريق الدعم الفني.
                <br/><br/>
                <span className="font-bold">تنفيذ التغيير:</span> بعد تأكيد الطلب، سيتم تنفيذ التغيير وفقًا للمتطلبات الجديدة.
                <br/><br/>
                <span className="font-bold">تعديل الفواتير:</span> قد يتم تعديل الفواتير وفقًا للتغييرات في الخطط.
              </p>
            </div>
          </div>

          {/* FAQ 6 */}
          <div
            ref={ref6}
            className={`transition-all duration-500 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl ${inView6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button
              onClick={() => toggleFAQ(setFAQ6)}
              type="button"
              id="question6"
              data-state="closed"
              className="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-lg border-blue-700"
            >
              <span className="text-lg sm:text-xl font-semibold text-white">
                هل يمكنني استرداد المبلغ إذا لم أكن راضيًا عن الخدمة؟
              </span>
              <i className={`text-white ${FAQ6 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
            </button>
            <div id="answer6" className={`${FAQ6 ? "block" : "hidden"} px-6 py-4`}>
              <p className="text-white font-medium text-base">
                <span className="font-bold">نعم، يمكنك استرداد المبلغ إذا لم تكن راضيًا عن الخدمة:</span>
                <br/><br/>
                <span className="font-bold">سياسة الاسترداد:</span> تتوفر سياسة استرداد وفقًا للشروط والأحكام الخاصة بشركتنا.
                <br/><br/>
                <span className="font-bold">طلب استرداد:</span> قم بتقديم طلب استرداد عبر قسم الدعم الفني.
                <br/><br/>
                <span className="font-bold">مراجعة الطلب:</span> سيتم مراجعة طلب الاسترداد وتأكيده وفقًا لسياسة الاسترداد.
                <br/><br/>
                <span className="font-bold">تنفيذ الاسترداد:</span> سيتم تنفيذ عملية الاسترداد وفقًا للمعايير والشروط المحددة.
              </p>
            </div>

          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Button/>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
