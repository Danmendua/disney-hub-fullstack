import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { useAuthStore } from "../../store/authStore";

export default function SubmitButtonWithVideo({ text, src, className }) {
  const { isLoading } = useAuthStore();
  return (
    <button
      type="submit"
      className={`relative border-[1px] border-white rounded-lg hover:scale-105 transition-all duration-100 ease-in-out cursor-pointer shadow-black/60 overflow-hidden hover:outline hover:-outline-offset-2 outline-2 dark:outline-slate-800 w-full h-full p-1.5 shadow-[5px_5px_0px_0px_rgba(109,40,217)] dark:border-slate-800 ${className} select-none`}
      disabled={isLoading}
    >
      {isLoading ? (
        <ImSpinner2 className="w-7 h-7 text-lg animate-spin mx-auto" />
      ) : (
        <h1 className="text-lg flex justify-center text-black dark:text-white">
          {text}
        </h1>
      )}
      <video
        src={src}
        autoPlay
        loop
        playsInline
        muted
        className="absolute w-full h-full object-cover top-0 left-0 z-0 transition-opacity duration-300 opacity-0 hover:opacity-80"
      />
    </button>
  );
}
