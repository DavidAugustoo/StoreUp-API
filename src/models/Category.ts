import { Schema, Model, model, connection } from 'mongoose';

type Category = {
    name: string,
    slug: string,
    _doc?: any
}

const schema = new Schema<Category>({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
});

const modelName: string = "Category";

const Category = connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<Category>)
    : model<Category>(modelName, schema);

export default Category;