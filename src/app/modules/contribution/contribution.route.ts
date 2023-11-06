import express from 'express';
import { USER_ROLE } from '../../../shared/enum/common';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequestWithZod.middleware';
import { ContributionController } from './contribution.controller';
import { ContributionValidationSchema } from './contribution.validate';

const contributionRouter = express.Router();

contributionRouter.post(
  '/',
  validateRequest(ContributionValidationSchema.create),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  ContributionController.create
);

contributionRouter.get('/', ContributionController.findAll);

contributionRouter.patch(
  '/:id',
  validateRequest(ContributionValidationSchema.update),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  ContributionController.update
);

contributionRouter.get('/:id', ContributionController.findOne);

contributionRouter.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  ContributionController.deleteOne
);

export const ContributionRouter = contributionRouter;
