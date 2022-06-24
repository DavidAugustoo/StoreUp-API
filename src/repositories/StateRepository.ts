import State from '../models/State';

export const getAll = async () => {
    return await State.find({});;
}
    