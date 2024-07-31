import services_svg2 from "../Photo/hero-svg-img-2.svg";

function FeaturesOfOurServices2() {
  return (
    <>
      <div class="font-cairo sm:flex items-center justify-center min-h-screen max-w-screen-xl mx-auto">
        <div class="sm:w-1/2 p-10">
          <div class="image object-center text-center">
            <img src={services_svg2} />
          </div>
        </div>
        <div class="sm:w-1/2 p-5 [direction:rtl]">
          <div class="text-right">
            <span class="text-white border-b-2 border-white uppercase">
              نانوبايت هوست
            </span>
            <h2 class="my-4 font-bold text-3xl text-white sm:text-4xl">
              نظام حماية من هجمات DDoS عالي الكفاءة
            </h2>
            <p class="text-white">
              <span class="font-bold">
                نحن نقدم نظام حماية DDoS من Arbor عالي الكفائة.
              </span>
              <br />
              <br />
              <span class="font-semibold">
                {" "}
                تعاوننا مع شركة Arbor يتيح لنا حماية شبكتنا من هجمات إيقاف
                الخدمة (DDoS) لضمان أمان خدمات عملائنا. <br /> نظام الحماية
                لدينا قادر على التصدي لهجمات تصل قوتها إلى 2.5 تيرابايت في
                الثانية الواحدة.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default FeaturesOfOurServices2;
