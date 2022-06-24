import { Router } from 'express';
import * as Auth from '../services/auth';
import * as UserController from '../controllers/UserController';

const app = Router();

app.get('/states', UserController.getStates);

app.post('/user/signin', Auth.signin);
app.post('/user/signup', Auth.signup);

app.get('/user/me', UserController.info);
app.put('/user/me', UserController.edit);

export default app;