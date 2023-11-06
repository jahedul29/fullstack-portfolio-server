import express from 'express';
import { USER_ROLE } from '../../../shared/enum/common';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequestWithZod.middleware';
import { BlogController } from './blog.controller';
import { BlogValidationSchema } from './blog.validate';

const blogRouter = express.Router();

blogRouter.post(
  '/',
  validateRequest(BlogValidationSchema.create),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  BlogController.create
);

blogRouter.get('/', BlogController.findAll);

blogRouter.patch(
  '/:id',
  validateRequest(BlogValidationSchema.update),
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  BlogController.update
);

blogRouter.get('/:id', BlogController.findOne);

blogRouter.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
  BlogController.deleteOne
);

export const BlogRouter = blogRouter;
