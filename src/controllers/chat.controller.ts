import { Response , Request } from "express";
import { ChatMessage } from "../database/models/chat_message.model";
import { User } from "../database/models/user.model";
import { Op } from "sequelize";
import { Group } from "../database/models/group.model";
import { GroupUser } from "../database/models/group_user.model";

const PER_PAGE = 10;

async function  getChatMessage(req, res) {
    try {
        const chatId = req.params['chatId'];
        const page = req.query['page'] || 1;
        const offset = (page - 1) * PER_PAGE;
        console.log({page, offset});
        const message = await ChatMessage.findAll({
            where: { ChatId: chatId },
            order: [["id", "DESC"]],
            attributes: ['message', 'id', 'createdAt'],
            include: [
                {
                    model: User,
                    attributes: ["id","name"],
                }
            ],
            limit: PER_PAGE,
            offset,
        });
        return res.json(message);
    }
    catch(error){
        console.log(error);
        return res.json({message: "message is not found"});
    }   
};

async function getMessageInChat(req, res){
    try{
        const Message = req.params['message'];
        const messages = await ChatMessage.findAll({
            where: { 
                message: {[Op.like]: `%${Message}%`} 
            },
           attributes: ['message'],
           include: [
            {
                model: User,
                attributes: ["id","name"],
            }
           ]
        });
        return res.json(messages);
    } catch(error){
        console.log(error);
        return res.json({messages: "is not found"});
    }
};

async function deleteGroups(req, res){
    const id = req.params['id'];

    const group = await Group.findOne({
        where: {
            id: id,
        },
    });

    if(!group){
        res.json({message: "Group not found!"});
        return;
    }
    try{
        await Group.destroy({
            where: {
                id: id,
            },
        });
        res.json({message: "Group successfully deleted!"});
    }catch (error){
        console.log(error);
        res.json({message: "Oops... an error has occurred!"})
    }
};

async function  addGroups(req, res){
    const { name, UserId } = req.body;

    try{
        const newGroup = await Group.create({
            name,
            UserId,
        });
        res.json({ message: "Group creaet" });
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
};

async function  addFriendsInGroup(req, res){
    try{
        const friendId = req.params['id'];

        const friend = await User.findByPk(friendId);

        if(!friend){
            return res.json({ message: "The friend not exist." });
        }
        const groupId = req.params['GroupId'];

        const group = await Group.findByPk(groupId);

        if(!group){
            res.json({ message: "The group not exist." });
        }

        const existingEntry = await GroupUser.findOne({
            where: {
                [Op.or]: [
                    { GroupId: groupId, UserId: friendId }
                ],
            },
        });

        if(existingEntry){
            res.json({ message: "This user is already in the group." });
        } else { 
            await GroupUser.create({
                GroupId: groupId, 
                UserId: friendId, 
                status: 1
            });
        }

        return res.json({ message: "The user has been successfully added to the pool. "});
    } catch(error){
        console.log(error);
        return res.json({ message: error.message});
    }
};

async function  deletedFriendsInGroup(req, res){
    try{
        const friendId = req.params['id'];

        const friend = await User.findByPk(friendId);

        if(!friend){
            return res.json({ message: "The friend not exist." });
        }
        const groupId = req.params['GroupId'];

        const group = await Group.findByPk(groupId);

        if(!group){
            res.json({ message: "The group not exist." });
        }

        const existingEntry = await GroupUser.findOne({
            where: {
                [Op.or]: [
                    { GroupId: groupId, UserId: friendId }
                ],
            },
        });

        if(!existingEntry){
            res.json({ message: 'This user is not found in geop'});
        }

        await GroupUser.destroy({
            where: {
                UserId: friendId
            },
        });

        return res.json({ message: "this user has been successfully deleted! "});
    } catch(error){
        console.log(error);
        return res.json({ message: error.message});
    }
};

async function getUserInGroup(req, res) {
    try{
        const groupId = req.params['GroupId'];
        const group = await Group.findByPk(groupId,{
            include: [
                {
                    model: User,
                    as: 'Members',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        if(!group){
            return res.json({ message: "Groupul nu a fost gasit." });
        }

        return res.json({ group: {
            id: group.id, 
            name: group.name,
             members: group['Members'].map( member => {
                return {
                    id: member.id,
                    name: member.name,
                    email: member.email,
                }
             }),
            } 
        });
    } catch(error){
        console.log(error);
        return res.json({ message: error.message });
    }
}

async function  sendMessageToGroup(req, res){
    try{
        const { chatId } = req.params['GroupId'];
        const { userId , message } = req.body;
        
        const chat = await Group.findByPk(chatId);
        if(!chat){
            return res.json({message: "The group not exists."});
        }

        const user = await User.findByPk(userId);
        if(!user){
            return res.json({ message: "The user not exists." })
        }

        const newMessage = await ChatMessage.create({
            ChatId: chatId,
            UserId: userId,
            message: message,
            status: 1,
        });

        return res.json({ 
            message: "The message was sent",
            date: newMessage,
        });
    } catch(error) {
        console.log(error);
        res.json({ message: error.message});
    }
}// sa se faca o functie asemenea pentru a trimite measaj in group

export {getChatMessage, getMessageInChat, deleteGroups, addGroups, addFriendsInGroup, getUserInGroup, deletedFriendsInGroup, sendMessageToGroup};