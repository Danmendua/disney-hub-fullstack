import React, { useEffect, useRef, useState } from "react";
import { useMovieStore } from "../../store/useMovieStore";
import MovieCard from "./MovieCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function TrendingMovies({ movieHomePage }) {
  const { checkFavoriteMovie, favoriteMovies, error } = useMovieStore();

  useEffect(() => {
    checkFavoriteMovie();
  }, [checkFavoriteMovie]);

  const chunkMovies = (movies, chunkSize = 10) => {
    const chunks = [];
    for (let i = 0; i < movies.length; i += chunkSize) {
      chunks.push(movies.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const movieChunks = chunkMovies(movieHomePage, 10);

  const elementRefs = useRef([]);

  const SliderRight = (index) => {
    if (elementRefs.current[index]) {
      const cardWidth =
        elementRefs.current[index].querySelector("img").offsetWidth + 20;
      const maxScrollLeft =
        elementRefs.current[index].scrollWidth -
        elementRefs.current[index].clientWidth;

      elementRefs.current[index].scrollLeft =
        elementRefs.current[index].scrollLeft >= maxScrollLeft
          ? 0
          : elementRefs.current[index].scrollLeft + cardWidth;
    }
  };

  const SliderLeft = (index) => {
    if (elementRefs.current[index]) {
      const cardWidth =
        elementRefs.current[index].querySelector("img").offsetWidth + 20;

      elementRefs.current[index].scrollLeft =
        elementRefs.current[index].scrollLeft <= 0
          ? elementRefs.current[index].scrollWidth
          : elementRefs.current[index].scrollLeft - cardWidth;
    }
  };

  return (
    <div className="relative m-5 md:m-14 p-2 -mb-8 px-5 md:p-2 select-none">
      <h2 className="text-xl font-bold">Filmes em Alta</h2>
      {movieChunks.map((chunk, index) => (
        <div key={index} className="mb-5 relative">
          {chunk.length >= 2 && (
            <>
              <HiChevronLeft
                onClick={() => SliderLeft(index)}
                className="hidden sm:block md:block text-white text-[30px] absolute bottom-48 md:bottom-2/4 mt-[150px] cursor-pointer z-10 transition-all ease-in-out delay-150 hover:-translate-x-1 hover:scale-105 duration-300 -left-5"
              />
              <HiChevronRight
                onClick={() => SliderRight(index)}
                className="hidden sm:block md:block text-white text-[30px] absolute bottom-48 md:bottom-2/4 -right-8 mt-[150px] cursor-pointer z-10 transition-all ease-in-out delay-150 hover:translate-x-1 hover:scale-105 duration-300"
              />
            </>
          )}
          <div
            ref={(el) => (elementRefs.current[index] = el)}
            className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth pt-4 px-3 pb-4"
          >
            {chunk.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                favorites={favoriteMovies}
                isFavorited={favoriteMovies.some((fav) => fav.id === movie.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
