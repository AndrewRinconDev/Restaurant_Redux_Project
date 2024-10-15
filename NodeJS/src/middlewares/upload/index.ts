import multer, { MulterError } from 'multer';
import { Request, Response, NextFunction  } from 'express';
import path from 'path';

const uploadPath = path.join(__dirname, '../../uploads');
//configurar el storage
const storage = multer.diskStorage({
    destination : (req: Request, file, cb )=> {
        cb(null, uploadPath)
    },
    filename: (req: Request, file, cb)=> {
        cb(null, Date.now()+'-'+file.originalname)
    }
})

//configurar el middleware
const upload = multer({storage: storage}).single('file');

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: any)=>{
        if(err) return res.status(500).json(err);
        next();
    })
}

export {
    uploadMiddleware
}