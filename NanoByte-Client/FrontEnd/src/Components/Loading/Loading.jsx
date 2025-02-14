import LogoNano from "../../Assets/Photo/android-chrome-512x512.png";

function Loading() {
  return (
    <div className="flex fixed w-full z-20 top-0 start-0 flex-col items-center justify-center h-screen bg-nano-bg-100">
      <div className="relative">
        <img
          src={LogoNano}
          alt="Logo"
          className="w-48 h-48 animate-pulse"
        />
      </div>
      <div className="mt-4 flex text-white text-xl font-semibold">
        <span className="mt-4 mr-2 flex space-x-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </span>
        جاري التحميل
      </div>
    </div>
  );
}

export default Loading;
