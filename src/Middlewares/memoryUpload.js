const multer = require("multer");
const { uploader } = require("../Helpers/cloudinary");

const storage = multer.memoryStorage();

const memoryUpload = multer({
  storage,
  limits: {
    fileSize: 2e6,
  },
  fileFilter: (req, file, cb) => {
    // validasi
    if (
      file.mimetype != "image/png" &&
      file.mimetype != "image/jpg" &&
      file.mimetype != "image/jpeg"
    ) {
      req.fileValidationError = "Forbidden extension";
      return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
  },
});

const upload = (fieldname) => {
  return (req, res, next) => {
    memoryUpload.single(fieldname)(req, res, async (err) => {
      if (err) {
        return res.status(401).json({
          msg: err.message,
        });
      }

      if (req.fileValidationError) {
        return res.status(401).json({
          msg: req.fileValidationError,
        });
      }

      // try {
      //   // mengambil id dari token atau db
      //   let id;
      //   let nameFile;
      //   if (req.originalUrl == "/users/profile/edit") {
      //     id = req.userInfo.users_id;
      //     nameFile = "user-profile";
      //   } else {
      //     id = 2;
      //     nameFile = "product";
      //   }
      //   const { data, err } = await uploader(req, nameFile, id);
      //   if (data) req.urlImage = data.secure_url;
      //   if (err) throw err;
      // } catch {
      //   res.status(500).json({
      //     msg: "Internal Server Error",
      //   });
      // }

      next();
    });
  };
};

module.exports = { upload };
