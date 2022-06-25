import { Router } from 'express';
import * as Auth from '../services/authService';
import * as StateController from '../controllers/StateController';

const app = Router();

app.get('/states', StateController.getStates);

export default app;