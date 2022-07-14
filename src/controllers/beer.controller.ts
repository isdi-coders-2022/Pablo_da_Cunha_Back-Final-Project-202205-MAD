/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Beer } from '../models/beer.model.js';

export class BeerController {
    getAllController = async (req: Request, res: Response, _next: NextFunction) => {
        req;
        res.setHeader('Content-type', 'application/json');
        res.send(await Beer.find());
    };

    getController = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        const beer = await Beer.findById(req.params.id);
        if (beer) {
            resp.send(JSON.stringify(beer));
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
            const newItem = await Beer.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    };
    // patchController = async (req: Request, resp: Response) => {
    //     const newItem = await Beer.findByIdAndUpdate(
    //         req.params.id,
    //         req.body
    //     );
    //     resp.setHeader('Content-type', 'application/json');
    //     resp.send(JSON.stringify(newItem));
    // };

    // deleteController = async (req: Request, resp: Response) => {
    //     const deleteItem = await Beer.findByIdAndDelete(req.params.id);
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