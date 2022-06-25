import { Request, Response } from 'express';
import * as repository from '../repositories/StateRepository';


export const getStates = async (req: Request, res: Response) => {
    try {
        let response = await repository.getAll();
        res.json(response);
    } catch(error) {
        res.json({error});
    }
}