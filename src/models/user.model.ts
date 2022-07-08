/* istanbul ignore file */
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
import { iRelationField } from '../interfaces/relation.field.js';
import { isEmail } from '../helpers/is.email.js';

mongooseConnect();

export interface iUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    beers: Array<iRelationField>;
}

const userSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: [isEmail, 'Provided email is not valid.'],
        unique: true,
    },
    password: { type: mongoose.SchemaTypes.String, required: true },
    beers: [{ type: mongoose.Types.ObjectId, ref: 'Beer' }],
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.passwd;
    },
});

export const User = mongoose.model('User', userSchema);
