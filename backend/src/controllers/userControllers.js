const knex = require("../connections/databaseConnect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  generateTokenAndSetCookie,
  generateResetPasswordToken,
} = require("../utils/generateTokenAndSetCookie");
const {
  sendVerificationEmail,
  sendResetPassword,
  sendConfirmResetPass,
} = require("../utils/sendVerificationEmail");
require("dotenv").config();
const { sendWelcomeBackEmail } = require("../utils/sendScheduleEmail");
const logger = require("../utils/logger");

const createUser = async (req, res) => {
  const { nome, email, senha, genero } = req.body;

  try {
    const encriptedPassword = await bcrypt.hash(senha, 10);
    const generateToken = crypto
      .randomBytes(6)
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 6);

    const userPush = {
      nome,
      email,
      senha: encriptedPassword,
      genero,
      verification_token: generateToken,
      verification_token_expires_at: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ),
      profile_picture:
        genero.toLowerCase() === "masculino"
          ? "/male.png"
          : genero.toLowerCase() === "feminino"
          ? "/female.png"
          : genero.toLowerCase() === "outro"
          ? "/genre.png"
          : undefined,
    };

    const emailStatus = await sendVerificationEmail(nome, email, generateToken);
    if (!emailStatus.success) {
      return res.status(400).json({
        message: emailStatus.error,
        success: false,
      });
    }

    const newUser = await knex("users")
      .insert(userPush)
      .returning([
        "id",
        "nome",
        "email",
        "genero",
        "last_login",
        "profile_picture",
      ]);

    if (!newUser) {
      return res
        .status(400)
        .json({ message: "O usuário não foi cadastrado.", success: false });
    }

    const { id, ...userData } = newUser[0];

    generateTokenAndSetCookie(res, id);

    return res.status(201).json({
      sucess: true,
      message: "Usuário cadastrado com sucesso!",
      usuario: userData,
    });
  } catch (erro) {
    logger.error("Erro registro", erro);
    return res.status(500).json({
      message: "O usuário não foi cadastrado. Tente novamente",
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, senha, lembrar } = req.body;

  try {
    const userFound = await knex("users").where({ email }).first();

    if (!userFound) {
      return res.status(400).json({ message: "Usário não encontrado" });
    } else if (userFound.email_verified === false) {
      return res.status(403).json({
        message: "É necessário verificar o seu email antes de fazer o login",
        success: false,
      });
    }

    if (userFound?.warning === true && userFound.last_login < new Date() - 30) {
      const { email } = userFound;
      await knex("users")
        .where({ email })
        .update({ last_login: new Date(), warning: false });
      await sendWelcomeBackEmail(userFound.nome, userFound.email);
    }

    const verifyPassword = await bcrypt.compare(senha, userFound.senha);

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ message: "O email ou senha não conferem", success: false });
    }

    const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, {
      expiresIn: lembrar ? "7d" : "8h",
    });

    const maxAge = lembrar ? 7 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      domain: ".danielmendes.dev",
    });

    await knex("users")
      .where({ id: userFound.id })
      .update({ last_login: new Date() });

    const {
      senha: _,
      id,
      verification_token,
      verification_token_expires_at,
      ...userData
    } = userFound;

    return res.status(200).json({
      usuario: userData,
      token,
    });
  } catch (error) {
    logger.error("Erro login", error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", success: false });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    domain: ".danielmendes.dev",
  });
  req.headers.authorization?.replace("Bearer ", "").trim();
  return res.status(200).json({
    success: true,
    message: "Usuário deslogado com sucesso!",
  });
};

const verifyToken = async (req, res) => {
  const { code } = req.body;
  try {
    const userTokenFound = await knex("users")
      .where("verification_token", code)
      .andWhere("verification_token_expires_at", ">", new Date())
      .first();

    if (!userTokenFound) {
      return res
        .status(400)
        .json({ message: "Token inválido ou expirado.", success: false });
    }

    const userUpdated = await knex("users")
      .where("id", userTokenFound.id)
      .update({
        email_verified: true,
        verification_token: null,
        verification_token_expires_at: null,
      })
      .returning("*");
    const token = jwt.sign({ id: userTokenFound.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    const maxAge = 2 * 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      domain: ".danielmendes.dev",
    });

    const {
      senha: _,
      id,
      verification_token,
      verification_token_expires_at,
      created_at,
      last_login,
      ...userData
    } = userUpdated[0];

    if (!userUpdated) {
      return res
        .status(500)
        .json({ message: "Erro ao verificar e-mail", success: false });
    }

    return res.status(200).json({
      sucess: true,
      message: "Usuário verificado com sucesso!",
      usuario: userData,
      token: token,
    });
  } catch (error) {
    logger.error("Erro verificar e-mail", error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", success: false });
  }
};

const checkAuth = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await knex("users")
      .where({ id })
      .select(
        "id",
        "nome",
        "email",
        "genero",
        "last_login",
        "profile_picture",
        "email_verified",
        "created_at"
      )
      .first();

    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado", success: false });
    }

    return res.status(200).json({ success: true, usuario: user });
  } catch (error) {
    logger.error("Erro checkAuth ", error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", success: false });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const idUser = req.user.id;
    const generateToken = generateResetPasswordToken(idUser);
    const emailStatus = await sendResetPassword(
      req.user.nome,
      req.user.email,
      generateToken
    );
    if (!emailStatus) {
      return res.status(500).json({
        message: "Não foi possível enviar o email, tente novamente!",
        success: false,
      });
    }
    await knex("users")
      .where({ id: idUser })
      .update({
        new_pass_token: generateToken,
        new_pass_token_expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
      });
    return res.status(200).json({
      sucess: true,
      message: "Email enviado com sucesso!",
    });
  } catch (error) {
    logger.error("Erro forgotPassword ", error);
    return res.status(500).json({
      message: "Não foi possível alterar a senha, tente novamente!",
      success: false,
    });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { senha, confirmarSenha } = req.body;
  const { time, ip, city, region, country, os, browser } = req.infos;

  if (senha !== confirmarSenha) {
    return res
      .status(400)
      .json({ message: "As senhas não coincidem.", success: false });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const authLogin = await knex("users").where({ id }).first();

    if (!authLogin || authLogin.new_pass_token_expires_at < new Date()) {
      return res.status(404).json({
        message: "Falha na atualização da senha. Tente enviar um novo token.",
        success: false,
      });
    }

    const encriptedPassword = await bcrypt.hash(senha, 10);

    await knex("users").where({ id }).update({
      senha: encriptedPassword,
      new_pass_token: null,
      new_pass_token_expires_at: null,
    });
    const emailStatus = await sendConfirmResetPass(
      authLogin.nome,
      authLogin.email,
      time,
      ip,
      city,
      region,
      country,
      os,
      browser
    );
    if (!emailStatus) {
      return res.status(500).json({
        message: "Não foi possível enviar o email, tente novamente!",
        success: false,
      });
    }
    res.clearCookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      domain: ".danielmendes.dev",
    });

    return res.status(200).json({
      sucess: true,
      message: "Nova senha criada com sucesso!",
    });
  } catch (error) {
    logger.error("Erro newPassword ", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        message:
          "Token inválido ou expirado. Solicite um novo link de redefinição.",
        success: false,
      });
    }
    logger.error("Erro newPassword: ", error);
    return res.status(500).json({
      message: "Erro no servidor. Tente novamente mais tarde.",
      success: false,
    });
  }
};

const updateUserInfo = async (req, res) => {
  const { id, profile_picture } = req.user;
  const { nome, senha, novaSenha, genero } = req.body;

  try {
    const updates = {};

    if (senha) {
      const userFind = await knex("users")
        .select("senha")
        .where({ id })
        .first();

      if (!userFind || !userFind.senha) {
        return res.status(400).json({
          message: "Nenhuma senha atual definida para o usuário.",
          success: false,
        });
      }

      const verifyPassword = await bcrypt.compare(senha, userFind.senha);
      if (!verifyPassword) {
        return res
          .status(400)
          .json({ message: "Senha incorreta.", success: false });
      }

      updates.senha = await bcrypt.hash(novaSenha, 10);
    }

    if (nome) {
      updates.nome = nome;
    }

    if (genero) {
      updates.genero = genero;

      const profilePicture =
        genero.toLowerCase() === "masculino"
          ? "/male.png"
          : genero.toLowerCase() === "feminino"
          ? "/female.png"
          : genero.toLowerCase() === "outro"
          ? "/genre.png"
          : undefined;
      if (profile_picture !== profilePicture) {
        updates.profile_picture = profilePicture;
      }
    }

    if (req.file) {
      updates.profile_picture = req.file.path;
    }

    if (Object.keys(updates).length > 0) {
      await knex("users").where({ id }).update(updates);
      return res.status(200).json({
        message: "Informações atualizadas com sucesso.",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Nenhuma informação para atualizar.",
        success: false,
      });
    }
  } catch (error) {
    logger.error("Erro ao atualizar informações do usuário: ", error);
    return res.status(500).json({
      message: "Erro ao atualizar informações do usuário.",
      success: false,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  logout,
  verifyToken,
  checkAuth,
  forgotPassword,
  newPassword,
  updateUserInfo,
};
