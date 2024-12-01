import multer from "multer";
import path from 'path';

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:(req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
          return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
})

export {upload}