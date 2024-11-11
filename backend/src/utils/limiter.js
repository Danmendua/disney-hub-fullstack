const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 66650,
  message: {
    message: "Muito rápido! Tente novamente em 10 minutos.",
  },
  statusCode: 429,
  handler: (req, res) => {
    res.status(429).json({
      status: "error",
      message:
        "Você excedeu o número de requisições permitidas. Tente novamente mais tarde.",
    });
  },
  legacyHeaders: false,
  standardHeaders: "draft-7",
  keyGenerator: (req) => req.ip,
  skip: (req, res) => {
    return req.path === "/register";
  },
  skipSuccessfulRequests: false,
  requestPropertyName: "rateLimit",
});

module.exports = limiter;
