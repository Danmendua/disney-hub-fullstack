import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function BackToHome() {
  const navigate = useNavigate();

  return (
    <button
      className="hidden md:block absolute z-10 top-5 left-5 hover:scale-110 transition-transform duration-200 ease-in-out group"
      type="button"
      onClick={() => navigate("/")}
    >
      <div className="relative flex text-7xl text-white dark:text-slate-800">
        <span className="relative z-10 transition-transform transform group-hover:translate-y-1 duration-300">
          <HiOutlineArrowLeftCircle />
        </span>
        <span className="absolute top-0 left-0 text-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-80 group-hover:translate-x-2">
          <HiOutlineArrowLeftCircle />
        </span>
        <span className="absolute top-0 left-0 text-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-80 group-hover:-translate-x-2">
          <HiOutlineArrowLeftCircle />
        </span>
      </div>
    </button>
  );
}
