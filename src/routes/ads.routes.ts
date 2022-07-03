import { Router } from 'express';
import * as Auth from '../services/authService';
import * as AdsController from '../controllers/AdsController';
import multer from 'multer';

const app = Router();

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+''+Date.now()+'.jpg');
    }
});

const upload = multer({
    storage: storageConfig,
    fileFilter: (req, file, cb) => {
       const allowed: String[] = ['image/png', 'image/jpg', 'image/jpeg'];
       // Se encontrar, returna true e libera, caso contrario, libera false e não aceita o arquivo
        cb(null, allowed.includes(file.mimetype));
    }, // Limita a quantidade máxima do arquivo - deve ser passada em bytes
    limits: { fieldSize: 10000 }
});

app.post('/ad/add', Auth.authenticate, upload.array('images', 3), AdsController.add);
app.post('/ad/:id', Auth.authenticate, AdsController.edit);

app.get('/ad/list', Auth.authenticate, AdsController.getList);
app.get('/ad/:id', Auth.authenticate, AdsController.getItem);


export default app;