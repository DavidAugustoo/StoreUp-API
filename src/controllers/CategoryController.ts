import {Request, Response} from 'express';
import dotenv from 'dotenv';
import * as CategoryRepository from '../repositories/CategoryRepository';

dotenv.config();

export const getCategories = async (req: Request, res: Response) => {
    let categories = [];
    let response = await CategoryRepository.getAll();

    for(let i in response) {
        categories.push({
            ...response[i]._doc,
            img: `${process.env.BASE}/assets/images/${response[i].slug}.jpg`
        });
    }
    
    res.status(200).json(categories);
}