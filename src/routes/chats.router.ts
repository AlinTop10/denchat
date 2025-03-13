import { Router } from "express";
import { getChatMessage, getMessageInChat, deleteGroups, addGroups, addFriendsInGroup, getUserInGroup, deletedFriendsInGroup} from "../controllers/chat.controller"; 

const chat = Router();

chat.get("/:chatId/messages", getChatMessage );
chat.get("/search/:message", getMessageInChat);
chat.get("/:id/delete", deleteGroups);
chat.post("/addGrouop", addGroups);
chat.get('/friends/:id/:GroupId/addToGroup', addFriendsInGroup);
chat.get('/:GroupId/getUserInGroup', getUserInGroup);
chat.get('/friends/:id/:GroupId/deleteFromGroup', deletedFriendsInGroup);


    export default chat;

    