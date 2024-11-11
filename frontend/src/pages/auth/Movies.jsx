import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieStore } from "../../store/useMovieStore";
import { ImSpinner2 } from "react-icons/im";
import { HiMiniPlay, HiCalendar } from "react-icons/hi2";
import FavoriteMovies from "../../components/multicomponent/FavoriteMovies";
import CircularProgressBar from "../../components/plus/CircularProgressbar";
import LikeButton from "../../components/plus/LikeButton";
import TrailerSection from "../../components/plus/TrailerSection";
const Header = React.lazy(() => import("../../components/plus/Header"));
const IMAGE_BASE_URL = import.meta.env.VITE_MOVIE_BASE_IMG400;

const formatGenres = (genres) => {
  if (!genres || genres.length === 0) return "Sem Gêneros";
  return genres.map((genre) => genre.name).join(", ");
};

const formatDuration = (runtime) => {
  if (!runtime) return "Duração desconhecida";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

export default function Movies() {
  const { id } = useParams();
  const {
    getMovieDetails,
    movieDetails,
    movieTrailer,
    checkFavoriteMovie,
    favoriteMovies,
    isLoading,
    error,
  } = useMovieStore();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    getMovieDetails(id);
    checkFavoriteMovie();
  }, [id, getMovieDetails]);

  useEffect(() => {
    if (movieDetails) {
      const isFavorite = favoriteMovies.some(
        (movie) => movie.movie_id === movieDetails.id
      );
      setIsLiked(isFavorite);
    }
  }, [movieDetails, favoriteMovies]);
  const genre_ids = movieDetails.genres?.map((genre) => genre.id) || [];

  const movieData = {
    id: movieDetails.id,
    title: movieDetails.title,
    genre_ids,
    overview: movieDetails.overview,
    popularity: movieDetails.popularity,
    backdrop_path: movieDetails.backdrop_path,
    vote_average: movieDetails.vote_average,
    vote_count: movieDetails.vote_count,
  };
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <div className="flex flex-col items-center mt-14 pt-24 px-5 md:px-20">
        {error && (
          <div className="text-red-500 font-semibold mt-2 text-center">
            Erro ao carregar detalhes do filme: {error}
          </div>
        )}

        {isLoading ? (
          <ImSpinner2 className="flex items-center justify-center h-screen w-20 text-lg animate-spin mx-auto" />
        ) : movieDetails ? (
          <div className="flex flex-col md:flex-row gap-10 w-full max-w-7xl">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative">
                <LikeButton
                  infos={movieData}
                  isLiked={isLiked}
                  setIsLiked={setIsLiked}
                  className="absolute top-2 right-2 md:top-4 md:right-4 bg-opacity-80 rounded-full p-1"
                />
                <img
                  src={`${IMAGE_BASE_URL}${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  className="rounded-lg object-cover shadow-lg transition-all duration-300"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                  }}
                />
              </div>
              {movieDetails.homepage && (
                <a
                  href={movieDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full text-center py-2 rounded-lg bg-blue-500 text-white"
                >
                  Clique aqui para ver na Disney
                </a>
              )}
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-2xl md:text-4xl font-bold">
                {movieDetails.title} (
                {new Date(movieDetails.release_date).getFullYear()})
              </h1>
              <div className="flex gap-2 items-center text-base font-light mt-2">
                <HiCalendar className="text-blue-500" />
                {movieDetails.release_date}
                <div className="text-blue-400 ml-2">
                  {formatGenres(movieDetails.genres)}
                </div>
                <HiMiniPlay className="ml-2" />
                {formatDuration(movieDetails.runtime)}
              </div>

              <div className="flex  mt-5 bg-black/20 rounded-lg p-4">
                <div className="flex ml-2">
                  <CircularProgressBar
                    movieRate={
                      movieDetails.vote_average
                        ? movieDetails.vote_average.toFixed(1)
                        : "N/A"
                    }
                    movieVotes={
                      movieDetails.vote_count
                        ? movieDetails.vote_count.toLocaleString()
                        : "N/A"
                    }
                    size="size-16"
                    location="right-1 absolute"
                  />
                </div>
                <p className="ml-8">{movieDetails.overview}</p>
              </div>
              <TrailerSection trailers={movieTrailer} />
              <FavoriteMovies />
            </div>
          </div>
        ) : (
          <div>Detalhes do filme não encontrados.</div>
        )}
      </div>
    </div>
  );
}
