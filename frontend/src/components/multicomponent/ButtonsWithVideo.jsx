import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonsWithVideo({
  text,
  src,
  className,
  target,
  classText,
}) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={`border-[1px] border-white rounded-lg hover:scale-110 transition-all duration-100 ease-in-out cursor-pointer shadow-black/60 overflow-hidden hover:outline hover:-outline-offset-2 outline-2 dark:outline-slate-800 shadow-[5px_5px_0px_0px_rgba(109,40,217)] dark:border-slate-800 ${className}`}
      onClick={() => navigate(target)}
    >
      <video
        src={src}
        autoPlay
        loop
        playsInline
        muted
        className="absolute w-full h-full object-cover top-0 left-0 z-0 transition-opacity duration-300 opacity-0 hover:opacity-80"
      />
      <h1
        className={`text-lg flex items-center font-semibold justify-center text-white ${classText}`}
      >
        {text}
      </h1>
    </button>
  );
}
