import express, { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.router';
import { OwnerRouter } from '../modules/owner/owner.route';
import { ProjectRouter } from '../modules/project/project.route';
import { UserRouter } from '../modules/user/user.route';

const appRouter = express.Router();

const routes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/owners',
    route: OwnerRouter,
  },
  {
    path: '/projects',
    route: ProjectRouter,
  },
];

routes.forEach((el: { path: string; route: Router }) =>
  appRouter.use(el.path, el.route)
);

export default appRouter;
