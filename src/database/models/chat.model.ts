import { Sequelize, DataTypes, Model } from "sequelize";
import { instance } from "..";
import { User } from "./user.model";
import { ChatMessage } from "./chat_message.model";


class Chat extends Model {
    declare id: number
    declare ownerId: number
    declare invitedId: number
    declare createdAt: Date
    declare updateAt: Date
    declare status: number
}

Chat.init(
    {
        id: {
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
        createdAt: {
            type: DataTypes.TIME,
        },
        updatedAt: {
            type: DataTypes.TIME,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
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
//     foreignKey: 'id'
//   })

//   Chat.hasMany(User,{
//     as: 'Invited',
//     sourceKey: 'invitedId',
//     foreignKey: 'id'
//   })

Chat.belongsTo(User,{
    as: 'Owner',
    foreignKey: 'ownerId'
  })

  Chat.belongsTo(User,{
    as: 'Invited',
    foreignKey: 'invitedId'
  })

Chat.hasMany(ChatMessage)

export {Chat};