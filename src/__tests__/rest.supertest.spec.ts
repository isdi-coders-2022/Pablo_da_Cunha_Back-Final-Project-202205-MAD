/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import request from "supertest";
// import { server } from "..";
// import { app } from "../app";
// import { initDB } from "../db/init.db";
// import { Bar, iBar } from "../models/bar.model";
// import { Brew, iBrew } from "../models/brew.model";
// import { iUser, User } from "../models/user.model";

// describe('Given all routes" ', () => {
//     let data: { [key: string]: Array<any> };

//     beforeEach(async () => {
//         data = await initDB()
//     });


    // let tokenOwner: string;
    // let tokenTaster: string;
    // let idOwner: string;
    // let idTaster: string;
    // let idBar: string;
    // let idBrew: string;
    // let notaToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV9.eyJpZCI6IjYyYzg1ZDc1MjBkOTczMTgxMzBjZjI2MCIsIm5hbWUiOiJQYXRhIiwiaWF0IjoxNjU3Mjk4MzM4fQ.2C5JViQ0ANORyuTcJYprqT40WB-haV2Ma-q7S2gic_z'
    
    // const mockBar: Partial<iBar> = {
    //     id: '0',
    //     name: 'Bar0',
    //     description: 'cool',
    //     image: 'image',
    //     brews: [],
    //     adress: 'adress'
    // };
    // const mockBrew: Partial<iBrew> = {
    //     id: '1',
    //     name: 'Brew1',
    //     image: 'image',
    //     tasted: false,
    //     description: 'description',
    //     cereal: 'Wheat',
    //     style: 'Blonde',
    //     type: 'Ale'
    // };
    
    // afterAll(async () => {
    //     await User.deleteMany();
    //     await Brew.deleteMany();
    //     await Bar.deleteMany();
    //     server.close();
    // });

    // afterEach(async () => {
    //     server.close();
    // });

    // test('/user (POST)', async () => {
    //     const newOwner: Partial<iUser> = {
    //         name: 'BarOwner',
    //         email: 'barowner@test.com',
    //         password: '141414',
    //         brews: [],
    //         role: 'Owner'
    //     };
    //     const newTaster: Partial<iUser> = {
    //         name: 'BrewTaster',
    //         email: 'brewtaster@test.com',
    //         password: '141414',
    //         brews: [],
    //         role: 'Taster'
    //     };
    //     const responseOwner = await request(app).post(`/user/`).send(newOwner);
    //         idOwner = responseOwner.body._id
    //         console.log('id', responseOwner.body._id);
    //         expect(responseOwner.status).toBe(201);
    //     const responseTaster = await request(app).post(`/user/`).send(newTaster);
    //         idTaster = responseTaster.body._id
    //         console.log('id', responseTaster.body._id);
    //         expect(responseTaster.status).toBe(201);
    // })
    // test('/user (LOGIN)', async () => {
    //     const Owner = {
    //         email: 'barowner@test.com',
    //         password: '141414',
        
    //     };
    //     const responseOwner = await request(app).post(`/user/login/`).send(Owner);
    //     tokenOwner = responseOwner.body.token
          
    //     const Taster = {
    //         email: 'brewtaster@test.com',
    //         password: '141414',
        
    //     };
    //     const responseTaster = await request(app).post(`/user/login/`).send(Taster);
    //     tokenTaster = responseTaster.body.token        
        
    //     expect(responseTaster.status).toBe(201);
    // })
    // test('/bar (POST)', async () => {
    //     const newBar: Partial<iBar> = {
    //         name: 'Bar0',
    //         description: 'cool',
    //         image: 'image',
    //         brews: [],
    //         adress: 'adress'
    //     };
    //     const response = await request(app)
    //             .post(`/bar/`)
    //             .set('Authorization', 'bearer ' + tokenOwner)
    //             .send(newBar);
    //         console.log(tokenOwner, ': TokenOwner');
            
    //         expect(response.status).toBe(201);

    // })
    // test('/bar (GETALL)', async () => {
    //     const response = await request(app).get('/bar');
    //         expect(response.status).toBe(200);
    // })
    // test('/bar (GET)', async () => {
    //     const response = await request(app).get(
    //         `/bar/${data.aBars[0].id}`
    //     );
    //     expect(response.status).toBe(200);
    // })
    // test.skip('/bar (GET with incorrect id)', async () => {
    //     const response = await request(app).get(`/bar/141414`);
    //     expect(response.status).toBe(422);
    // })
    // test.skip('/bar (POST with incorrect params)', async () => {
    //     const response = await request(app).post(`/bar/`).send(
    //         {
    //             name: 'Bar0',
    //             description: 'cool',
    //             image: 'image',
    //             brews: []
    //         }
    //     );

    //     expect(response.status).toBe(406);
    // })
    // test.skip('/brew (POST)', async () => {
    //     const newBrew: Partial<iBrew> = {
    //         name: 'Brew1',
    //         image: 'image',
    //         tasted: false,
    //         description: 'description',
    //         cereal: 'Wheat',
    //         style: 'Blonde',
    //         type: 'Ale'
    //     };
    //     const response = await request(app).post(`/brew/`).send(newBrew);
    //         idOwner;
    //         tokenOwner;
    //         expect(response.status).toBe(201);
    // })
    // test.skip('/brew (GETALL)', async () => {
    //     const response = await request(app).get('/brew');
    //         expect(response.status).toBe(200);
    // })
    // test.skip('/brew (GET)', async () => {
    //     const response = await request(app).get(
    //         `/brew/${data.brew[0].id}`
    //     );
    //     expect(response.status).toBe(200);
    // })
    // test.skip('/brew (GET with incorrect id)', async () => {
    //     const response = await request(app).get(`/brew/141414`);
    //     expect(response.status).toBe(422);
    // })
    // test.skip('/brew (POST with incorrect params)', async () => {
    //     const response = await request(app).post(`/brew/`).send(
    //         {
    //             name: 'Brew1',
    //             image: 'image',
    //             tasted: false,
    //             description: 'description',
    //             cereal: 'Wheat',
    //             style: 'Blonde',
    //         }
    //     );
            
    //     expect(response.status).toBe(406);
    // })
// });


// describe.skip('Given the routes of "/bar" ', () => {
//     let token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2M2MmYxZmNhM2Y4NTY1ODc1N2Q2YiIsImlhdCI6MTY1NzU2MTg0MX0.5IMRlglvSw0IX5Uog6jCAvMxrUgqIpD7TtUsQ7Bv2Sw';
//     let idUser: string = '62cc63c082d19f8bad0211f8';
//     let notaToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV9.eyJpZCI6IjYyYzg1ZDc1MjBkOTczMTgxMzBjZjI2MCIsIm5hbWUiOiJQYXRhIiwiaWF0IjoxNjU3Mjk4MzM4fQ.2C5JViQ0ANORyuTcJYprqT40WB-haV2Ma-q7S2gic_z'
//     afterAll(async () => {
//         await User.deleteMany();
//         await Brew.deleteMany();
//         await Bar.deleteMany();
//         server.close();
//     });

//     afterEach(async () => {
//         server.close();
//     });
//     describe('When POST is called with the required params', () => {
//         const newBar: Partial<iBar> = {
//             name: 'Bar0',
//             description: 'cool',
//             image: 'image',
//             brews: [],
//             adress: 'adress'
//         };
//         test('Then status should return code 201', async () => {
//             const response = await request(app).post(`/bar/`).send(newBar);
//             idUser;
//             token;
//             expect(response.status).toBe(201);
//         });
//     });

//     describe.skip('When GET is called with a correct id', () => {
//         test('Then status should return code 200', async () => {
//             const response = await request(app).get(
//                 `/bar/${idBar}`
//             );
//             expect(response.status).toBe(200);
//         });
//     });
        
//     describe.skip('When GET is called with an incorrect id', () => {
//         test('Then status should return code 422', async () => {
//             const response = await request(app).get(`/bar/141414`);
//             expect(response.status).toBe(422);
//         });
//     });
    
//     describe.skip('When POST is called without the required params', () => {
//         test('Then status should return code 406', async () => {
//             const response = await request(app).post(`/bar/`).send(
//                     {
//                         name: 'Bar0',
//                         description: 'cool',
//                         image: 'image',
//                         brews: []
//                 }
//             );

//             expect(response.status).toBe(406);
//         });
//     });

//     describe.skip('When DELETE is called with a slightly incorrect token', () => {
//         test('Then status should return code 401', async () => {
//             const response = await request(app)
//                 .delete(`/bar/${idBar}`)
//                 .set('Authorization', 'bearer ' + notaToken);
//             expect(response.statusCode).toBe(401);
//         });
//     });
//     describe.skip('When DELETE is called with a very incorrect token', () => {
//         test('Then status should return code 401', async () => {
//             const response = await request(app)
//                 .delete(`/bar/${idBar}`)
//                 .set('Authorization', 'bearer ' + 'notatoken');
//             expect(response.statusCode).toBe(401);
//         });
//     });
//     describe.skip('When DELETE is called with a correct token', () => {
//         test('Then status should return code 202', async () => {
//             const response = await request(app)
//                 .delete(`/bar/${idBar}`)
//                 .set('Authorization', 'bearer ' + token);
//             expect(response.statusCode).toBe(202);
//         });
//     });
        
