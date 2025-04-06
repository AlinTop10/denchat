import { Request , Response} from "express";
import { User } from "../database/models/user.model";
import { Group } from "../database/models/group.model";
import { Op, where } from "sequelize";
import { ChatMessage } from "../database/models/chat_message.model";
import { UserFriend } from "../database/models/user_friends.model";
import { chatTransformer, userTransformer } from "../transformers/user.transformer";
import { GroupUser } from "../database/models/group_user.model";
import { Chat } from "../database/models/chat.model";
import { getUserFromReq } from "../services/user.service";


async function index(req, res){

    const users = await User.findAll();
    return res.json(
        {
            list: users.map( (item: User) => {
                return {
                    id: item.userId,
                    name: item.name
                }
            })
        }
    )
}

async function get(req, res){
    try{
        const id = req.params['id'];
        const user = await User.findByPk(id,{rejectOnEmpty: true});

        return res.json(userTransformer(user));
    }
    catch(error){
           return res.json({message: "user not found"});
    }
}

async function groups(req, res){
    try{
        const id = req.params['id'];
        const user = await User.findByPk(id,{
            rejectOnEmpty: true,
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: Group,
                    attributes: ['name', 'UserId']
                }
            ]
        });

        return res.json({user})
    }
    catch(error){
        console.log(error);
           return res.json({message: "user not found"});
    }
}

async function chats(req, res){
    try{
        const id = req.params['id'];
        const user = await User.findByPk(id,{
            rejectOnEmpty: true,
            attributes: ['chatId', 'name', 'email'],
            include: [
                {
                association: 'Owner',
                as: 'Chat',
                include: [
                    {
                    model: ChatMessage,
                    attributes: ['userId', 'message', 'createdAt'],
                    }
                ]
            }
        ]
        });
        console.log(user);
        
        return res.json({user})
    }
    catch(error){
        console.log(error);
           return res.json({message: "chats not found"});
    }
}

async function userChats(req, res){
    try{
        const user = await getUserFromReq(req);
        
        const chats = await Chat.findAll({
            where:{
                [Op.or]: [{ ownerId: user.userId }, { invitedId: user.userId }]
            },
            // include: [ "Owner", "Invited"]
            include: [
                { model: User, as: "Owner", attributes: ["userId", "name"] },
                { model: User, as: "Invited", attributes: ["userId", "name"]},
                { model: ChatMessage, limit: 1, order: [["chatMessageId", "DESC"]]}
            ],
        });

        const dateChat = chats.map(chat => {
            const friend = chat.ownerId == user.userId ? chat["Invited"] : chat["Owner"];   
            
            return {
                id: chat.chatId,
                createdAt: chat.createdAt,
                status: chat.status,
                friend: friend ? { id: friend.userId, name: friend.name} : null,
                msg: chat['ChatMessages'].length ? chat['ChatMessages'][0].message : null
            };
        });

        return res.json({ chats: dateChat });
    }
    catch(error){
        console.log(error);
           return res.json({message: "chats not found"});
    }
}

async function friends(req, res){
    try{
        const { id } = req.user;
        const user = await User.findByPk(id, {rejectOnEmpty: true});
        const friends =  await UserFriend.findAll({
            where: {
                [Op.or]: [{ "userOneId": user.userId }, { "userTwoId": user.userId }]
            },
            include: ["UserOne", "UserTwo"]
        })

        const count = await UserFriend.count({
            where: {
                [Op.or]: [{ "userOneId": user.userId }, { "userTwoId": user.userId }]
            }
        });

        return res.json({
            user: userTransformer(user), 
            friends: friends.map(userFriend =>{
                const friend : User = userFriend.userOneId === user.userId ? userFriend['UserTwo'] : userFriend['UserOne'];
                return {
                    status: userFriend.status,
                    initByMe: userFriend.userOneId === user.userId,
                    ...userTransformer(friend)
                }
            }), 
            count
        })
    }
    catch(error){
        const message = error.message || 'user not found';
        console.log(error);
           return res.json({message: message});
    }
}

async function friendAccept(req, res){
    try{
        // const userId = req.params['userId'];
        // const friendId = req.params['friendId'];

        const {userId, friendId} = req.params;

        const user = await User.findByPk(userId);
        const friend = await User.findByPk(friendId);

        if(!user || !friend){
            return res.json({message: "The user or friend does not exist."});
        }

        const checkFriend = await Chat.findOne({
            where: {
                [Op.or]: [
                    { ownerId: userId, invitedId: friendId },
                    { ownerId: friendId, invitedId: userId },
                ],
            },
        });

        if(!checkFriend){
            return res.json({message: "No pending friend request found."});
        }

        checkFriend.status = 2;
        await checkFriend.save();

        return res.json({
            message: "Friend added successfully!",
            updatedChat: checkFriend
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "An internal error has occurred." });
    }
}

async function deleteFriends(req, res){
    try{
        const {userId, friendId} = req.params;

        const user = await User.findByPk(userId);
        const friend = await User.findByPk(friendId);

        if(!user || !friend){
            return res.json({message: "The user or friend does not exist."});
        }

        const checkChat = await Chat.findOne({
            where: {
                [Op.or]: [
                    { ownerId: userId, invitedId: friendId },
                    { ownerId: friendId, invitedId: userId },
                ],
            },
        });

        if (checkChat) {
            await checkChat.destroy();
        }
        
        return res.json({message: "Friend successfully deleted!"})

    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Oops... an error has occurred!" });
    }
}

export {index, get, groups, chats, friends, friendAccept, deleteFriends,userChats};

