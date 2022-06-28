import sharp from 'sharp';
import { unlink } from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

type File = {
    fieldname: string
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}

type FileData = {
    url: string;
    default: boolean;
}

let images: FileData[] = [];

export const uploadImage = async (receivedImages: File[]) => {
    if(receivedImages) {
        for(let i in receivedImages) {
            await sharp(receivedImages[i].path)
            .resize(250, 250, {
                fit: sharp.fit.cover,
                position: 'top'
            })
            .toFormat('jpeg')
            .toFile(`./public/media/${receivedImages[i].filename}`);

            images.push({
                url: `${process.env.BASE}/media/${receivedImages[i].filename}`,
                default: false
            });

            await unlink(receivedImages[i].path);
        }
    }

    images[0].default = true;

    return images;
}

export const clearCache = async () => {
    images = [];
}