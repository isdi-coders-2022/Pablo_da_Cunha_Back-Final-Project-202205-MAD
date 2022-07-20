/* istanbul ignore file */
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
import { iRelationField } from '../interfaces/relation.field.js';
import { email as Email } from '../helpers/email.js';

mongooseConnect();

export interface iUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    brews?: Array<iRelationField>;
    role: string;
}

const userSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: [Email, 'Provided email is not valid.'],
        unique: true,
    },
    password: { type: mongoose.SchemaTypes.String, required: true },
    brews: [{ type: mongoose.Types.ObjectId, ref: 'Brew' }],
    role: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['Taster', 'Owner'],
    },
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.passwd;
    },
});

export const User = mongoose.model('User', userSchema);
