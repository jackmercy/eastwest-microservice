const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let dir = path.join(path.dirname(require.main.path), '.tmp/uploads');
      if (req.body.directory) {
        dir = path.join(dir, req.body.directory.replace(/\//g, ''));
      }
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      callback(null, dir);
    },
    filename: (req, file, callback) => {
      callback(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname),
      );
    },
  }),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
    files: 10,
  },
});

module.exports = upload;
