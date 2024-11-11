import React, { useState, useEffect } from "react";
import LikeButtonHr from "./LikeButtonHr";
const movieBaseImg = import.meta.env.VITE_MOVIE_BASE_IMG300;

export default function HrMovieCard({ movie, favorites }) {
  const movieDetails = {
    movie_id: movie.movie_id,
    title: movie.title,
    backdrop_path: movie.poster_path,
    genre_ids: movie.genre_ids,
    overview: movie.overview,
    popularity: movie.popularity,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
  };
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const isMovieFavorited = favorites.some(
      (fav) => fav.movie_id === movie.movie_id
    );
    setIsLiked(isMovieFavorited);
  }, [favorites, movie.movie_id]);

  return (
    <section className="relative justify-items-center hover:scale-110 transition-all duration-100 ease-in-out">
      <div className="relative">
        <img
          draggable="false"
          src={movieBaseImg + movie.backdrop_path}
          alt={movie.title}
          className="rounded-lg border-2 border-gray-600 shadow-lg"
        />
        <LikeButtonHr
          infos={movieDetails}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />
      </div>
      <a
        href={`/movies/${movie.movie_id}`}
        className="flex justify-center w-28 md:w-64 text-white mt-2 hover:scale-105 transition-all duration-100 ease-in-out"
      >
        {movie.title}
      </a>
    </section>
  );
}
