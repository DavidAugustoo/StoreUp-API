import { Schema, Model, model, connection } from 'mongoose';

type User = {
    name: string,
    email: string,
    state: string,
    passwordHash: string,
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
    passwordHash: {
        type: String,
    },
    token: {
        type: String,
    }
});

const modelName: string = "User";

const pharsesModel = connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<User>)
    : model<User>(modelName, schema);

export default pharsesModel;