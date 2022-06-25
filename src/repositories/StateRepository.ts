import State from '../models/State';
import mongoose from 'mongoose';

export const getAll = async () => {
    return await State.find({});
}

export const findById = async (id: string) => {
    let alredyExists = await State.findById(new mongoose.Types.ObjectId(id));

    if(alredyExists) {
        return alredyExists;
    } else {
       throw new Error("Estado não encontrado.");
    }
}
    