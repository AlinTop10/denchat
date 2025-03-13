import { Sequelize, DataTypes, Model, TinyIntegerDataType } from "sequelize";
import { instance } from "..";
import { User } from "./user.model";
import { Chat } from "./chat.model";

enum Status {
    'new' = 1,
    'viewed' = 2,
}

class ChatMessage extends Model {
    declare id: number
    declare ChatId: number
    declare message: string
    declare UserId: number
    declare status: Status
    declare createdAt: Date
    declare updatedAt: Date
    declare deletedAt?: Date
}

ChatMessage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ChatId: {
            type: DataTypes.INTEGER,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
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
        paranoid: true,
        tableName: 'chat_messages'
    },
);



export {ChatMessage};