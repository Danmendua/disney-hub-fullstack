import React, { Suspense, useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import axios from "axios";
import HrMovieCard from "../plus/HrMovieCard";
import { useMovieStore } from "../../store/useMovieStore";
const API_URL = import.meta.env.VITE_API_URL;
import log from "../../services/logger";

function FavoriteMovies() {
  const [favorites, setFavorites] = useState([]);
  const elementRefs = useRef([]);
  const { checkFavoriteMovie, favoriteMovies } = useMovieStore();

  useEffect(() => {
    checkFavoriteMovie();
  }, [checkFavoriteMovie]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies/getFavorites`, {
          withCredentials: true,
        });
        setFavorites(response.data);
      } catch (error) {
        log.error("Erro ao buscar favoritos:", error);
      }
    };
    fetchFavorites();
  }, []);

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

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const favoriteChunks = chunkArray(favorites, 10);

  return (
    <>
      {favorites.length > 0 ? (
        favoriteChunks.map((chunk, index) => (
          <div
            key={index}
            className="relative  p-2 -mb-8 px-5 md:p-2 select-none"
          >
            {chunk.length >= 2 && (
              <>
                <HiChevronLeft
                  onClick={() => SliderLeft(index)}
                  className="text-white cursor-pointer absolute top-14 -left-1 md:top-20 md:-left-5"
                />
                <HiChevronRight
                  onClick={() => SliderRight(index)}
                  className="text-white cursor-pointer absolute top-14 -right-1 md:top-20 md:-right-5"
                />
              </>
            )}

            <div
              ref={(el) => (elementRefs.current[index] = el)}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6 pt-4 pb-8 px-5"
            >
              {chunk.map((movie) => (
                <HrMovieCard
                  key={movie.movie_id}
                  movie={movie}
                  favorites={favorites}
                  isFavorited={favoriteMovies.some(
                    (fav) => fav.id === movie.id
                  )}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-500 font-semibold mt-5 text-center">
          Nenhum filme curtido ainda.
        </p>
      )}
    </>
  );
}

export default FavoriteMovies;
