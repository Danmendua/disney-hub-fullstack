import React from "react";

export default function HeaderItem({ name, Icon, className }) {
  return (
    <div
      className={`flex items-center gap-3 text-[15px] font-semibold cursor-pointer mb-2 group select-none ${className}`}
    >
      <Icon />
      <h2 className="relative hover-effect">{name}</h2>
      <style>{`
        .hover-effect {
          position: relative;
          display: inline-block;
          overflow: hidden;
        }

        .hover-effect::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: currentColor;
          visibility: hidden;
          transform: scaleX(0);
          transition: all 0.3s ease-in-out;
        }

        .group:hover .hover-effect::before {
          visibility: visible;
          transform: scaleX(1);
        }
      `}</style>
    </div>
  );
}
