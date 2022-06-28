import Ad from '../models/Ad';
import mongoose from 'mongoose';

type AdData = {
    idUser: string,
    state: string,
    category: string,
    images: string,
    dateCreated: Date,
    title: string
    price: number,
    priceNegotiable: boolean,
    description: string,
    views: number,
    status: boolean
}

export const getListbyId = async (id: string) => {
    let alredyExists = await Ad.find({"idUser": new mongoose.Types.ObjectId(id)});
    
    if(alredyExists) {
        return alredyExists;
    } else {
        return "Não foram encontrados anúncios cadastrados";
    }
}

export const createAd = async (data: AdData) => {
    await Ad.insertMany({
        idUser: data.idUser,
        state: data.state,
        category: data.category,
        images: data.images,
        dateCreated: data.dateCreated,
        title: data.title,
        price: data.price,
        priceNegotiable: data.priceNegotiable,
        description: data.description,
        views: data.views,
        status: data.status
    });
}