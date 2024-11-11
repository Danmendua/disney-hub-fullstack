const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const logger = require("../utils/logger");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const userId = req.user.id;
    return {
      folder: `user-avatars/${userId}`,
      format: file.mimetype.split("/")[1],
      transformation: [{ width: 250, height: 250, crop: "fill" }],
      public_id: `${file.originalname.split(".")[0]}-${Date.now()}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Arquivo inválido! Apenas imagens JPG, JPEG e PNG são permitidas."
      ),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

const removeOldImages = async (userId, maxImages = 1) => {
  try {
    const { resources } = await cloudinary.search
      .expression(`folder:user-avatars/${userId}`)
      .sort_by("created_at", "desc")
      .execute();
    if (resources.length > maxImages) {
      const imagesToDelete = resources.slice(maxImages);
      for (const image of imagesToDelete) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }
  } catch (error) {
    logger.error("Erro ao remover imagens antigas:", error);
  }
};
const uploadAvatar = async (req, res, next) => {
  try {
    await upload.single("avatar")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      await removeOldImages(req.user.id);
      next();
    });
  } catch (error) {
    logger.error("Erro ao fazer upload do avatar:", error);
    res.status(500).json({ error: "Erro ao fazer upload do avatar." });
  }
};

module.exports = uploadAvatar;
