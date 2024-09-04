import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }   
})

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:(req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
          return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
})

export {upload}