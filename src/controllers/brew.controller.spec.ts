import { NextFunction, Request, Response } from 'express'
import { Brew } from '../models/brew.model.js';
import { BrewController } from './brew.controller.js';

describe('Given the BrewController', () => {
    let controller: BrewController;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: Partial<NextFunction>;
    beforeEach(() => {
        req = {
            params: { id: '14' },
            body: { name: 'test', type: 'test' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };

        next = jest.fn();

        controller = new BrewController() as any;
    });
    describe('When getAllController is called', () => {
        test('Then resp.send should be called', async () => {
            (Brew.find = jest.fn().mockReturnValueOnce({
                populate: jest.fn().mockResolvedValueOnce({ brew: 'test' }),
            })),
                await controller.getAllController(
                    req as Request,
                    resp as Response,
                    next as NextFunction
                );
            expect(Brew.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith({ brew: 'test' });
        });
    });

    describe('When getController is called with a data return', () => {
        test('Then resp.send should be called', async () => {
            (Brew.findById = jest.fn().mockReturnValueOnce({
                populate: jest.fn().mockResolvedValueOnce({ brew: 'test' }),
            })),
                await controller.getController(req as Request, resp as Response, next as NextFunction);
            expect(Brew.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(
                JSON.stringify({ brew: 'test' })
            );
        });
    });

    describe('When getController is called without a data return', () => {
        test('Then resp.send should return an empty object and an error 404', async () => {
            (Brew.findById = jest.fn().mockReturnValueOnce({
                populate: jest.fn().mockResolvedValueOnce(null),
            })),
                await controller.getController(req as Request, resp as Response, next as NextFunction);
            expect(Brew.find).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(404);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });

    // describe('When postController is called ', () => {
    //     test('Then resp.send should return data and a code 201', async () => {
    //         (Brew.create = jest.fn().mockReturnValueOnce({ test: 'test' })),
    //             await controller.postController(
    //                 req as Request,
    //                 resp as Response,
    //                 next as NextFunction
    //             );
    //         expect(resp.status).toHaveBeenCalledWith(201);
    //         expect(resp.send).toHaveBeenCalledWith(
    //             JSON.stringify({ test: 'test' })
    //         );
    //     });
    // });

    // describe('When postController is called', () => {
    //     test('Then next should be called', async () => {
    //         (req as Partial<Request>) = {
    //             params: { id: '1414' },
    //             body: { name: 'test' },
    //         };
    //         Brew.create = jest.fn().mockRejectedValueOnce(null);
    //         await controller.postController(
    //             req as Request,
    //             resp as Response,
    //             next as NextFunction
    //         );
    //         expect(next).toHaveBeenCalled();
    //     });
    // });
});
