const express = require("express");
const { verifyTokenFront } = require("../controllers/routeController");
const { checkAuth } = require("../controllers/userControllers");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.get("/cookie", verifyTokenFront);

router.get("/user", authorization, checkAuth);

module.exports = router;
