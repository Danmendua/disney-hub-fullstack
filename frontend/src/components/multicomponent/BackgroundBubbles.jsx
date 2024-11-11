import React, { useEffect, useRef, useState } from "react";
import "../../styles/BackgroundBubbles.css";

export default function BackgroundBubbles({ background }) {
  const bubbleRef = useRef(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  const curXRef = useRef(curX);
  const curYRef = useRef(curY);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setTgX(event.clientX);
      setTgY(event.clientY);
    };

    const move = () => {
      curXRef.current += (tgX - curXRef.current) / 20;
      curYRef.current += (tgY - curYRef.current) / 20;

      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate(${Math.round(
          curXRef.current
        )}px, ${Math.round(curYRef.current)}px)`;
      }
      requestAnimationFrame(move);
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tgX, tgY]);
  return (
    <div
      className="absolute inset-0 gradient-bg w-screen h-screen z-0 overflow-hidden"
      id={background}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="gradients-container w-full h-full filter-blur">
        <div className="g1 absolute bg-[radial-gradient(circle_at_center,rgba(18,113,255,0.8)_0%,rgba(18,113,255,0)_50%)] mix-blend-hard-light w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] animate-moveVertical"></div>
        <div className="g2 absolute bg-[radial-gradient(circle_at_center,rgba(221,74,255,0.8)_0%,rgba(221,74,255,0)_50%)] mix-blend-hard-light w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] animate-moveInCircle reverse"></div>
        <div className="g3 absolute bg-[radial-gradient(circle_at_center,rgba(100,220,255,0.8)_0%,rgba(100,220,255,0)_50%)] mix-blend-hard-light w-[80%] h-[80%] top-[calc(50%-20%+200px)] left-[calc(50%-40%-500px)] animate-moveInCircle"></div>
        <div className="g4 absolute bg-[radial-gradient(circle_at_center,rgba(200,50,50,0.8)_0%,rgba(200,50,50,0)_50%)] mix-blend-hard-light w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] animate-moveHorizontal"></div>
        <div className="g5 absolute bg-[radial-gradient(circle_at_center,rgba(180,180,50,0.8)_0%,rgba(180,180,50,0)_50%)] mix-blend-hard-light w-[160%] h-[160%] top-[calc(50%-80%)] left-[calc(50%-80%)] animate-moveInCircle"></div>

        <div
          ref={bubbleRef}
          className="interactive absolute bg-[radial-gradient(circle_at_center,rgba(140,100,255,0.8)_0%,rgba(140,100,255,0)_50%)] mix-blend-hard-light w-full h-full top-[-50%] left-[-50%] opacity-70"
        ></div>
      </div>
    </div>
  );
}
