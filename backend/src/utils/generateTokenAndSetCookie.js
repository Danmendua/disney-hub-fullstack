const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: ".danielmendes.dev",
  });

  return token;
};

const generateResetPasswordToken = (id) => {
  return jwt.sign({ id, scope: "reset_password" }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

module.exports = { generateTokenAndSetCookie, generateResetPasswordToken };
