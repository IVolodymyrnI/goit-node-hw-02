const path = require("node:path");
const multer = require("multer");

const tempDir = path.join(__dirname, "temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalName);
  },
});

const updalod = multer(storage);

module.exports = updalod;
