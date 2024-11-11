const express = require("express");
const router = express.Router();

const {
  getTrendingSlider,
  setFavoriteMovie,
  deleteFavoriteMovie,
  getFavorites,
  findById,
  getTrailer,
} = require("../controllers/movieController");

router.get("/getById/:id", findById);
router.get("/trending", getTrendingSlider);
router.get("/trailer/:id", getTrailer);
router.post("/favoriteMovie", setFavoriteMovie);
router.get("/getFavorites", getFavorites);
router.delete("/deleteMovie", deleteFavoriteMovie);

module.exports = router;
