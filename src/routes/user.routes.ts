import { Router } from 'express';
import * as Auth from '../services/authService';
import * as UserController from '../controllers/UserController';

const app = Router();

app.get('/ping', UserController.ping);

// app.get('/states', UserController.getStates);

app.post('/user/signup', UserController.signUp);
app.post('/user/signin', UserController.signIn);

app.get('/user/me', UserController.getInfo);
app.put('/user/me', UserController.edit);

export default app;