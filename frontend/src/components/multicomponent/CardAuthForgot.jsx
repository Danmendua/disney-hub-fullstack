import React from "react";
import "../../styles/Login.css";

export default function CardAuthForgot({ children, className }) {
  return (
    <div
      className={`card w-[300px] h-auto md:w-[600px] md:h-auto bg-gradient-to-br from-rose-300/30 to-emerald-500/70 dark:from-slate-900/20 dark:to-slate-800/70 table-column items-center relative ${className}`}
    >
      {children}
    </div>
  );
}
