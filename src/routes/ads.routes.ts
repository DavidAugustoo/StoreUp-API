import { Router } from 'express';
import * as Auth from '../services/auth';
import * as AdsController from '../controllers/AdsController';

const app = Router();

app.get('/categories', AdsController.getCategories);

app.post('/ad/add', AdsController.addAction);
app.post('/ad/:id', AdsController.editAction);
app.get('/ad/list', AdsController.getList);
app.get('/ad/item', AdsController.getItem);


export default app;