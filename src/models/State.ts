import { Schema, Model, model, connection } from 'mongoose';

type State = {
    name: string,
    slug: string,
}

const schema = new Schema<State>({
    name: {
        type: String,
    },
});

const modelName: string = "State";

const pharsesModel = connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<State>)
    : model<State>(modelName, schema);

export default pharsesModel;