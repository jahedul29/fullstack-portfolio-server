import express from 'express';
import { USER_ROLE } from '../../../shared/enum/common';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequestWithZod.middleware';
import { OwnerController } from './owner.controller';
import { OwnerValidationSchema } from './owner.validate';

const ownerRouter = express.Router();

ownerRouter.post(
  '/',
  validateRequest(OwnerValidationSchema.create),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  OwnerController.create
);

ownerRouter.patch(
  '/:id',
  validateRequest(OwnerValidationSchema.update),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  OwnerController.update
);

ownerRouter.get('/getOwner', OwnerController.getOwner);

export const OwnerRouter = ownerRouter;
