import { Router } from 'express';
import * as CategoryController from '../controllers/CategoryController';

const app = Router();

app.get('/categories', CategoryController.getCategories);

export default app;