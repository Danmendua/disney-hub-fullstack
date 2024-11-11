import React, { useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
const IMAGE_BASE_URL = import.meta.env.VITE_SLIDER_BASE_IMG_URL;

export default function Slider({ moviesSlider }) {
  const elementRef = useRef();

  const SliderRight = () => {
    if (elementRef.current) {
      const cardWidth =
        elementRef.current.querySelector("img").offsetWidth + 20;
      const maxScrollLeft =
        elementRef.current.scrollWidth - elementRef.current.clientWidth;

      elementRef.current.scrollLeft =
        elementRef.current.scrollLeft >= maxScrollLeft
          ? 0
          : elementRef.current.scrollLeft + cardWidth;
    }
  };

  const SliderLeft = () => {
    if (elementRef.current) {
      const cardWidth =
        elementRef.current.querySelector("img").offsetWidth + 20;

      elementRef.current.scrollLeft =
        elementRef.current.scrollLeft <= 0
          ? elementRef.current.scrollWidth
          : elementRef.current.scrollLeft - cardWidth;
    }
  };

  return (
    <div className="relative select-none pt-24">
      <HiChevronLeft
        className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer z-10 transition-all ease-in-out delay-150 hover:-translate-x-1 hover:scale-105 duration-300"
        onClick={SliderLeft}
      />
      <HiChevronRight
        className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0 z-10 transition-all ease-in-out delay-150 hover:translate-x-1 hover:scale-105 duration-300"
        onClick={SliderRight}
      />
      <div
        className="flex overflow-auto w-full px-16 py-4 scrollbar-hide scroll-smooth"
        ref={elementRef}
      >
        {moviesSlider.map((item, index) => (
          <div
            key={index}
            className="relative min-w-full md:h-[310px] mr-5 shadow-lg shadow-black/60 hover:outline hover:outline-2 hover:outline-offset-2 hover:-translate-y-1 hover:scale-105 duration-200"
          >
            <img
              draggable="false"
              src={IMAGE_BASE_URL + item.backdrop_path}
              alt="Imagem do filme"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-3xl font-bold">
              <a
                href={`/movies/${item.id}`}
                className="relative group hover:-translate-y-1 hover:scale-105 duration-100"
              >
                <span className="relative z-10 transition-transform transform group-hover:translate-y-1 duration-300">
                  {item.title}
                </span>

                <span className="absolute top-0 left-0 text-blue-500 text-3xl font-bold opacity-80 transition-transform transform group-hover:translate-x-2 group-hover:text-blue-500 duration-300">
                  {item.title}
                </span>
                <span className="absolute top-0 left-0 text-red-500 text-3xl font-bold opacity-80 transition-transform transform group-hover:-translate-x-2 group-hover:text-red-500 duration-300">
                  {item.title}
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
