import express from 'express';
import { USER_ROLE } from '../../../shared/enum/common';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequestWithZod.middleware';
import { UserController } from './user.controller';
import { UserValidationSchema } from './user.validate';

const userRouter = express.Router();

userRouter.post(
  '/',
  validateRequest(UserValidationSchema.create),
  auth(USER_ROLE.ADMIN),
  UserController.create
);

userRouter.get('/', auth(USER_ROLE.ADMIN), UserController.findAll);

userRouter.patch(
  '/:id',
  validateRequest(UserValidationSchema.update),
  auth(USER_ROLE.ADMIN),
  UserController.update
);

userRouter.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  UserController.findOne
);

userRouter.delete('/:id', auth(USER_ROLE.ADMIN), UserController.deleteOne);

export const UserRouter = userRouter;
