/* eslint-disable no-unused-vars */
import request from 'supertest';
import { server } from '..';
import { app } from '../app';
import { initDB } from '../db/init.db';
import { mongooseConnect } from '../db/mongoose';
import { Bar } from '../models/bar.model';
import { Brew } from '../models/brew.model';
import { User } from '../models/user.model';
import { createToken } from '../services/authorization';

describe('Given the routes of "/brew', () => {
    let data: { [key: string]: Array<any> };
    let token: string;
    beforeAll(async () => {
        data = await initDB();
        await mongooseConnect();
        token = createToken({
            id: data.user[0].id,
            name: data.user[0].name,
        });
    });
    afterAll(async () => {
        User.collection.drop();
        Brew.collection.drop();
        Bar.collection.drop();
        server.close();
    });

    describe('When method GETALL is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app).get('/brew');
            expect(response.status).toBe(200);
        });
    });
    describe('When method GET is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app).get(
                `/brew/${data.brew[0].id}`
            );
            expect(response.status).toBe(200);
        });
    });
    describe('When method GET is used with a non existing ID', () => {
        test('Then status should be 404', async () => {
            const response = await request(app).get(
                `/brew/4`
            );
            expect(response.status).toBe(404);
        });
    });
});
