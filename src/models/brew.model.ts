
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';


mongooseConnect();

export interface iBrew {
    id?: string;
    name: string;
    image: string;
    video: string;
    tasted: boolean;
    description: string;
    cereal: 'Wheat' | 'Barley';
    style: 'Blonde' | 'Red' | 'Dark';
    type: 'Ale' | 'Lager';
}

const brewSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    image: { type: mongoose.SchemaTypes.String, required: true },
    video: { type: mongoose.SchemaTypes.String, required: true },
    tasted: { type: mongoose.SchemaTypes.Boolean, required:true },
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

brewSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
    },
});

export const Brew = mongoose.model('Brew', brewSchema);
