import { Sequelize, DataTypes, Model } from "sequelize";
import { instance } from "..";
import { User } from "./user.model";
import { ChatMessage } from "./chat_message.model";

enum Status {
    'new' = 1,
    'accept' = 2,
}

class Chat extends Model {
    declare chatId: number
    declare ownerId: number
    declare invitedId: number
    declare status: Status
    declare createdAt: Date
    declare updateAt: Date
    
}

Chat.init(
    {
        chatId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        invitedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.TIME,
        },
        updatedAt: {
            type: DataTypes.TIME,
        },
        deletedAt: {
            type: DataTypes.TIME,
        },
    },
    {
        sequelize: instance,
        timestamps: true,
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        tableName: 'chats',
        modelName: 'Chat',
    },
);

// Chat.belongsTo(User,{
//     as: 'Owner',
//     targetKey: 'id',
//     foreignKey: 'ownerId' 
// })

// Chat.belongsTo(User,{
//     as: 'Invited',
//     targetKey: 'id',
//     foreignKey: 'ownerId' 
// })

// Chat.hasMany(User,{
//     as: 'Owner',
//     sourceKey: 'ownerId',
//     foreignKey: 'userId'
//   })

//   Chat.hasMany(User,{
//     as: 'Invited',
//     sourceKey: 'invitedId',
//     foreignKey: 'userId'
//   })

Chat.belongsTo(User,{
    as: 'Owner',
    foreignKey: 'ownerId',
    targetKey: 'userId'
  })

  Chat.belongsTo(User,{
    as: 'Invited',
    foreignKey: 'invitedId',
    targetKey: 'userId'
  })

Chat.hasMany(ChatMessage,{
    foreignKey: 'chatId',
    sourceKey: 'chatId'
})

export {Chat};