const upload = require('../services/imageUploader');
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');
const { WrongImageFile } = require('../errors');


const generateThumbnail = async (file) => {
  const { path, filename, destination } = file;
  const readStream = fs.createReadStream(path);
  const transformer = await sharp()
    .resize({ width: 100 });
  if (!fs.existsSync(`${destination}/thumbnails`)) {
    fs.mkdirSync(`${destination}/thumbnails`);
  }

  const writeStream = fs.createWriteStream(`${destination}/thumbnails/${filename}`);
  readStream.pipe(transformer).pipe(writeStream);
}

const uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof WrongImageFile) {
      res.status(400).json({
        message: 'Only images are expected',
      });
    } else if (err instanceof multer.MulterError) {
      res.status(400).json({
        message: err.message,
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      // Work best when have [*option1]
      res.status(500).json({
        message: 'Something went wrong, please try again later.',
      });
    } else {
      try {
        await generateThumbnail(req.file);
        return res.status(201).json({
          file: `/${req.file.filename}`,
          thumbnail: `/thumbnails/${req.file.filename}`,
        });
      } catch (err) {
        console.log('err', err);
        res.status(500).json({
          message: 'Something went wrong, please try again later.',
        });
      }
    }
  });
};

module.exports = {
  uploadFile,
}
