import { json, Request, Response } from 'express';
import md5 from 'md5';
import * as UserRepository from '../repositories/UserRepository';
import * as StateRepository from '../repositories/StateRepository';
import * as ValidationContract from '../validator/validator';
import * as authService from '../services/authService';

type JwtPayload = {
    email: string,
}

export const signUp = async (req: Request, res: Response) => {
    let { name, email, password, state } = req.body;

    ValidationContract.isRequired(name, 'O campo nome não pode ser vazio.');
    ValidationContract.isRequired(email, 'O campo e-mail não pode ser vazio.');
    ValidationContract.isEmail(email, 'E-mail inválido.');
    ValidationContract.hasMinLen(password, 6,'A senha deve conter pelo menos 6 caracteres.');
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
        
        res.status(201).json({message: "Usuário criado com sucesso."});
    } catch(e) {
        res.status(400).json({message: "Usuário já cadastrado."});
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

    } catch {
        res.status(400).json({message: "Usuário não encontrado."});
    }
}

export const getInfo = async (req: Request, res: Response) => {
    let token = req.headers['x-access-token'] as string;
    let data = authService.decodeToken(token);

    try {
        let user = await UserRepository.findByEmail(data.email);
        let state = await StateRepository.findById(user.state);

        res.status(200).json({
            name: user.name,
            email: user.email,
            state: state.name,
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({message: "Falha ao processar sua requisição."});
    }
}

export const edit = (req: Request, res: Response) => {
    res.status(400).json({message: "Entrou"});
}