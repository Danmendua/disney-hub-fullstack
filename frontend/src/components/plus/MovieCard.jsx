import React, { useState, useEffect } from "react";
import CircularProgressbar from "./CircularProgressbar";
import LikeButton from "./LikeButton";

const movieBaseImg = import.meta.env.VITE_MOVIE_BASE_IMG300;
export default function MovieCard({ movie, favorites, isFavorited }) {
  const movieRate = parseFloat(movie.vote_average).toFixed(1);
  const movieVotes = movie.vote_count.toLocaleString();

  const movieDetails = {
    id: movie.id,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genre_ids,
    overview: movie.overview,
    popularity: movie.popularity,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
  };

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const isMovieFavorited = favorites.some((fav) => fav.movie_id === movie.id);
    setIsLiked(isMovieFavorited);
  }, [favorites, movie.id]);

  return (
    <section className="relative hover:scale-105 transition-all duration-100 ease-in-out cursor-pointer">
      <div className="relative">
        <img
          draggable="false"
          src={movieBaseImg + movie.poster_path}
          alt="Banner Filme"
          className="w-28 md:w-52 rounded-lg border-2 border-gray-600 shadow-lg shadow-black/60"
        />

        <LikeButton
          infos={movieDetails}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          isFavorited={isFavorited}
        />
      </div>

      <CircularProgressbar
        movieRate={movieRate}
        movieVotes={movieVotes}
        size="size-8"
        customPosition={{ top: "5px", right: "5px", position: "absolute" }}
      />
      <a
        href={`/movies/${movie.id}`}
        className="flex text-center justify-center w-28 md:w-52 text-white mt-2 hover:scale-105 transition-all duration-100 ease-in-out"
      >
        {movie.title}
      </a>
    </section>
  );
}
