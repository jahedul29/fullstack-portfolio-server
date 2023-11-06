import express from 'express';
import { USER_ROLE } from '../../../shared/enum/common';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequestWithZod.middleware';
import { SkillController } from './skill.controller';
import { SkillValidationSchema } from './skill.validate';

const skillRouter = express.Router();

skillRouter.post(
  '/',
  validateRequest(SkillValidationSchema.create),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  SkillController.create
);

skillRouter.get('/', SkillController.findAll);

skillRouter.patch(
  '/:id',
  validateRequest(SkillValidationSchema.update),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  SkillController.update
);

skillRouter.get('/:id', SkillController.findOne);

skillRouter.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  SkillController.deleteOne
);

export const SkillRouter = skillRouter;
