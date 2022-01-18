import { Request, response, Response } from 'express';

import { ProfileUserService } from '../services/ProfileUserService';

class ProfileUserController {
  async handle(req: Request, res: Response){
    const { user_id } = req;
    try{
      const service = new ProfileUserService();
      const result = await service.execute(user_id);

      return res.json(result);
    }catch(err){
      console.log(err);
    }
  }
}

export { ProfileUserController };
