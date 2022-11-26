import { Router, Request, Response, NextFunction } from 'express';
import userRepository  from '../models/repository';
import DatabaseError from '../models/errors/database.error.models';
import { request } from 'http';

//forma de configurar rotas no express

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers();
  res.status(200).send({ users });
});


usersRoute.get(
  '/users/:userId',
  async (req: Request<{ userId: string }>, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const user = await userRepository.findById(userId);
      res.status(200).send(user);
    } catch (error) {
    next(error);
    }
  }
);


usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const newuser = req.body;
  const userId = await userRepository.create(newuser);
  res.status(201).send(userId);
});


usersRoute.post('/login', async (req: Request, res: Response, next: NextFunction) =>{
  const {email, password} = req.body;
  const userId = await userRepository.findByEmailAndPassword(email, password);
  res.status(200).send(userId);
});


usersRoute.put('/users/:userId', async (req: Request<{ userId: string }>, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const modifieduser = req.body;
  modifieduser.userId = userId; 
  await userRepository.update(modifieduser);
  res.status(200).send(modifieduser); //pode ser o ao inves do modfieduser, vazio para segurança
});




usersRoute.delete('/users/:userId', async (req: Request<{ userId: string }>, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  await userRepository.remove(userId)
  res.sendStatus(200);
})


export default usersRoute;