import { Schema, Model, model, connection } from 'mongoose';

type Ad = {
    idUser: string,
    state: string,
    category: string,
    images: object,
    dateCreated: Date,
    title: string
    price: number,
    priceNegotiable: boolean,
    description: string,
    views: number,
    status: string
}

const schema = new Schema<Ad>({
    idUser: {
        type: String,
    },
    state: {
        type: String,
    },
    category: {
        type: String,
    },
    images: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
    },
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    priceNegotiable: {
        type: Boolean,
    },
    description: {
        type: String,
    },
    views: {
        type: Number,
    },
    status: {
        type: String,
    },
});

const modelName: string = "Ad";

const Ad = connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<Ad>)
    : model<Ad>(modelName, schema);

export default Ad;