import express, { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.router';
import { BlogRouter } from '../modules/blog/blog.route';
import { ContributionRouter } from '../modules/contribution/contribution.route';
import { ExperienceRouter } from '../modules/experience/experience.route';
import { OwnerRouter } from '../modules/owner/owner.route';
import { ProjectRouter } from '../modules/project/project.route';
import { SkillRouter } from '../modules/skill/skill.route';
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
  {
    path: '/contributions',
    route: ContributionRouter,
  },
  {
    path: '/blogs',
    route: BlogRouter,
  },
  {
    path: '/experiences',
    route: ExperienceRouter,
  },
  {
    path: '/skills',
    route: SkillRouter,
  },
];

routes.forEach((el: { path: string; route: Router }) =>
  appRouter.use(el.path, el.route)
);

export default appRouter;
