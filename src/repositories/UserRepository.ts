import User from '../models/User';
import mongoose from 'mongoose';

type DataUser = {
    name: string,
    email: string,
    password: string,
    state: string
}

export const createUser = async (data: DataUser) => {
    let alredyExists = await User.find({"email": data.email});

    if(alredyExists) {
        return await User.insertMany({
            name: data.name,
            email: data.email, 
            password: data.password,
            state: data.state
        });
    } else {
       throw new Error("Usuário já cadastrado");
    }
}

export const findUser = async (email: string, password: string) => {
    let alredyExists = await User.findOne({email, password});

    if(alredyExists) {
        return alredyExists;
    } else {
       throw new Error("Usuário não encontrado.");
    }
}

export const findByEmail = async (email: string) => {
    let alredyExists = await User.findOne({email});

    if(alredyExists) {
        return alredyExists;
    } else {
       throw new Error("Usuário não encontrado.");
    }
}

export const verifyEmail = async (email: string) => {
    let alredyExists = await User.findOne({email});

    if(alredyExists) {
        return true;
    } else {
        return false;
    }
}

export const editUser = async (email: string, data: DataUser) => {
    await User.findOneAndUpdate({email}, {
        name: data.name,
        email: data.email,
        password: data.password,
        state: data.state,
    });
}

