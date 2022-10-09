const multer = require("multer");
// Storage Engine
const storageEnggine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload"); //directory
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


// Single File Route Handler will receive from (multipart/formdata) and limit 2 mb
uploadMiddleware = multer({ storage: storageEnggine, fileFilter: fileFilter,limits: { fileSize: '2000000' }}).single("image");

module.exports = uploadMiddleware;
