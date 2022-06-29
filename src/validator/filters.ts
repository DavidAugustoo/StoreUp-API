import * as CategoryRepository from '../repositories/CategoryRepository';
import * as StateRepository from '../repositories/StateRepository';
import mongoose from 'mongoose';

type Filter = {
    title?: object;
    category?: any;
    state?: string;
}

export const Ads = async (query: any, category: any, state: any) => {
    var newCategory;
    var newState;

    let filters: Filter = {
    }
            
    if(query) {
        filters.title = {'$regex': query, '$options': 'i'};
    }

    if(category) {
        newCategory = await CategoryRepository.findByName(category);
        filters.category = newCategory[0].id;
    }

    if(state) {
        newState = await StateRepository.findByName(state);
        filters.state = newState[0].id;
    }

    return filters;
}