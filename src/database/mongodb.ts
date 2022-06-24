import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoConnect = async () => {
    try {
        if(process.env.NODE_ENV === 'TEST') {
            await connect(process.env.MONGO_URL as string);
        } else {
            await connect(process.env.MONGO_TEST_URL as string);
        } 
    } catch {
        console.log("Erro conexão MongoDb: ", Error);
    }
};