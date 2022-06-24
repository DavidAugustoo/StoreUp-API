import { Schema, Model, model, connection } from 'mongoose';

type Category = {
    name: string,
    slug: string,
}

const schema = new Schema<Category>({
    name: {
        type: String,
    },
    slug: {
        type: String,
    }
});

const modelName: string = "Category";

const pharsesModel = connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<Category>)
    : model<Category>(modelName, schema);

export default pharsesModel;