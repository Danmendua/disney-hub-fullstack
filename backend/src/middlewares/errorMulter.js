const logger = require("../utils/logger");

const uploadErrorHandler = (err, req, res, next) => {
  if (err) {
    logger.error("Erro no upload:", err.message);
    return res.status(400).json({ error: err.message, success: false });
  }
  next();
};

module.exports = uploadErrorHandler;
