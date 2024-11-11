import React from "react";
import "../../styles/Login.css";

export default function TransparentCenter({ children, className }) {
  const updateCursor = (e) => {
    document.documentElement.style.setProperty("--x", e.clientX);
    document.documentElement.style.setProperty("--y", e.clientY);
  };
  document.body.addEventListener("pointermove", updateCursor);
  return (
    <div
      className={`card w-[300px] h-auto md:h-auto bg-gradient-to-br from-rose-300/30 to-emerald-500/50 dark:from-slate-900/20 dark:to-slate-800/50 table-column items-center relative ${className}`}
    >
      {children}
    </div>
  );
}
