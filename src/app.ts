import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongoConnect } from './database/mongodb';
import userRoute from './routes/user.routes';
import adsRoute from './routes/ads.routes';
import stateRoute from './routes/state.routes';
import categoryRoute from './routes/categories.routes';
dotenv.config();

mongoConnect();

// Configurações Servidor
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));

// Carregando Rotas
app.use('/', userRoute);
app.use('/', categoryRoute);
app.use('/', adsRoute);
app.use('/', stateRoute);


app.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: "Endpoint não encontrado!"});
});

export default app;