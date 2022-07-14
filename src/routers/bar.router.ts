/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { BarController } from '../controllers/bar.controller.js';
import { loginRequired } from '../middlewares/login-required.js';
// import { ownerRequired } from '../middlewares/owner-required.js';
import { userRequired } from '../middlewares/user-required.js';

export const barController = new BarController();
export const barRouter = Router();

barRouter.get('/', barController.getAllController);
barRouter.get('/:id', barController.getController);
barRouter.post(
    '/', 
    barController.postController
    );
// barRouter.patch(
//     '/:id',
//     loginRequired,
//     userRequired,
//     ownerRequired,
//     barController.patchController
// );
// barRouter.delete(
//     '/delete/:id',
//     loginRequired,
//     userRequired,
//     ownerRequired,
//     barController.deleteController
// );
