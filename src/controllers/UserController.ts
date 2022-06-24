import { Request, Response } from 'express';
import * as repository from '../repositories/StateRepository';

export const ping = async (req: Request, res: Response) => {
    return res.json({pong: true})
}

export const getStates = async (req: Request, res: Response) => {
    try {
        let response = await repository.getAll();

        res.json(response);

    } catch(error) {
        res.json({error});
    }
}

export const getInfo = () => {

}

export const edit = () => {
    console.log("oi")
}


