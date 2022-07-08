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

}
