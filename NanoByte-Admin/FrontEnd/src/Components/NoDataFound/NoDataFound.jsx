import LogoNano from "../../Assets/Photo/android-chrome-512x512.ico";

function NoDataFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br">
      <div className="relative">
        <img
          src={LogoNano}
          alt="Logo"
          className="w-48 h-48 animate-pulse"
        />
      </div>
      <div className="mt-4 flex text-white text-xl font-semibold">
        <span className="mt-4 mr-2 flex space-x-2">
        </span>
        لم يتم العثور على البيانات
      </div>
    </div>
  );
}

export default NoDataFound;
