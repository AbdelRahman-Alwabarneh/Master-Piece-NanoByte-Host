import services_svg from "../../Photo/services.svg";

function FeaturesOfOurServices5() {
  return (
    <>
      <h2 className="font-cairo text-3xl font-bold text-center text-white mb-3 mt-[100px]">
        ما الذي يميزنا
      </h2>
      <p className="font-cairo text-white text-center">
        تتميز خدماتنا بمزايا فريدة لا تتوفر لدى الاستضافات الأخرى، <br /> وذلك
        بفضل تفوق فريق العمل لدينا في تقديم تجربة مميزة تسهل أعمالك وتضفي عليها
        طابعًا من الراحة والأمان
      </p>
      <div className="font-cairo sm:flex items-center justify-center max-w-screen-xl mx-auto [direction:rtl] min-h-screen">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src={services_svg} />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-white border-b-2 border-[#fff] uppercase">
              نانوبايت هوست
            </span>
            <h2 className="my-4 font-bold text-3xl text-white sm:text-4xl ">
            إستضافة مواقع ويندوز
            </h2>
            <p className="text-white font-semibold">
              <i className="fa-solid fa-check ml-1"></i>
              أسعار تنافسية تناسب الجميع مع جودة مثالية.
              <br />
              <br />
              <i className="fa-solid fa-check ml-1"></i>
              لوحة تحكم مميزة من PLESK
              <br />
              <br />
              <i className="fa-solid fa-check ml-1"></i>
              بدون إشتراكات سنوية إجبارية
              <br />
              <br />
              <i className="fa-solid fa-check ml-1"></i>
              بدون حدود لقواعد البيانات
              <br />
              <br />
              <i className="fa-solid fa-check ml-1"></i>
              بدون حدود لكمية البيانات المستخدمة
              <br />
              <br />
              <i className="fa-solid fa-check ml-1"></i>
              دعم فني عربي على مدار الساعة
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default FeaturesOfOurServices5;
