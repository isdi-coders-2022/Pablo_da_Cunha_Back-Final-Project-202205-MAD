import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { ExtRequest, iTokenPayload } from '../interfaces/token.js';
import { User } from '../models/user.model.js';
import * as auth from '../services/authorization.js';

export class UserController {
    getController = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        let user;
        try {
            user = await User.findById(req.params.id).populate('beers');
            if (user) {
                resp.send(JSON.stringify(user));
            } else {
                resp.status(404);
                resp.send(JSON.stringify({}));
            }
        
        } catch (err) {
            const error = new Error('Unprocessable entity')
            error.name = 'CastError'
            next(error);
        };
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        let newUser: HydratedDocument<any>;
        try {
            req.body.password = await auth.encrypt(req.body.password);
            newUser = await User.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newUser));
        }  catch (err) {
            // const error = new Error('Not Acceptable')
            // error.name = 'ValidationError'
            next(err);
        };
        
    };

    loginController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        
        
        try {
            const findUser: any = await User.findOne({ email: req.body.email });
            
            
            if (
                !findUser ||
                !(await auth.compare(req.body.password, findUser.password))
                ) {
                                       
                const err = new Error('Invalid user or password');
                err.name = 'UserAuthorizationError';
                next(err);
                return;
                }
                const tokenPayLoad: iTokenPayload = {
                id: findUser.id,
                };
    
                const token = auth.createToken(tokenPayLoad);
                resp.setHeader('Content-type', 'application/json');
                resp.status(201);
                resp.send(JSON.stringify({ token, id: findUser.id }));
            }
            catch (error) {
                const err = new Error('Invalid user or password')
                err.name = 'UserAuthorizationError'
                next(error);
            };
            
    };
        

    patchController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const newItem = await User.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            resp.setHeader('Content-type', 'application/json');
            resp.send(JSON.stringify(newItem));
        } catch (err) {
            const error = new Error('Not found')
            error.name = 'UserError'
            next(error);
        };
    };

    deleteController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const deletedItem = await User.findByIdAndDelete(
                (req as unknown as ExtRequest).tokenPayload.id
            );
            resp.status(202);
            resp.send(JSON.stringify(deletedItem));
        } catch (err) {
            const error = new Error('Unauthorized')
            error.name = 'UserAuthorizationError'
            next(err);
        };
    };

}
