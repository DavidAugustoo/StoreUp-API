import { Request, Response } from 'express';
import md5 from 'md5';
import * as UserRepository from '../repositories/UserRepository';
import * as StateRepository from '../repositories/StateRepository';
import * as AdsRepository from '../repositories/AdRepository';
import * as ValidationContract from '../validator/validator';
import * as authService from '../services/authService';

export const signUp = async (req: Request, res: Response) => {
    let { name, email, password, state } = req.body;

    ValidationContract.isRequired(name, 'O campo nome não pode ser vazio.');
    ValidationContract.isRequired(email, 'O campo e-mail não pode ser vazio.');
    ValidationContract.isEmail(email, 'E-mail inválido.');
    ValidationContract.hasMinLen(password, 6, 'A senha deve conter pelo menos 6 caracteres.');
    ValidationContract.isRequired(state, 'O campo estado não pode ser vazio.');

    if (!ValidationContract.isValid()) {
        res.status(400).send(ValidationContract.errors()).end();
        ValidationContract.clear();
        return;
    }

    try {
        await UserRepository.createUser({
            name,
            email,
            password: md5(req.body.password + process.env.SALT_KEY),
            state
        });

        res.status(201).json({ message: "Usuário criado com sucesso." });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
}

export const signIn = async (req: Request, res: Response) => {
    let { email, password } = req.body;

    ValidationContract.isRequired(email, 'O campo e-mail não pode ser vazio.');
    ValidationContract.isRequired(password, 'O campo password não pode ser vazio.');

    if (!ValidationContract.isValid()) {
        res.status(400).send(ValidationContract.errors()).end();
        ValidationContract.clear();
        return;
    }

    try {
        await UserRepository.findUser(email, md5(password + process.env.SALT_KEY));

        let token = await authService.generateToken({
            email,
            password
        });

        res.status(201).json(token);

    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
}

export const getInfo = async (req: Request, res: Response) => {
    let token = req.headers['x-access-token'] as string;
    let data = authService.decodeToken(token);

    try {
        let user = await UserRepository.findByEmail(data.email);
        let state = await StateRepository.findById(user.state);
        let ads = await AdsRepository.getListbyId(user.id);

        res.status(200).json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads
        });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
}

export const edit = async (req: Request, res: Response) => {
    let { name, email, password, state } = req.body;
    let token = req.headers['x-access-token'] as string;
    let data = authService.decodeToken(token);
    let emailAlreadyExists = false;

    ValidationContract.isRequired(name, 'O campo nome não pode ser vazio.');
    ValidationContract.isRequired(email, 'O campo e-mail não pode ser vazio.');
    ValidationContract.isEmail(email, 'E-mail inválido.');
    ValidationContract.hasMinLen(password, 6, 'A senha deve conter pelo menos 6 caracteres.');
    ValidationContract.isRequired(state, 'O campo estado não pode ser vazio.');

    if (!ValidationContract.isValid()) {
        res.status(400).send(ValidationContract.errors()).end();
        ValidationContract.clear();
        return;
    }

        emailAlreadyExists = await UserRepository.verifyEmail(email);

        if(emailAlreadyExists) {
            res.status(404).json({message: "Email já cadastrado"});
        } else {
            try {
                await UserRepository.editUser(data.email, {
                    name,
                    email,
                    password: md5(req.body.password + process.env.SALT_KEY),
                    state
                });
                res.status(200).json({message: "Informações atualizadas com sucesso"});
            } catch(e) {
                res.status(500).json({message: "Falha ao processar sua requisição"});
            }
        }
};