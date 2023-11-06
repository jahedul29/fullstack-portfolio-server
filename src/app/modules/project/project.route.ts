import express from 'express';
import { USER_ROLE } from '../../../shared/enum/common';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequestWithZod.middleware';
import { ProjectController } from './project.controller';
import { ProjectValidationSchema } from './project.validate';

const projectRouter = express.Router();

projectRouter.post(
  '/',
  validateRequest(ProjectValidationSchema.create),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  ProjectController.create
);

projectRouter.get('/', ProjectController.findAll);

projectRouter.patch(
  '/:id',
  validateRequest(ProjectValidationSchema.update),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  ProjectController.update
);

projectRouter.get('/:id', ProjectController.findOne);

projectRouter.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  ProjectController.deleteOne
);

export const ProjectRouter = projectRouter;
