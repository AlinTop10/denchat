import { User } from '../database/models/user.model';

export async function getUserFromReq(req: object): Promise<User>{
    const userReq = req['user'];
    if(!userReq){
        throw new Error("user not exists in req");    
    }    

    const user = await User.findByPk(userReq.id, {rejectOnEmpty: true});

    return user;
}

