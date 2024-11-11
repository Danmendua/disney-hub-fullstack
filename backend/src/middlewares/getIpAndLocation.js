const UAParser = require("ua-parser-js");
const requestIp = require("request-ip");
var geoip = require("geoip-lite");
const logger = require("../utils/logger");

const getInfosReq = function (req, res, next) {
  try {
    const clientIp = requestIp.getClientIp(req);

    if (process.env.NODE_ENV === "development" && !clientIp) {
      clientIp = "187.19.156.10";
    }

    var geo = geoip.lookup(clientIp);

    const parser = new UAParser();
    const ua = parser.setUA(req.headers["user-agent"]).getResult();
    const formatedInfos = {
      time: new Date().toLocaleString(),
      ip: clientIp,
      browser: ua.browser.name,
      os: ua.os.name,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      latitude: geo.ll[0],
      longitude: geo.ll[1],
    };

    req.infos = formatedInfos;
    next();
  } catch (error) {
    logger.error("Erro ao processar requisições do usuário:", error);
    req.infos = {
      time: new Date().toLocaleString(),
      ip: "N/A",
      browser: "Desconhecido",
      os: "Desconhecido",
      city: "N/A",
      region: "N/A",
      country: "N/A",
      latitude: "N/A",
      longitude: "N/A",
    };

    res.status(500).json({
      message: "Erro ao processar informações da requisição",
      success: false,
    });
  }
};

module.exports = getInfosReq;
