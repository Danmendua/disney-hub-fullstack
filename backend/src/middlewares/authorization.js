const knex = require("../connections/databaseConnect");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = async (req, res, next) => {
  const authTokens =
    req.headers.cookie?.replace("token=", "").trim() ||
    req.headers.authorization?.replace("Bearer ", "").trim();

  if (!authTokens) {
    return res.status(401).json({ message: "Não autorizado", success: false });
  }

  try {
    const { id } = jwt.verify(authTokens, process.env.JWT_SECRET);

    const authLogin = await knex("users").where({ id }).first();

    if (!authLogin) {
      return res
        .status(404)
        .json({ message: "Usuario não encontrado", success: false });
    }

    if (authLogin.email_verified === false) {
      return res.status(401).json({
        message:
          "Conta ainda não verificada, por favor verifique seu email ou reenvie o link de verificação",
        success: false,
      });
    }

    const { senha, ...user } = authLogin;

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expirado, faça login novamente.",
        success: false,
      });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(403)
        .json({ message: "Token inválido, sem permissão.", success: false });
    } else {
      return res
        .status(500)
        .json({ message: "Erro interno do servidor.", success: false });
    }
  }
};

module.exports = authorization;
