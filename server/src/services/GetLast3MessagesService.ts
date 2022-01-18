import prismaClient from '../prisma/index';
import { io }       from '../app';

class GetLast3MessagesService{
  async execute(){
    try{
      const messages = await prismaClient.message.findMany({
        take:    3,
        orderBy: { created_at: 'desc' },
        include: { user: true }
      });

      return messages;
    }catch(err){
      console.log(err);
    }
  }
}

export { GetLast3MessagesService };