const express = require("express");
const router = express.Router();

const bodyReqValidation = require("../middlewares/bodyReqValidation");
const {
  userBodySchema,
  userLoginSchema,
  verifyTokenSchema,
  forgotTokenSchema,
  newPasswordSchema,
} = require("../validations/schemaUser");
const { alredyExist, findUser } = require("../middlewares/userMiddlewares");
const {
  createUser,
  loginUser,
  verifyToken,
  forgotPassword,
  newPassword,
} = require("../controllers/userControllers");
const getInfosReq = require("../middlewares/getIpAndLocation");

router.post(
  "/register",
  bodyReqValidation(userBodySchema),
  alredyExist,
  createUser
);

router.put(
  "/verify-account",
  bodyReqValidation(verifyTokenSchema),
  verifyToken
);

router.post("/login", bodyReqValidation(userLoginSchema), loginUser);

router.post(
  "/forgot-password",
  bodyReqValidation(forgotTokenSchema),
  findUser,
  forgotPassword
);

router.put(
  "/new-password/:token",
  bodyReqValidation(newPasswordSchema),
  getInfosReq,
  newPassword
);

module.exports = router;
