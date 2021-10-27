const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { WrongImageFile } = require('../errors');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(path.join(__dirname, 'images'))) {
      fs.mkdirSync(path.join(__dirname, 'images'));
    }
    cb(null, path.join(__dirname, 'images'))
  },
  filename: function (req, file, cb) {
    const dateTimeStamp = Date.now();
    cb(null, file.fieldname + '-' + dateTimeStamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if(['.png', '.jpg', '.gif', '.jpeg', '.bmp'].indexOf(ext.toLowerCase()) === -1) {
      return callback(new WrongImageFile());
    }
    callback(null, true);
  },
  limits:{
    fileSize: 20 * 1024 * 1024, // limit to 20mb
  }
}).single('image');

module.exports = upload;
