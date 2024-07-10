// import express, {
//   Application,
//   ErrorRequestHandler,
//   NextFunction,
//   Request,
//   Response,
// } from 'express';
// import { API_PORT } from './config/index';

// import authRouter from '@/routes/auth.route';
// import { HttpException } from './exceptions/HttpException';
// import { ErrorMiddleware } from './middlewares/error.middleware';

// const PORT: number = Number(API_PORT) || 8000;

// const app: Application = express();

// // initialize middleware
// app.use(express.json());

// // initialize endpoint
// app.use('/auth', authRouter);

// // initialize error middleware
// app.use(ErrorMiddleware);

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
