import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
import { iRelationField } from '../interfaces/relation.field.js';

mongooseConnect();

export interface iBar {
    id?: string;
    name: string;
    direction: string;
    image: string;
    adress: string;    
    beers: Array<iRelationField>;
}

const barSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    direction: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    image: { type: mongoose.SchemaTypes.String, required: true },
    adress: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    beers: [{ type: mongoose.Types.ObjectId, ref: 'Beer' }],
});

barSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
    },
});

export const Bar = mongoose.model('Bar', barSchema);
