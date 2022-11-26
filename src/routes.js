import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users.routes';
import statusRouter from './routes/status.routes';
import errorHandler from './middllewares/error-handler.middlleware';
import authorizationRoute from './routes/authorization.routes';

const app = express();

app.use(express.json());
app.use(usersRoute);
app.use(statusRouter);
app.use(errorHandler);
app.use(authorizationRoute);


export default app;