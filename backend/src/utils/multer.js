const multer = require("multer");
const storage = require("../connections/cloudinary");
const upload = multer({ storage });

module.exports = upload;
