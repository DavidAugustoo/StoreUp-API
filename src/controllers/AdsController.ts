import { Request, Response } from 'express';
import * as ValidationContract from '../validator/validator';
import * as authService from '../services/authService';
import * as AdRepository from '../repositories/AdRepository';
import * as UserRepository from '../repositories/UserRepository';
import mongoose from 'mongoose';

export const add = async (req: Request, res: Response) => {
    let token = req.headers['x-access-token'] as string;
    let data = authService.decodeToken(token);
    let userData = await UserRepository.findByEmail(data.email);
    let {title, price, priceneg, desc, category} = req.body;

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

    try {
        await AdRepository.createAd({
            idUser: userData.id,
            state: userData.state,
            category: category,
            images: "teste",
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
        res.status(400).json({message: "Erro ao processar sua requisição"});
    }
}

export const edit = () => {
    
}

export const getList = async (id: string) => {
}

export const getItem = () => {   
}