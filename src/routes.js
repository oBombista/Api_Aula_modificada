import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users.routes';
import statusRouter from './routes/status.routes';
import errorHandler from './middllewares/error-handler.middlleware';
import authorizationRoute from './routes/authorization.routes';
import cors from "cors"
const app = express();

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    next();
});

app.use(express.json());
app.use(usersRoute);
app.use(statusRouter);
app.use(errorHandler);
app.use(authorizationRoute);


export default app;