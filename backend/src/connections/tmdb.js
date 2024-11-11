const axios = require("axios");
const logger = require("../utils/logger");

const movieBaseUrl = process.env.MOVIE_BASE_URL;
const apiKey = process.env.API_KEY;

const tmdbConnect = async (endpoint) => {
  return axios
    .get(
      `${movieBaseUrl}/discover/movie?api_key=${apiKey}&include_adult=false&include_video=true&language=pt-BR&region=BR&sort_by=popularity.desc&watch_region=BR${endpoint}`
    )
    .catch((error) => {
      logger.error("Erro ao buscar os filmes: ", error);
      return Promise.reject(error);
    });
};

const tmdbConnectById = async (id) => {
  return axios
    .get(
      `${movieBaseUrl}/movie/${id}?api_key=${apiKey}&language=pt-BR&region=BR`
    )
    .catch((error) => {
      logger.error("Erro ao buscar os filmes: ", error);
      return Promise.reject(error);
    });
};

const tmdbGetVideo = async (id) => {
  return axios
    .get(`${movieBaseUrl}/movie/${id}/videos?api_key=${apiKey}&language=pt-BR`)
    .catch((error) => {
      logger.error("Erro ao buscar os vídeos: ", error);
      return Promise.reject(error);
    });
};

module.exports = { tmdbConnect, tmdbConnectById, tmdbGetVideo };
