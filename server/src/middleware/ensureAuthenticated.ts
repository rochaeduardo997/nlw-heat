import { Request, Response, NextFunction, request } from "express";
import { verify }                                   from "jsonwebtoken";

interface IPayLoad {
  sub: string
};

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).json({
      errorCode: 'Invalid token'
    });
  }

  const [_, token] = authToken.split(' ');

  try{
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayLoad;

    req.user_id = sub;

    return next();
  }catch(err){
    return res.status(401).json({ errorCode: 'Expired token' });
  }
}
