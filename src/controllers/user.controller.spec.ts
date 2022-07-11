import { NextFunction, Request, Response } from 'express';
import { ExtRequest } from '../interfaces/token';
import { User } from '../models/user.model';
import * as auth from '../services/authorization.js';
jest.mock('../services/authorization.js');
import { UserController } from './user.controller';

describe('Given the Usercontroller', () => {
    let controller: UserController;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: Partial<NextFunction>;

    beforeEach(() => {
        req = {
            params: { id: '14' },
            body: { password: '1441', email: 'pipo@test.com' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
        controller = new UserController();
    });
    describe('When getController is called with an incorrect id', () => {
        test('Then resp.send should be called', async () => {
            req = {
                params: { id: '14' },
            };
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When getController is called with an existing id', () => {
        test('Then resp.send should return a User', async () => {
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ user: 'test' }),
            });
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.send).toHaveBeenCalledWith(
                JSON.stringify({ user: 'test' })
            );
        });
    });

    describe('When getController is called with a non existing id', () => {
        test('Then resp.send should return an empty object', async () => {
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });

    describe('When postController is called with an incorrect body', () => {
        test('Then next should be called', async () => {
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When postController is called', () => {
        test('Then resp.send should return a User and a 201 code', async () => {
            User.create = jest.fn().mockResolvedValue({ test: 'test' });
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.send).toHaveBeenCalledWith(
                JSON.stringify({ test: 'test' })
            );
            expect(resp.status).toHaveBeenCalledWith(201);
        });
    });

    describe('When loginController is called with incorrect data', () => {
        test('Then resp.send should be called', async () => {
            User.findOne = jest.fn().mockResolvedValue(req.body);
            (auth.compare as jest.Mock).mockResolvedValue(false);
            await controller.loginController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When loginController is called', () => {
        test('Then resp.send should be called', async () => {
            User.findOne = jest.fn().mockResolvedValue(req.body);
            (auth.compare as jest.Mock).mockResolvedValue(true);
            (auth.createToken as jest.Mock).mockResolvedValue('1414');
            await controller.loginController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.send).toHaveBeenCalled();
        });
    });
    describe('When deleteController is called with an incorrect id', () => {
        test('Then next should be called', async () => {
            await controller.deleteController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toBeCalled();
        });
    });

    describe('When deleteController is called with a correct id', () => {
        test('Then resp.status should return a 202 code', async () => {
            (req as Partial<ExtRequest>) = {
                params: { id: '141414' },
                tokenPayload: { _id: '141414' },
            };
            const findUser = '141414';
            User.findById = jest.fn().mockResolvedValue(findUser);

            await controller.deleteController(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(resp.status).toBeCalledWith(202);
        });
    });

    describe('When patchController is called with an incorrect id', () => {
        test('Then next should be called', async () => {
            (req as Partial<ExtRequest>) = {
                params: { id: '141414' },
            };
            await controller.patchController(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(next).toBeCalled();
        });
    });
    describe('When patchController is called with an email', () => {
        test('Then next should be called', async () => {
            (req as Partial<ExtRequest>) = {
                params: { id: '141414' },
                tokenPayload: { _id: '141414' },
                body: { name: 'test', email: 'test@test.com' },
            };
            const findUser = '141414';
            User.findByIdAndUpdate = jest.fn().mockResolvedValue(findUser);

            await controller.patchController(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(next).toBeCalled();
        });
    });
    describe('When patchController is called', () => {
        test('Then resp.send should be called', async () => {
            (req as Partial<ExtRequest>) = {
                params: { id: '141414' },
                tokenPayload: { _id: '141414' },
                body: { name: 'test' },
            };
            const findUser = '141414';
            User.findByIdAndUpdate = jest.fn().mockResolvedValue(findUser);

            await controller.patchController(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(resp.send).toBeCalled();
        });
    });
});
