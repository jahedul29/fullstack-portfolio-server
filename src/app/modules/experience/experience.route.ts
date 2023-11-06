import express from 'express';
import { USER_ROLE } from '../../../shared/enum/common';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequestWithZod.middleware';
import { ExperienceController } from './experience.controller';
import { ExperienceValidationSchema } from './experience.validate';

const experienceRouter = express.Router();

experienceRouter.post(
  '/',
  validateRequest(ExperienceValidationSchema.create),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  ExperienceController.create
);

experienceRouter.get('/', ExperienceController.findAll);

experienceRouter.patch(
  '/:id',
  validateRequest(ExperienceValidationSchema.update),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  ExperienceController.update
);

experienceRouter.get('/:id', ExperienceController.findOne);

experienceRouter.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  ExperienceController.deleteOne
);

export const ExperienceRouter = experienceRouter;
