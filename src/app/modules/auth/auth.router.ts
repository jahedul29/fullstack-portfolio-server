import express from 'express';
import { USER_ROLE } from '../../../shared/enum/common';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequestWithZod.middleware';
import { AuthController } from './auth.controller';
import { AuthZodValidation } from './auth.validation';

const authRouter = express.Router();

authRouter.post(
  '/login',
  validateRequest(AuthZodValidation.loginValidation),
  AuthController.login
);

authRouter.post(
  '/refresh-token',
  validateRequest(AuthZodValidation.refreshTokenValidation),
  AuthController.refreshToken
);

authRouter.patch(
  '/change-password',
  validateRequest(AuthZodValidation.changePasswordValidation),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  AuthController.changePassword
);

export const AuthRouter = authRouter;
