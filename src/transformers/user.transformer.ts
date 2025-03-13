import { User } from "../database/models/user.model";
import { Chat } from "../database/models/chat.model"; 

function userTransformer(user: User) {
    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}

function chatTransformer(chat: Chat) {
    return {
        id: chat.id,
        createdAt: chat.createdAt,
        status: chat.status
    }
}



export {userTransformer, chatTransformer};