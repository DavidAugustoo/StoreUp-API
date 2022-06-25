import { Router } from 'express';
import * as Auth from '../services/authService';
import * as UserController from '../controllers/UserController';

const app = Router();

app.post('/user/signup', UserController.signUp);
app.post('/user/signin', UserController.signIn);

app.get('/user/me', Auth.authenticate, UserController.getInfo);
app.put('/user/me', Auth.authenticate, UserController.edit);

export default app;