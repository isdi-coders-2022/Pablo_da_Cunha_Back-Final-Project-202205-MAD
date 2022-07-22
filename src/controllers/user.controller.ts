/* eslint-disable no-undef */
import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { ExtRequest, iTokenPayload } from '../interfaces/token.js';
import { iRelationField } from '../interfaces/relation.field.js';
import { iUser, User } from '../models/user.model.js';
import * as auth from '../services/authorization.js';

export class UserController {
    getController = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        let user;
        try {
            user = await User.findById(req.params.id).populate('brews');
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
    getControllerByToken = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        resp.setHeader('Content-type', 'application/json');
        let user;
        req as ExtRequest;
        try {
            user = await User
                .findById((req as ExtRequest).tokenPayload.id)
                .populate('brews')
          
        } catch (error) {
            next(error);
            return;
        }

        if (user) {
            resp.send(JSON.stringify(user));
        } else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
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
            const error = new Error('Not Acceptable')
            error.name = 'ValidationError'
            next(error);
        };
        
    };

    loginController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        
        
        try {
            const findUser: any = await User.findOne({ email: req.body.email }).populate('brews')
            
            
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
                resp.send(JSON.stringify({ token, id: findUser.id, user: findUser }));
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
                req.body,
                {new: true},
            );
            resp.setHeader('Content-type', 'application/json');
            resp.send(JSON.stringify(newItem));
        } catch (err) {
            const error = new Error('Not found')
            error.name = 'UserError'
            next(error);
        };
    };

    addFavController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const idBrew = req.params.id;
            
            
            const { id } = (req as ExtRequest).tokenPayload;
            
            

            let findUser: HydratedDocument<iUser> = (await User
                .findById(id)
                .populate('brews')) as HydratedDocument<iUser>;
            if (findUser === null) {
                next('UserError');
                return;
            }

            
            
            if (
                ((findUser.brews) as Array<iRelationField>).some(
                    (item: any) => item.id.toString() === idBrew
                )
            ) {
                const error = new Error('Brew has been tasted already');
                error.name = 'ValidationError';
                next(error);
                return;
            } else {
                ((findUser.brews) as Array<iRelationField>).push(idBrew as any);
                findUser = await (await findUser.save()).populate('brews');
                resp.setHeader('Content-type', 'application/json');
                resp.status(201);
                resp.send(JSON.stringify(findUser));
            }
        } catch (error) {
            next('CastError');
        }
    };

    deleteFavController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        const idBrew = req.params.id;
        const { id } = (req as ExtRequest).tokenPayload;
        const findUser: HydratedDocument<iUser> = (await User
            .findById(id)
            .populate('brews')
            .populate('done')) as HydratedDocument<iUser>;
        if (findUser === null) {
            next('UserError');
            return;
        }
        findUser.brews = ((findUser.brews) as Array<iRelationField>).filter(
            (item: any) => item.id.toString() !== idBrew
        );
        findUser.save();
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(findUser));
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
