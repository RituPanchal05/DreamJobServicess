const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  limits: {
    fieldNameSize: 300,
    fileSize: 120576, //    ~ 1mb
  },
  fileFilter: (req, file, cb) => {

    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(req.res.status(403).json({err:"Only supports .jpg, .png, .jpeg format"}), false);
      return;
    }

    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 120576) {
      cb(req.res.status(403).json({err:"image size must be less than 1mb"}), false);
      return;
    }

    cb(null, true);
  }
});