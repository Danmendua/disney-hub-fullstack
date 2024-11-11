const express = require("express");
const router = express.Router();

const bodyReqValidation = require("../middlewares/bodyReqValidation");
const { updateUserSchema } = require("../validations/schemaUser");
const { logout, updateUserInfo } = require("../controllers/userControllers");
const uploadErrorHandler = require("../middlewares/errorMulter");
const uploadAvatar = require("../connections/cloudinary");

router.post("/logout", logout);

router.put(
  "/update-user",
  uploadAvatar,
  uploadErrorHandler,
  bodyReqValidation(updateUserSchema),
  updateUserInfo
);

module.exports = router;
