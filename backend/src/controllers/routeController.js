const knex = require("../connections/databaseConnect");
const jwt = require("jsonwebtoken");

const verifyTokenFront = async (req, res) => {
  const authTokens =
    req.headers.cookie?.replace("token=", "").trim() ||
    req.headers.authorization?.replace("Bearer ", "").trim();

  if (authTokens) {
    try {
      const { id } = jwt.verify(authTokens, process.env.JWT_SECRET);

      const authLogin = await knex("users").where({ id }).first();

      if (!authLogin) {
        return res.status(200).json({
          isAuthenticated: false,
          role: "guest",
          message: "Usuário não encontrado.",
        });
      }

      const { senha, ...user } = authLogin;

      if (!user.email_verified) {
        return res.status(200).json({
          success: false,
          isAuthenticated: false,
          role: "user",
          message: "Email não verificado",
          usuario: user,
        });
      }

      return res
        .status(200)
        .json({ isAuthenticated: true, role: "user", usuario: user });
    } catch (error) {
      return res.status(200).json({
        isAuthenticated: false,
        role: "guest",
        message: "Token inválido ou expirado.",
      });
    }
  } else {
    return res.status(200).json({
      isAuthenticated: false,
      role: "guest",
      message: "Usuário não autenticado",
    });
  }
};

module.exports = { verifyTokenFront };
