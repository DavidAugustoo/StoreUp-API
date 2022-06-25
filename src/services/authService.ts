import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type User = {
    email: string;
    password: string;
}

export const generateToken = async (data: User) => {
    return jwt.sign(data, process.env.PORT as string, { expiresIn: '1d' });
}

export const decodeToken = (token: string) => {
    return jwt.verify(token, process.env.PORT as string);
}