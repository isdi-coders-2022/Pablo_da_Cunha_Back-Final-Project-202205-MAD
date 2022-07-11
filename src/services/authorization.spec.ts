import { compare, createToken, encrypt, verifyToken } from './authorization.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('When the function encrypt is called with a source', () => {
    test('Then bcrypt.hash should be called', async () => {
        bcrypt.hash = jest.fn();
        await encrypt('password');
        expect(bcrypt.hash).toHaveBeenCalled();
    });
});

describe('When the function compare is called', () => {
    test('Then it should call bcrypt.compare', async () => {
        bcrypt.compare = jest.fn();
        await compare('14', '14');
        expect(bcrypt.compare).toHaveBeenCalledWith('14', '14');
    });
});

describe('When the function createToken is called', () => {
    test('Then it should call jwt.sign', async () => {
        jwt.sign = jest.fn();
        await createToken({ id: '14', name: 'pipo' });
        expect(jwt.sign).toHaveBeenCalled();
    });
});

describe('When the function verifyToken is called', () => {
    test('Then it should call jwt.verify', async () => {
        jwt.verify = jest.fn();
        await verifyToken('14');
        expect(jwt.sign).toHaveBeenCalled();
    });
});
