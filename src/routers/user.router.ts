import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { loginRequired } from '../middlewares/login-required.js';
import { userRequired } from '../middlewares/user-required.js';

export const userController = new UserController();
export const userRouter = Router();

userRouter.get('/:id', userController.getController);
userRouter.post('/getByToken', loginRequired, userController.getControllerByToken);
userRouter.post('/', userController.postController);
userRouter.post('/login', userController.loginController);
userRouter.patch(
    '/:id',
    loginRequired,
    userRequired,
    userController.patchController
);
userRouter.patch(
    '/fav/:id',
    loginRequired,
    userController.addFavController
);
userRouter.patch(
    '/notfav/:id',
    loginRequired,
    userController.deleteFavController
);
userRouter.delete(
    '/:id',
    loginRequired,
    userRequired,
    userController.deleteController
);
