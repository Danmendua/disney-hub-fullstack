import React, { useEffect } from "react";
import { HiHeart, HiMiniXMark } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useMovieStore } from "../../store/useMovieStore";
import log from "../../services/logger";

export default function LikeButtonHr({ infos, isLiked, setIsLiked }) {
  const { favoriteMovies, deleteFavoriteMovie, checkFavoriteMovie } =
    useMovieStore();
  useEffect(() => {
    const isMovieFavorited = favoriteMovies.some(
      (movie) => movie.movie_id === infos.movie_id
    );
    setIsLiked(isMovieFavorited);
  }, [favoriteMovies, infos.movie_id]);

  const handleRemoveFavorite = async () => {
    if (isLiked) {
      try {
        await toast.promise(deleteFavoriteMovie(infos.movie_id), {
          loading: "Removendo dos favoritos...",
          success: <b>Removido dos favoritos</b>,
          error: <b>Não foi possível remover, tente novamente!</b>,
        });
        setIsLiked(false);
        await checkFavoriteMovie();
      } catch (error) {
        log.error("Erro ao remover dos favoritos:", error);
      }
    }
  };

  return (
    <div className="hover:outline hover:-outline-offset-3 outline-2 absolute cursor-default rounded-lg mt-[2px] m-[1px] md:mt-[1px] md:m-[1.5px] inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
      <button type="button" onClick={handleRemoveFavorite}>
        {!isLiked ? (
          <div className="absolute flex flex-col items-center justify-center w-full h-full text-white text-center space-y-1">
            <HiMiniXMark className="text-4xl mb-1" />
            <span className="text-base">Removido dos favoritos!</span>{" "}
          </div>
        ) : (
          <HiHeart className="absolute cursor-pointer scale-125 w-6 h-6 md:w-8 md:h-8 z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 duration-100 fill-blue-500 stroke-blue-500" />
        )}
      </button>
    </div>
  );
}
