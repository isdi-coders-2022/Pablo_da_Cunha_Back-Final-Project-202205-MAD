/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { BrewController } from '../controllers/brew.controller.js';
import { loginRequired } from '../middlewares/login-required.js';
import { ownerRequired } from '../middlewares/owner-required.js';
import { userRequired } from '../middlewares/user-required.js';


export const brewController = new BrewController();
export const brewRouter = Router();

brewRouter.get('/', brewController.getAllController);
brewRouter.get('/:id', brewController.getController);
brewRouter.post(
    '/', 
    brewController.postController
    );
// brewRouter.patch(
//     '/:id',
//     loginRequired,
//     userRequired,
//     ownerRequired,
//     brewController.patchController
// );
// brewRouter.delete(
//     '/delete/:id',
//     loginRequired,
//     userRequired,
//     ownerRequired,
//     brewController.deleteController
// );
