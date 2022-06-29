import mongoose from 'mongoose';
import Category from '../models/Category';


export const getAll = async () => {
    return await Category.find({});
}

export const createCategory = async () => {
    await Category.insertMany({
        name: "Smartphones",
        slug: "smartphones"
    });
}

export const findById = async (id: any) => {
    let alredyExists = await Category.findById(new mongoose.Types.ObjectId(id));

    if(alredyExists) {
        return alredyExists;
    } else {
        throw new Error("Categoria não encontrada.");
    }
}

export const findByName = async (name: any) => {
    let alredyExists = await Category.find({slug: name.toLowerCase()});

    if(alredyExists) {
        return alredyExists;
    } else {
       throw new Error("Categoria não encontrada.");
    }
}