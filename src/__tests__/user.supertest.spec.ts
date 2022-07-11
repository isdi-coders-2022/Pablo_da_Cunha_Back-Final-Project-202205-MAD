/* eslint-disable no-unused-vars */
import request  from "supertest";
import { app } from "../app.js";
import { initDB } from "../db/init.db.js";
import { mongooseConnect } from "../db/mongoose.js";
import { server } from "../index.js";
import { Bar } from "../models/bar.model.js";
import { Beer } from "../models/beer.model.js";
import { iUser, User } from "../models/user.model.js";
import * as auth from '../services/authorization.js';

describe('Given the routes of "/user" ', () => {

    let token: string;
    
    let idUser: string;
    let notaToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV9.eyJpZCI6IjYyYzg1ZDc1MjBkOTczMTgxMzBjZjI2MCIsIm5hbWUiOiJQYXRhIiwiaWF0IjoxNjU3Mjk4MzM4fQ.2C5JViQ0ANORyuTcJYprqT40WB-haV2Ma-q7S2gic_z'
    beforeEach(async () => {
       
        // data = await initDB();
        // await mongooseConnect();
        // token = auth.createToken({
        //     id: data.users[0].id,
        // });
    });
    afterAll(async () => {
        await User.deleteMany();
        await Beer.deleteMany();
        await Bar.deleteMany();
        server.close();
    });

    afterEach(async () => {
        server.close();
    });

 
    describe('When POST is called with the required params', () => {
        const newUser: Partial<iUser> = {
            name: 'Pip',
            email: 'pip@test.com',
            password: '141414',
            beers: [],
            role: 'Taster'
        };
        test('Then status should return code 201', async () => {
            const response = await request(app).post(`/user/`).send(newUser);
            idUser = response.body._id
            
            expect(response.status).toBe(201);
        });
    });

    describe('When GET is called with a correct id', () => {
        test('Then status should return code 200', async () => {
            const response = await request(app).get(
                `/user/${idUser}`
            );
            expect(response.status).toBe(200);
        });
    });
    describe('When POST for login is called with correct credentials', () => {
        test('Then status should return code 201', async () => {
            const user = {
                email: 'pip@test.com',
                password: '141414',
            
            };
            const response = await request(app).post(`/user/login/`).send(user);
            token = response.body.token
            expect(response.status).toBe(201);
        });
    });
    describe('When PATCH is called with a correct token', () => {
        test('Then status should return code 200', async () => {
            const newAUser = {
                name: 'Actualizado',
            };
                       
            const response = await request(app)
                .patch(`/user/${idUser}`)
                .set('Authorization', 'bearer ' + token)
                .send(newAUser);
            expect(response.statusCode).toBe(200);
        });
    });
    
    describe('When GET is called with an incorrect id', () => {
        test('Then status should return code 422', async () => {
            const response = await request(app).get(`/user/141414`);
            expect(response.status).toBe(422);
        });
    });
    
    describe('When POST is called without the required params', () => {
        test('Then status should return code 406', async () => {
            const response = await request(app).post(`/user/`).send(
                    {
                    name: 'Pip',
                    email: 'pip@test.com',
                    password: '141414',
                    beers: []
                }
            );

            expect(response.status).toBe(406);
        });
    });
   
    describe('When POST for login is called with an incorrect email', () => {
        test('Then status should return code 401', async () => {
            const user = {
                email: 'piop@test.com',
                password: '141414',
            };
            const response = await request(app).post(`/user/login/`).send(user);
            expect(response.statusCode).toBe(401);
        });
    });
    describe('When POST for login is called with an incorrect password', () => {
        test('Then status should return code 401', async () => {
            const user = {
                email: 'pipo@test.com',
                password: '414141',
            };
            const response = await request(app).post(`/user/login/`).send(user);
            expect(response.statusCode).toBe(401);
        });
    });
    describe('When PATCH is called with a slightly incorrect token', () => {
        test('Then status should return code 404', async () => {
            const newAUser = {
                name: 'Actualizado',
            };
            const response = await request(app)
                .patch(`/user/${idUser}`)
                .set('Authorization', 'bearer ' + notaToken)
                .send(newAUser);
            expect(response.statusCode).toBe(401);
        });
    });
    describe('When PATCH is called with a very incorrect token', () => {
        test('Then status should return code 412', async () => {
            const newAUser = {
                name: 'Actualizado',
            };
            const response = await request(app)
                .patch(`/user/${idUser}`)
                .set('Authorization', 'bearer ' + 'notatoken')
                .send(newAUser);
            expect(response.statusCode).toBe(401);
        });
    });
    describe('When DELETE is called with a slightly incorrect token', () => {
        test('Then status should return code 401', async () => {
            const response = await request(app)
                .delete(`/user/${idUser}`)
                .set('Authorization', 'bearer ' + notaToken);
            expect(response.statusCode).toBe(401);
        });
    });
    describe('When DELETE is called with a very incorrect token', () => {
        test('Then status should return code 401', async () => {
            const response = await request(app)
                .delete(`/user/${idUser}`)
                .set('Authorization', 'bearer ' + 'notatoken');
            expect(response.statusCode).toBe(401);
        });
    });
    describe('When DELETE is called with a correct token', () => {
        test('Then status should return code 202', async () => {
            const response = await request(app)
                .delete(`/user/${idUser}`)
                .set('Authorization', 'bearer ' + token);
            expect(response.statusCode).toBe(202);
        });
    });
        
});