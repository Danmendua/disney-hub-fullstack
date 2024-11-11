import React, { useEffect } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useMovieStore } from "../../store/useMovieStore";
import log from "../../services/logger";
export default function LikeButton({ infos, isLiked, setIsLiked }) {
  const {
    setFavoriteMovie,
    deleteFavoriteMovie,
    favoriteMovies,
    checkFavoriteMovie,
  } = useMovieStore();

  const syncLike = favoriteMovies.some((movie) => movie.id === infos.id);

  useEffect(() => {
    const isMovieFavorited = favoriteMovies.some(
      (movie) => movie.id === infos.id
    );
    setIsLiked(isMovieFavorited);
  }, [favoriteMovies, infos.id]);

  const handleLike = async () => {
    if (!isLiked) {
      try {
        await toast.promise(setFavoriteMovie(infos), {
          loading: "Curtindo...",
          success: <b>Adicionado aos favoritos</b>,
          error: <b>Não foi possível, tente novamente!</b>,
        });
        setIsLiked(true);
        await checkFavoriteMovie();
      } catch (error) {
        log.error("Erro ao curtir:", error);
      }
    } else {
      try {
        await toast.promise(deleteFavoriteMovie(infos.id), {
          loading: "Descurtindo...",
          success: <b>Removido dos favoritos</b>,
          error: <b>Não foi possível, tente novamente!</b>,
        });
        setIsLiked(false);
        await checkFavoriteMovie();
      } catch (error) {
        log.error("Erro ao descurtir:", error);
      }
    }
  };
  return (
    <div className="hover:outline hover:-outline-offset-3 outline-2 absolute cursor-default rounded-lg mt-[2px] m-[1px] md:mt-[1px] md:m-[1.5px] inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
      <button type="button" onClick={handleLike}>
        {isLiked || syncLike ? (
          <HiHeart className="absolute cursor-pointer scale-125 w-10 h-10 md:w-12 md:h-12 z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 duration-100 fill-red-500 stroke-red-500" />
        ) : (
          <HiOutlineHeart className="absolute cursor-pointer w-10 h-10 md:w-12 md:h-12 z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 duration-100 stroke-red-500" />
        )}
      </button>
    </div>
  );
}
