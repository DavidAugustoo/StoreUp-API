import { Schema, Model, model, connection } from 'mongoose';

type User = {
    name: string,
    email: string,
    state: string,
    password: string,
    token: string
}

const schema = new Schema<User>({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    state: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    }
});

const modelName: string = "User";

const User = connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<User>)
    : model<User>(modelName, schema);

export default User;