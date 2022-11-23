import { Express, Request, Response, NextFunction, Router } from 'express';

const statusRouter = Router();

statusRouter.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
});

export default statusRouter;
