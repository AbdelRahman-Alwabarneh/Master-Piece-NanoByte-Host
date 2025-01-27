import LogoNanoByte from "../../../Assets/Photo/logolit-removebg-preview.png";
import { Link } from "react-router-dom";

function LogoNanoByteAndName() {
  return (
    <>
      <div className="flex min-[870px]:order-2 space-x-3 min-[870px]:space-x-0 rtl:space-x-reverse">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            className="h-14"
            style={{ userSelect: "none" }}
            src={LogoNanoByte}
            alt="Logo NanoByte"
          />

          <span className="font-cairo self-center  max-[869px]:flex max-[935px]:hidden max-[366px]:hidden max-[300px]:hidden text-2xl font-bold whitespace-nowrap text-nano-text-100">
            نانوبايت هوست
          </span>
        </Link>
      </div>
    </>
  );
}
export default LogoNanoByteAndName;
