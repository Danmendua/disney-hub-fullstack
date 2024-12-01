const knex = require("../connections/databaseConnect");
const {
  tmdbConnect,
  tmdbConnectById,
  tmdbGetVideo,
} = require("../connections/tmdb");
const endpointTrendingSlider = "&vote_average.gte&with_watch_providers=337";
const logger = require("../utils/logger");

const getTrendingSlider = async (req, res) => {
  try {
    const trending = await tmdbConnect(endpointTrendingSlider);
    res.status(200).json(trending.data);
  } catch (error) {
    logger.error("Erro ao buscar os filmes mais populares: ", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar filmes populares", success: false });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const movieById = await tmdbConnectById(id);
    res.status(200).json(movieById.data);
  } catch (error) {
    logger.error("Erro ao buscar filme por ID: ", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar filme favoritado", success: false });
  }
};

const setFavoriteMovie = async (req, res) => {
  const {
    id: movie_id,
    title,
    genre_ids,
    overview,
    popularity,
    backdrop_path,
    vote_average,
    vote_count,
  } = req.body;

  const user_id = req.user.id;

  const requiredFields = [
    movie_id,
    title,
    genre_ids,
    overview,
    popularity,
    backdrop_path,
    vote_average,
    vote_count,
  ];
  const hasAllFields = requiredFields.every(
    (field) => field !== undefined && field !== null
  );
  if (!hasAllFields) {
    return res.status(400).json({
      message: "Dados insuficientes para favoritar filme",
      success: false,
    });
  }
  try {
    const alredyFavorited = await knex("favoritos")
      .where({ user_id, movie_id })
      .first();
    if (alredyFavorited) {
      return res
        .status(400)
        .json({ message: "Filme já favoritado", success: false });
    }
    await knex("favoritos").insert({
      user_id,
      movie_id,
      title,
      genre_ids,
      overview,
      popularity,
      backdrop_path,
      vote_average,
      vote_count,
    });
    res
      .status(201)
      .json({ message: "Filme favoritado com sucesso!", success: true });
  } catch (error) {
    logger.error("Erro ao favoritar filme: ", error);
    res
      .status(500)
      .json({ message: "Erro ao favoritar filme", success: false });
  }
};

const deleteFavoriteMovie = async (req, res) => {
  const { id: movie_id } = req.body;
  const user_id = req.user.id;

  try {
    const favorited = await knex("favoritos")
      .where({ user_id, movie_id })
      .first();
    if (!favorited) {
      return res
        .status(400)
        .json({ message: "Filme não favoritado", success: false });
    }
    await knex("favoritos").where({ user_id, movie_id }).delete();
    res.status(200).json({
      message: "Filme removido dos favoritos com sucesso!",
      success: true,
    });
  } catch (error) {
    logger.error("Erro ao remover filme dos favoritos: ", error);
    res
      .status(500)
      .json({ message: "Erro ao remover filme dos favoritos", success: false });
  }
};

const getFavorites = async (req, res) => {
  const user_id = req.user?.id;
  if (!user_id) {
    return res
      .status(400)
      .json({ message: "User ID não fornecido", success: false });
  }
  try {
    const favorites = await knex("favoritos").where({ user_id });
    res.status(200).json(favorites);
  } catch (error) {
    logger.error("Erro ao buscar favoritos: ", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar favoritos", success: false });
  }
};

const getTrailer = async (req, res) => {
  const { id } = req.params;

  try {
    const trailer = await tmdbGetVideo(id);
    res.status(200).json(trailer.data);
  } catch (error) {
    logger.error("Erro ao buscar trailer: ", error);
    res.status(500).json({ message: "Erro ao buscar trailer", success: false });
  }
};

module.exports = {
  getTrendingSlider,
  setFavoriteMovie,
  deleteFavoriteMovie,
  getFavorites,
  findById,
  getTrailer,
};
