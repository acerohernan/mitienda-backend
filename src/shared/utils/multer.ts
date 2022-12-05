import multer from 'multer';

export const multerImageStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let extension = `.${file.mimetype.split('/')[1]}`;
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
});

export const imageFileTypeRegex = /jpeg|jpg|png/;
export const imageMaxSize = 1 * 1000 * 1000; //1mb
