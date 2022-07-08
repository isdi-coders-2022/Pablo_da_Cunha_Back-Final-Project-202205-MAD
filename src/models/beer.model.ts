/* istanbul ignore file */
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';


mongooseConnect();

export interface iBeer {
    id?: string;
    name: string;
    image: string;
    description: string;
    cereal: 'Wheat' | 'Barley';
    style: 'Blonde' | 'Red' | 'Dark';
    type: 'Ale' | 'Lager';
}

const beerSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    image: { type: mongoose.SchemaTypes.String, required: true },
    description: { type: mongoose.SchemaTypes.String, required: true },
    cereal: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['Wheat', 'Barley'],
    },
    style: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['Blonde', 'Red', 'Dark'],
    },
    type: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['Ale', 'Lager'],
    },
    
});

beerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});

export const Beer = mongoose.model('Beer', beerSchema);
