import { NextFunction, Request, Response, Router } from "express";
import forbiddenError from "../models/errors/forbidden.error.model";
 
const authorizationRoute = Router();
 
authorizationRoute.post('/token', (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers['authorization'];
  try {
    if (!authorizationHeader) {
      throw new forbiddenError('Credenciais não informadas');
    }
    const [autenthicationType, token] = authorizationHeader.split(' ');
 
    if (autenthicationType !== 'Basic' || !token) {
      throw new forbiddenError('Tipo de Autenticação inválida');
    }
    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
    console.log(tokenContent);
 
    const [username, password] = tokenContent.split(':');
    console.log(username, password);
 
    if (!username || !password) {
      throw new forbiddenError('Credenciais não preenchidas');
    }
 
  } catch (error) {
    next(error)
  }
});
 
export default authorizationRoute;
