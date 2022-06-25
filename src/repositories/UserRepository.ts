import User from '../models/User';

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
        });
    } else {
       throw new Error("Usuário já cadastrado");
    }
}

export const findUser = async (email: string, password: string) => {
    let alredyExists = await User.findOne({email, password});

    console.log(alredyExists);

    if(alredyExists) {
        return alredyExists;
    } else {
       throw new Error("Usuário não encontrado.");
    }
}