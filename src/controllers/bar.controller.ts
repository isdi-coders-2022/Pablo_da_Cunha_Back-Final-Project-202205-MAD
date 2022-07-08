/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Bar } from '../models/bar.model.js';

export class BarController {
    getAllController = async (req: Request, res: Response) => {
        req;
        res.setHeader('Content-type', 'application/json');
        res.send(await Bar.find().populate('comics'));
    };

    getController = async (req: Request, resp: Response) => {
        resp.setHeader('Content-type', 'application/json');
        const bar = await Bar.findById(req.params.id).populate('comics');
        if (bar) {
            resp.send(JSON.stringify(bar));
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
            const newItem = await Bar.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    };
    patchController = async (req: Request, resp: Response) => {
        const newItem = await Bar.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(newItem));
    };

    deleteController = async (req: Request, resp: Response) => {
        const deleteItem = await Bar.findByIdAndDelete(req.params.id);
        if (deleteItem === null) {
            resp.status(404);
            resp.send(
                JSON.stringify({
                    error: 'Delete impossible',
                })
            );
        } else {
            resp.status(202);
            resp.send(JSON.stringify(deleteItem));
        }
    };

}
