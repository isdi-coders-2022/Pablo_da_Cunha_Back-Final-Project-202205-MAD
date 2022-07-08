/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Beer } from '../models/beer.model.js';

export class BeerController {
    getAllController = async (req: Request, res: Response) => {
        req;
        res.setHeader('Content-type', 'application/json');
        res.send(await Beer.find().populate('artist'));
    };

    getController = async (req: Request, resp: Response) => {
        resp.setHeader('Content-type', 'application/json');
        const beer = await Beer.findById(req.params.id).populate('artist');
        if (beer) {
            resp.send(JSON.stringify(beer));
        } else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };

}