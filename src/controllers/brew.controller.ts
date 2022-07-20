/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Brew } from '../models/brew.model.js';

export class BrewController {
    getAllController = async (req: Request, res: Response, _next: NextFunction) => {
        req;
        res.setHeader('Content-type', 'application/json');
        res.send(await Brew.find());
    };

    getController = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        const brew = await Brew.findById(req.params.id);
        if (brew) {
            resp.send(JSON.stringify(brew));
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
        try {
            const newItem = await Brew.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    };
    // patchController = async (req: Request, resp: Response) => {
    //     const newItem = await Brew.findByIdAndUpdate(
    //         req.params.id,
    //         req.body
    //     );
    //     resp.setHeader('Content-type', 'application/json');
    //     resp.send(JSON.stringify(newItem));
    // };

    // deleteController = async (req: Request, resp: Response) => {
    //     const deleteItem = await Brew.findByIdAndDelete(req.params.id);
    //     if (deleteItem === null) {
    //         resp.status(404);
    //         resp.send(
    //             JSON.stringify({
    //                 error: 'Delete impossible',
    //             })
    //         );
    //     } else {
    //         resp.status(202);
    //         resp.send(JSON.stringify(deleteItem));
    //     }
    // };

}