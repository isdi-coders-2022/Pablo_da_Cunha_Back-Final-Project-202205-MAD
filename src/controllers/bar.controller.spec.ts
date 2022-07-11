import { NextFunction, Request, Response } from 'express';
import { Bar } from '../models/bar.model.js';
import { BarController } from './bar.controller.js';

describe('Given the BarController', () => {
    let controller: BarController;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: Partial<NextFunction>;
    beforeEach(() => {
        req = {
            params: { id: '14' },
            body: { name: 'pipo' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();

        controller = new BarController() as any;
    });
    describe('When getAllController is called', () => {
        test('Then resp.send should be called', async () => {
            (Bar.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ bar: 'test' }),
            })),
                await controller.getAllController(
                    req as Request,
                    resp as Response
                );
            expect(Bar.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith({ bar: 'test' });
        });
    });
    describe('When getController is called with a data return', () => {
        test('Then resp.send should return data', async () => {
            (Bar.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ bar: 'test' }),
            })),
                await controller.getController(req as Request, resp as Response);
            expect(Bar.findById).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(
                JSON.stringify({ bar: 'test' })
            );
        });
    });
    describe('When getController is called without a data return', () => {
        test('Then resp.send should return an empty object', async () => {
            const bar = null;
            (Bar.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(bar),
            })),
                await controller.getController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });

    describe('When postController is called', () => {
        test('Then resp.send should return data', async () => {
            const bar = { bar: 'test' };
            Bar.create = jest.fn().mockReturnValue(bar);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify(bar));
        });
    });

    describe('When postController is called without a data return', () => {
        test('Then next should be called ', async () => {
            Bar.create = jest.fn().mockRejectedValueOnce(null);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
});
