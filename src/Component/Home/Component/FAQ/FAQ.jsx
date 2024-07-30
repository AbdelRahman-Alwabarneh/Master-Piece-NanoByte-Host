import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./button";
function FAQ() {
  const [FAQ1, setFAQ1] = useState(false);
  function FAQ_1() {
    setFAQ1(!FAQ1);
  }
  const [FAQ2, setFAQ2] = useState(false);
  function FAQ_2() {
    setFAQ2(!FAQ2);
  }
  const [FAQ3, setFAQ3] = useState(false);
  function FAQ_3() {
    setFAQ3(!FAQ3);
  }
  const [FAQ4, setFAQ4] = useState(false);
  function FAQ_4() {
    setFAQ4(!FAQ4);
  }
  const [FAQ5, setFAQ5] = useState(false);
  function FAQ_5() {
    setFAQ5(!FAQ5);
  }
  const [FAQ6, setFAQ6] = useState(false);
  function FAQ_6() {
    setFAQ6(!FAQ6);
  }
  return (
    <>
<section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b font-cairo text-white [direction:rtl]">
  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
    <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
        الأسئلة الشائعة
      </h2>
      <p className="text-lg font-medium max-w-3xl mx-auto">
        أكثر الأسئلة شيوعاً يمكنك التعرف عليها من هنا
      </p>
    </div>
    <div className="max-w-4xl mx-auto space-y-4">
      {/* <!-- ما هي الخطط المتوفرة لدى نانوبايت هوست؟ --> */}
      <div className="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl">
        <button
          onClick={FAQ_1}
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
      {/* <!-- كيف يمكنني الشراء من الموقع؟ --> */}
      <div className="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl">
        <button
          onClick={FAQ_2}
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
      {/* <!-- كيف يمكنني الدخول للخادم؟ --> */}
      <div className="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl">
        <button
          onClick={FAQ_3}
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
            <span className="font-bold">قبول الشهادة:</span> قد تظهر لك نافذة تحذيرية تتعلق بالشهادة الأمنية. اضغط على "Yes" للمتابعة.
            <br/><br/>
            <span className="font-bold">بدء العمل على الخادم:</span> يمكنك الآن العمل على الخادم كأنك تعمل على جهاز الكمبيوتر الخاص بك.
          </p>
        </div>
      </div>
      {/* <!-- كيف يمكنني النقل الى استضافتكم؟ --> */}
      <div className="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl">
        <button
          onClick={FAQ_4}
          type="button"
          id="question4"
          data-state="closed"
          className="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-lg border-blue-700"
        >
          <span className="text-lg sm:text-xl font-semibold text-white">
            كيف يمكنني النقل الى استضافتكم؟
          </span>
          <i className={`text-white ${FAQ4 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
        </button>
        <div id="answer4" className={`${FAQ4 ? "block" : "hidden"} px-6 py-4`}>
          <p className="text-white font-medium text-base">
            <span className="font-bold">تعد عملية نقل البيانات من الخادم الحالي الخاص بك إلى خوادمنا عملية سهلة</span>
            <br /><br />
            <span className="font-bold">الخطوة الأولى:</span> أخذ نسخة من ملفاتك الموجودة على خادمك الحالي.
            <br/><br/>
            <span className="font-bold">الخطوة الثانية:</span> قم بتحديد الخطة التي ترغب في الاشتراك بها ثم قم بشرائها.
            <br/><br/>
            <span className="font-bold">الخطوة الثالثة:</span> قم بتحميل الملفات الخاصة بك التي أخذت نسخة منها إلى الخادم الجديد.
            <br/><br/>
            <span className="font-bold">أثناء عملية النقل، يمكنك التواصل مع الدعم الفني لمساعدتك.</span>
          </p>
        </div>
      </div>
      {/* <!-- كم المدة لأستلام المنتج الخاص بي؟ --> */}
      <div className="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl">
        <button
          onClick={FAQ_5}
          type="button"
          id="question5"
          data-state="closed"
          className="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-lg border-blue-700"
        >
          <span className="text-lg sm:text-xl font-semibold text-white">
            كم المدة لأستلام المنتج الخاص بي؟
          </span>
          <i className={`text-white ${FAQ5 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
        </button>
        <div id="answer5" className={`${FAQ5 ? "block" : "hidden"} px-6 py-4`}>
          <p className="text-white font-medium text-base">
            يتم تسليم خدمات استضافة الخوادم المشتركة فور إتمام عملية الدفع.
            <br/><br/>
            بالنسبة للخوادم المركزية، فإن مدة التسليم تتراوح بين ساعة وساعتين من وقت الدفع.
            <br/><br/>
            فيما يخص استضافة المواقع، فإن مدة التسليم تتراوح بين 15 و30 دقيقة من وقت الدفع.
          </p>
        </div>
      </div>
      {/* <!-- ما هي طرق الدفع المتوفرة لدى نانوبايت؟ --> */}
      <div className="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-lg hover:shadow-2xl">
        <button
          onClick={FAQ_6}
          type="button"
          id="question6"
          data-state="closed"
          className="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-lg border-blue-700"
        >
          <span className="text-lg sm:text-xl font-semibold text-white">
            ما هي طرق الدفع المتوفرة لدى نانوبايت؟
          </span>
          <i className={`text-white ${FAQ6 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
        </button>
        <div id="answer6" className={`${FAQ6 ? "block" : "hidden"} px-6 py-4`}>
          <p className="text-white font-medium text-base">
            توفر نانوبايت مجموعة متنوعة من طرق الدفع لتلبية احتياجات عملائها بكل سهولة وراحة.
            <br /><br />
            تشمل طرق الدفع المتاحة:
            <br />
            - Visa
            <br />
            - MasterCard
            <br />
            - PayPal
            <br />
            - Zain Cash
            <br />
            - CliQ
          </p>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-12">
      <Button />
    </div>
  </div>
</section>


    </>
  );
}
export default FAQ;
