
import dedicated_server_with_cpu from "../../Photo/dedicated_server-with-cpu.png";


function HeroSection() {
  return (
    <>
      <div className="mt-[72px]  [direction:rtl] font-cairo">
        <div
          className=" items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <div className="pr-2 md:mb-14 py-14 md:py-0">
            <h1 className="text-3xl font-semibold text-[white] xl:text-5xl lg:text-3xl ">
              <span className="block w-full mb-3">نانوبايت هوست</span> المكان الآمن
            </h1>
            <p className="py-4 text-lg font-semibold text-[white] 2xl:py-8 md:py-6">
              انطلق مع نانوبايت هوست واستمتع بأفضل خدمات الحوسبة السحابية،<br /> حيث
              نقدم خدمات احترافية متميزة من فريقنا في نانوبايت هوست. <br />لا تقلق
              بشأن هجمات DDOS.<br /> فنحن نوفر لك أمانًا مضمونًا لتجربة استخدام
              استثنائية.<br/> كما أن فريق الدعم الفني متاح على مدار الساعة لضمان أفضل
              تجربة لكم.
            </p>
            <div className="mt-4">
              <a
                href="#contact"
                className="px-5 font-bold py-3 text-lg tracking-wider text-white bg-blue-500 rounded-lg md:px-8 hover:bg-blue-600 group"
              >
                <span>انطلق معنا</span>{" "}
              </a>
            </div>
          </div>

          <div className="pb-10  md:p-10 lg:p-0 sm:pb-0">
            
            <img
              id="heroImg1"
              className=" rounded-[100%] transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
              src={dedicated_server_with_cpu}
              alt="Awesome hero page image"
              width="500"
              height="488"
            />
            </div>
          </div>
       
      </div>
    </>
  );
}
export default HeroSection;
