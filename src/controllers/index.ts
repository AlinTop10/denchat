import { Request , Response} from "express";
import { User } from "../database/models/user.model";
import { Group } from "../database/models/group.model";
import { GroupUser } from "../database/models/group_user.model"; 

function test(n: number): boolean{
    return n > 10; 
}

async function index(req, res){
    // const a = new User({
    //     name: 'tanea',
    //     email: 'aaaa',
    //     password: 'asas',
    //     avatar: 'aaass'
    // });

    //await a.save();

    const group_user = await GroupUser.findAll(  // Group
             {
                 attributes: ['id','group_id'],
                // limit: 1  
             });
             

    const user = await User.findByPk(3);
    user['email'] = 'asdaf';
    await user.save();
    // const users = await User.findAll(
    //     {
    //         attributes: ['name','email'],
    //         limit: 1  
    //     });
    return res.json({user})
}
export {index};

