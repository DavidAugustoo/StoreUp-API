import { Request, Response } from 'express';
import * as ValidationContract from '../validator/validator';
import * as Filters from '../validator/filters';
import * as authService from '../services/authService';
import * as AdRepository from '../repositories/AdRepository';
import * as UserRepository from '../repositories/UserRepository';
import dotenv from 'dotenv';
import * as upload from '../services/uploadImage';

dotenv.config();

type File = {
    fieldname: string
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}

export const add = async (req: Request, res: Response) => {
    let token = req.headers['x-access-token'] as string;
    let data = authService.decodeToken(token);
    let userData = await UserRepository.findByEmail(data.email);
    let {title, price, priceneg, desc, category} = req.body;
    let receivedImages = req.files as File[];


    ValidationContract.isRequired(title, 'O campo título não pode ser vazio.');
    ValidationContract.isRequired(category, 'O campo categoria não pode ser vazio.');

    if (!ValidationContract.isValid()) {
        res.status(400).send(ValidationContract.errors()).end();
        ValidationContract.clear();
        return;
    }

    if (price) {
        price = price.replace(',', '').replace(',','.').replace('R$', '');
    } else {
        price = 0;
    }

    let images = await upload.uploadImage(receivedImages);

    try {
        await AdRepository.createAd({
            idUser: userData.id,
            state: userData.state,
            category: category,
            images: images,
            dateCreated: new Date(),
            title: title,
            price: price,
            priceNegotiable: (priceneg == true) ? true : false,
            description: desc,
            views: 0,
            status: true
        });
        res.status(200).json({message: "Anúncio cadastrado com sucesso"});
    } catch(e) {
        console.log(e)
        res.status(400).json({message: "Erro ao processar sua requisição"});
    }

    upload.clearCache();
}

export const edit = () => {
    
}

export const getList = async (req: Request, res: Response) => {
    let { sort = "asc", offset = 0, limit = 8, query, category, state } = req.query;
    let ads = [];
    let total; 

    let filters = await Filters.Ads(query, category, state);

    let adsData = await AdRepository.getListbyFilters(filters, sort, offset, limit);

    for(let i in adsData) {
        let image;

        if(adsData[i].images.length > 0) {
            image = adsData[i].images[0];
        } else {
            image = `${process.env.BASE}/media/default.jpg`;
        }

        ads.push({
            id: adsData[i]._id,
            title: adsData[i].title,
            price: adsData[i].price,
            priceNegotiable: adsData[i].priceNegotiable,
            image: image
        });
    }

    res.status(200).json({ads});
}

export const getItem = () => {   
}