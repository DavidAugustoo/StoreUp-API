import { Router } from 'express';
import * as Auth from '../services/authService';
import * as AdsController from '../controllers/AdsController';

const app = Router();

app.post('/ad/add', Auth.authenticate, AdsController.add);
app.post('/ad/:id', Auth.authenticate, AdsController.edit);

app.get('/ad/list', Auth.authenticate, AdsController.getList);
app.get('/ad/item', Auth.authenticate, AdsController.getItem);


export default app;