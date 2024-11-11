import { create } from "zustand";
import axios from "axios";
axios.defaults.withCredentials = true;
import log from "../services/logger";
const API_URL = import.meta.env.VITE_API_URL;

export const useMovieStore = create((set, get) => ({
  error: null,
  isLoading: false,
  moviesSlider: [],
  movieList: [],
  moviesData: [],
  favoriteMovies: [],
  movieDetails: [],
  movieTrailer: [],
  movieHomePage: [],

  resetMovies: () =>
    set(() => ({
      error: null,
      isLoading: false,
      moviesSlider: [],
      moviesData: [],
      favoriteMovies: [],
      movieDetails: [],
      movieTrailer: [],
    })),

  getTrendingHomePage: async () => {
    try {
      const response = await axios.get(`${API_URL}/movies/trending`);
      set({
        movieHomePage: response.data.results,
        error: null,
        moviesSlider: response.data.results.slice(0, 5),
      });
    } catch (error) {
      set({ error: "Erro ao buscar filmes em alta." });
      log.error("Erro ao buscar filmes em alta:", error);
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      set({ isLoading: true, error: null });

      const [response, trailer] = await Promise.all([
        axios.get(`${API_URL}/movies/getById/${movieId}`),
        axios.get(`${API_URL}/movies/trailer/${movieId}`),
      ]);

      set({
        movieDetails: response.data,
        movieTrailer: trailer.data,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      log.error("Erro ao buscar detalhes do filme:", error);
      set({ error, isLoading: false });
      throw error;
    }
  },

  checkFavoriteMovie: async () => {
    try {
      const response = await axios.get(`${API_URL}/movies/getFavorites`, {
        withCredentials: true,
      });
      const backendFavorites = response.data;
      const filteredFavorites = get().favoriteMovies.filter((movie) =>
        backendFavorites.some((fav) => fav.movie_id === movie.movie_id)
      );
      const uniqueFavorites = backendFavorites.filter(
        (movie) =>
          !filteredFavorites.some((fav) => fav.movie_id === movie.movie_id)
      );

      const updatedFavorites = [...filteredFavorites, ...uniqueFavorites];
      set({ favoriteMovies: updatedFavorites });
    } catch (error) {
      log.error("Erro ao buscar favoritos do backend:", error);
    }
  },

  setFavoriteMovie: async (movieData) => {
    const currentFavorites = get().favoriteMovies;
    const isFavorited = currentFavorites.some(
      (movie) => movie.id === movieData.id
    );

    set({ isLoading: true, error: null });

    try {
      if (isFavorited) {
        const updatedFavorites = currentFavorites.filter(
          (movie) => movie.id !== movieData.id
        );
        set({ favoriteMovies: updatedFavorites, isLoading: false });
        await axios.delete(`${API_URL}/movies/deleteMovie`, {
          data: { id: movieData.id },
          withCredentials: true,
        });
      } else {
        const response = await axios.post(
          `${API_URL}/movies/favoriteMovie`,
          movieData,
          {
            withCredentials: true,
          }
        );

        const updatedFavorites = [...currentFavorites, movieData];

        set({ favoriteMovies: updatedFavorites, isLoading: false });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      log.error(
        "Erro ao definir filme favorito:",
        error.response?.data || error
      );
      throw error;
    }
  },

  deleteFavoriteMovie: async (movieId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/movies/deleteMovie`, {
        data: { id: movieId },
        withCredentials: true,
      });
      set((state) => ({
        favoriteMovies: state.favoriteMovies.filter(
          (movie) => movie.id !== movieId
        ),
        isLoading: false,
      }));
    } catch (error) {
      log.error("Erro ao remover filme dos favoritos:", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },
}));
