import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';


export interface ExtRequest extends Request {
    tokenPayload: JwtPayload; // iTokenPayload;
}

export interface iTokenPayload extends JwtPayload {
    id: string;
}


