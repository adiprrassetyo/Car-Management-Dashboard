const multer = require("multer");

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

// Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const storageEnggine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// Single File Route Handler
uploadFileMiddleware = multer({ storage: storageEnggine, fileFilter: fileFilter }).single("image");

module.exports = uploadFileMiddleware;
