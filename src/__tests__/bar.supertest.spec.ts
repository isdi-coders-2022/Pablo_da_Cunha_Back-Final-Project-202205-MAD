import request from 'supertest';
import { server } from '..';
import { app } from '../app';
import { initDB } from '../db/init.db';
import { mongooseConnect } from '../db/mongoose';
import { Bar } from '../models/bar.model';
import { Brew } from '../models/brew.model';
import { User } from '../models/user.model';

describe('Given the routes of "/bar', () => {
    let data: { [key: string]: Array<any> };

    beforeAll(async () => {
        data = await initDB();
        await mongooseConnect();
    });
    afterAll(async () => {
        User.collection.drop();
        Brew.collection.drop();
        Bar.collection.drop();
        server.close();
    });
    describe('When method GETALL is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app).get('/bar');
            expect(response.status).toBe(200);
        });
    });
    describe('When method GET is used', () => {
        test('Then status should be 200', async () => {
            const response = await request(app).get(
                `/bar/${data.bars[0].id}`
            );
            expect(response.status).toBe(200);
        });
    });
    describe('When method GET is used with and unexisting ID', () => {
        test('Then status should be 404', async () => {
            const response = await request(app).get(
                `/bar/4`
            );
            expect(response.status).toBe(404);
        });
    });
    
    
});
