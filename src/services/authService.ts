import { NextFunction, request, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type User = {
    email: string;
    password: string;
}

export const generateToken = async (data: User) => {
    return jwt.sign(data, process.env.SALT_KEY as string, { expiresIn: '1d' });
}

export const decodeToken = (token: string) => {
    return jwt.verify(token, process.env.SALT_KEY as string) as User;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): any => {
    let token = req.headers['x-access-token'] as string;

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, process.env.SALT_KEY as string, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Acesso Restrito'
                });
            } else {
                next();
            }
        });
    }
}