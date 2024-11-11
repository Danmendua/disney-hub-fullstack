const knex = require("../connections/databaseConnect");
const logger = require("../utils/logger");
require("dotenv").config();
const alredyExist = async (req, res, next) => {
  const { email } = req.body;
  try {
    const userFound = await knex("users").where({ email }).first();
    if (userFound) {
      return res
        .status(409)
        .json({ message: "Conta existente", success: false });
    }
    next();
  } catch (erro) {
    logger.error("Erro ao verificar se o usuário já existe" + erro);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", success: false });
  }
};

const findUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const userFound = await knex("users")
      .where({ email })
      .select(
        "id",
        "nome",
        "email",
        "email_verified",
        "verification_token_expires_at"
      )
      .first();

    if (!userFound) {
      return res
        .status(404)
        .json({ message: "Email não existe.", success: false });
    }

    req.user = userFound;

    next();
  } catch (error) {
    logger.error("Erro ao buscar o usuário pelo e-mail" + error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", success: false });
  }
};

module.exports = { alredyExist, findUser };
