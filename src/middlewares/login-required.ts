import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ExtRequest, iTokenPayload } from '../interfaces/token.js';
import { verifyToken } from '../services/authorization.js';

export const loginRequired = (
    req: Request,
    _resp: Response,
    next: NextFunction
) => {
    const authorization = req.get('authorization');
    let token;
    const tokenError = new Error('Token missing or invalid');
    tokenError.name = 'TokenError';
    const supertokenError = new Error('Token completely incorrect');
    supertokenError.name = 'SuperTokenError';
    let decodedToken: string | JwtPayload;
    if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')
    ) { 
        try {
        token = authorization.substring(7);
        console.log('TOKEN',token);
        
        decodedToken = verifyToken(token);
        console.log({decodedToken});
        
        if (typeof decodedToken === 'string') {
            console.log('loginrequired 1 error');
            next(tokenError);
        } else {
            (req as ExtRequest).tokenPayload = decodedToken as iTokenPayload;
            console.log('loginrequired 2 error');
            next();
        }
    } 
    catch (error) {
        next(supertokenError)
    }
        
    } else {
        console.log('loginrequired 3 error');
        
        next(tokenError);
    }
};