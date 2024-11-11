require("dotenv").config();
require("./utils/scheduler");
const limiter = require("./utils/limiter");
const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routers/userRoutes");
const authorization = require("./middlewares/authorization");
const loggedInRoutes = require("./routers/loggedInRoutes");
const movieRoutes = require("./routers/moviesRoutes");
const routesCheck = require("./routers/routesCheck");
const logger = require("./utils/logger");

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(limiter);

app.use("/api/auth", userRoutes);
app.use("/api/check", routesCheck);

app.use("/api/user", authorization, loggedInRoutes);
app.use("/api/movies", authorization, movieRoutes);

app.listen(process.env.PORT, () => {
  logger.info(
    `listening on port ${
      process.env.PORT
    }, no dia ${new Date().toLocaleString()}`
  );
});
