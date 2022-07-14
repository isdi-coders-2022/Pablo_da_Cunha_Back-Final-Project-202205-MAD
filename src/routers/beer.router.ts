/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { BeerController } from '../controllers/beer.controller.js';
import { loginRequired } from '../middlewares/login-required.js';
import { ownerRequired } from '../middlewares/owner-required.js';
import { userRequired } from '../middlewares/user-required.js';


export const beerController = new BeerController();
export const beerRouter = Router();

beerRouter.get('/', beerController.getAllController);
beerRouter.get('/:id', beerController.getController);
beerRouter.post(
    '/', 
    beerController.postController
    );
// beerRouter.patch(
//     '/:id',
//     loginRequired,
//     userRequired,
//     ownerRequired,
//     beerController.patchController
// );
// beerRouter.delete(
//     '/delete/:id',
//     loginRequired,
//     userRequired,
//     ownerRequired,
//     beerController.deleteController
// );
