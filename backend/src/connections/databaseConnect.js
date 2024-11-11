require("dotenv").config();

const knex = require("knex")({
  client: process.env.DB_CLIENT,
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = knex;
