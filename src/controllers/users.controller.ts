import { Request , Response} from "express";
import { User } from "../database/models/user.model";
import { Group } from "../database/models/group.model";
import { Op } from "sequelize";
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
                    id: item.id,
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
            attributes: ['id', 'name', 'email'],
            include: [
                {
                association: 'Owner',
                as: 'Chat',
                include: [
                    {
                    model: ChatMessage,
                    attributes: ['UserId', 'message', 'createdAt'],
                    }
                ]
            }
        ]
        });
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
                [Op.or]: [{ ownerId: user.id }, { invitedId: user.id }]
            },
            // include: [ "Owner", "Invited"]
            include: [
                { model: User, as: "Owner", attributes: ["id", "name"] },
                { model: User, as: "Invited", attributes: ["id", "name"]}
            ]
        });

        const dateChat = chats.map(chat => {
            const friend = chat.ownerId == user.id ? chat["Invited"] : chat["Owner"];

            return {
                id: chat.id,
                createdAt: chat.createdAt,
                status: chat.status,
                friend: friend ? { id: friend.id, name: friend.name} : null
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
                [Op.or]: [{ "userOneId": user.id }, { "userTwoId": user.id }]
            },
            include: ["UserOne", "UserTwo"]
        })

        const count = await UserFriend.count({
            where: {
                [Op.or]: [{ "userOneId": user.id }, { "userTwoId": user.id }]
            }
        });

        return res.json({
            user: userTransformer(user), 
            friends: friends.map(userFriend =>{
                const friend : User = userFriend.userOneId === user.id ? userFriend['UserTwo'] : userFriend['UserOne'];
                return {
                    status: userFriend.status,
                    initByMe: userFriend.userOneId === user.id,
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

async function addFriends(req, res){
    try{
        const {userId, friendId } = req.body;

        const user = await User.findByPk(userId);
        const friend = await User.findByPk(friendId);

        if(!user || !friend){
            return res.json({message: "The user or friend does not exist."});
        }

        const checkFriend = await UserFriend.findOne({
            where: {
                [Op.or]: [
                    { userOneId: userId, userTwoId: friendId },
                    { userOneId: friendId, userTwoId: userId },
                ],
            },
        });

        if(checkFriend){
            return res.json({message: "The friendship already exists."});
        }

        await UserFriend.create({
            userOneId: userId,
            userTwoId: friendId,
            status: 1
        });

        return res.json({message: "Friend added successfully!"})

    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "An internal error has occurred." });
    }
}

async function deleteFriends(req, res){
    try{
        const {userId, friendId} = req.body;

        const user = await User.findByPk(userId);
        const friend = await User.findByPk(friendId);

        if(!user || !friend){
            return res.json({message: "The user or friend does not exist."});
        }

        const checkFriend = await UserFriend.findOne({
            where: {
                [Op.or]: [
                    { userOneId: userId, userTwoId: friendId }
                ],
            },
        });

        if(!checkFriend){
            return res.json({message: "this person is not your friend."});
        }

        await UserFriend.destroy({
            where: {
                userTwoId: friendId
            },
        });
        return res.json({message: "Friend successfully deleted!"})

    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Oops... an error has occurred!" });
    }
}

async function  friendAccept(req, res){
    try{
        const userId = req.user.id;
        const friendId = req.params['id'];

        const user = await User.findByPk(userId);
        const friend = await User.findByPk(friendId);
        
        if(!user || !friend){
            return res.json({message: "The user or friend does not exist."});
        }
        
        const checkFriend = await UserFriend.findOne({
            where: {
                [Op.or]: [
                    { userOneid: friendId, userTwoId: userId}
                ],
            },
        });

        if(!checkFriend ) 
            {
            return res.json({
                message: "The friend request does not exist or you are already friends.",
            });
        }
        checkFriend.status = 2;
        await checkFriend.save();

        return res.json({ message: "Friendship successfully accepted!"});
    } catch(error){
        console.log(error);
        return res.json({ message: error.message});
    }
}

export {index, get, groups, chats, friends, addFriends, deleteFriends, friendAccept, userChats};

