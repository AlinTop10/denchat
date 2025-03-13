import { Router } from "express";
import { index, get, groups, chats, friends, addFriends, deleteFriends, friendAccept, userChats} from "../controllers/users.controller";

const user = Router();

user.get('/', (req, res) => {
   index(req, res);
  });

  
  
 user.get('/:id/get', get);  
 user.get('/:id/groups', groups);
 user.get('/chats', userChats);  //chats
 user.get('/friends', friends);  
 user.post('/addFriends', addFriends); 
 user.post('/deleteFriends', deleteFriends); 
 user.get('/friends/:id/accept', friendAccept);
 export default user;