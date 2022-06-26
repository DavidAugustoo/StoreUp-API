import Ad from '../models/Ad';
import mongoose from 'mongoose';

export const getListbyUser = async (id: string) => {
    let alredyExists = await Ad.findById(new mongoose.Types.ObjectId(id));
    
    if(alredyExists) {
        return alredyExists;
    } else {
        return "Não foram encontrados anúncios cadastrados";
    }
}