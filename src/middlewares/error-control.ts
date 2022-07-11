import { NextFunction, Request, Response } from 'express';

const errors: {
    [key: string]: number;
} = {
    ValidationError: 406, // Not Acceptable
    CastError: 422, // Unprocessable entity
    UserError: 404, // Not found
    UserAuthorizationError: 401, // Unauthorized
    TokenError: 401, // Token missing or invalid
    SuperTokenError: 401, // Token completely incorrect
};

export const errorControl = (
    error: Error,
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    req;
    next;

    let status = 500;
    if (error.name) status = errors[error.name];

    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.send(JSON.stringify(result));
};
