import { Router, Request, Response, NextFunction } from 'express';
import userRepository  from '../repositories/user.repository';
import DatabaseError from '../models/errors/database.error.models';

//forma de configurar rotas no express

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers();
  res.status(200).send({ users });
});


usersRoute.get(
  '/users/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const user = await userRepository.findById(uuid);
      res.status(200).send(user);
    } catch (error) {
    next(error);
    }
  }
);


usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const newuser = req.body;
  const uuid = await userRepository.create(newuser);
  res.status(201).send(uuid);
});



usersRoute.post('/login', async (req: Request, res: Response, next: NextFunction) =>{
  const {email, password} = req.body;
  const userId = await userRepository.findByEmailAndPassword(email, password);
  res.status(200).send(userId);
});


usersRoute.put('/users/:uuid', (req: Request<{ uuid: String }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  const modifieduser = req.body;
  modifieduser.uuid = uuid;
  res.status(200).send(modifieduser);
});

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  await userRepository.remove(uuid)
  res.sendStatus(200);
})


export default usersRoute;