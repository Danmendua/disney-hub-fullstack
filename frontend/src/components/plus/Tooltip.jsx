import React from "react";
import "../../styles/Tooltip.css";

export function Tooltip({ children, message, location }) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div
        className={`absolute left- transform -translate-x-1/2 translate-y-full 
                   scale-0 group-hover:scale-100 transition-transform duration-300 bg-gray-800 
                   rounded-lg px-3 py-2 text-sm font-medium text-white shadow-lg mt-2 ${location}`}
        style={{ minWidth: "50px", whiteSpace: "nowrap" }}
      >
        <div className="bg-gray-800"></div>
        {message}
      </div>
    </div>
  );
}
