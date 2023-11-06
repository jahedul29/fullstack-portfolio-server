import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { errorHandling } from './app/middlewares/errorHandling.middleware';
import appRouter from './app/routes';

const app: Application = express();

// configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//entry point
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/api/v1', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Welcome to fullstack portfolio');
});

//routes
app.use('/api/v1', appRouter);

// middlewares
app.use(errorHandling);

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Users API',
      version: '1.0.0',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001/',
    },
  ],
  apis: ['./src/app/modules/*/*.route.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// not found route
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `${req.originalUrl} not found`,
    errorMessages: [
      {
        path: req.originalUrl,
        message: `${req.originalUrl} not found`,
      },
    ],
  });
});

export default app;
