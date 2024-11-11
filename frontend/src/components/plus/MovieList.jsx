import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function MovieList({ movies, favorites }) {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 200;
  };

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 200;
  };
  return (
    <div className="relative">
      <HiChevronLeft
        onClick={scrollLeft}
        className="text-white cursor-pointer absolute bottom-1/2 -left-10"
      />
      <HiChevronRight
        onClick={scrollRight}
        className="text-white cursor-pointer absolute bottom-1/2 -right-10"
      />

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth pt-4 px-3 pb-4 z-10"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} favorites={favorites} />
        ))}
      </div>
    </div>
  );
}
