import { NextFunction, Request, Response } from 'express';
// import { ExtRequest } from '../interfaces/token.js';
import { User } from '../models/user.model.js';

export const ownerRequired = async (
    req: Request,
    _resp: Response,
    next: NextFunction
) => {
    // const userID = (req as unknown as ExtRequest).tokenPayload.id;
    const findUser = await User.findById(req.params.id);
    if (findUser?.role === 'Owner') {
        next();
    } else {
        const error = new Error();
        error.name = 'OwnerAuthorizationError';
        next(error);
    }
};
