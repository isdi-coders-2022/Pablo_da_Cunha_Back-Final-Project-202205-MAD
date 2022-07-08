import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorControl } from './middlewares/error-control.js';
import { userRouter } from './routers/user.router.js';
import { beerRouter } from './routers/beer.router.js';
import { barRouter } from './routers/bar.router.js';


export const app = express();

// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/bar', barRouter);
app.use('/beer', beerRouter);
app.use('/user', userRouter);

app.use(errorControl);
