import { Router } from "express";
import { index, get, groups, chats, friends,deleteFriends, friendAccept, userChats} from "../controllers/users.controller";

const user = Router();

user.get('/', (req, res) => {
   index(req, res);
  });

  
 user.get('/index', index);  
 user.get('/:id/get', get);  
 user.get('/:id/groups', groups);
 user.get('/chats', userChats);  //chats
 user.get('/friends', friends);  //nul folosesc
 user.get('/addFriends/:userId/:friendId', friendAccept); ///:userId/:friendId
 user.get('/deleteFriends/:userId/:friendId', deleteFriends);
 export default user;