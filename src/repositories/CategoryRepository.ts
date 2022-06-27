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
