import { Sequelize, DataTypes, Model, TinyIntegerDataType } from "sequelize";
import { instance } from "..";
import { User } from "./user.model";
import { Chat } from "./chat.model";

enum Status {
    'new' = 1,
    'viewed' = 2,
}

class ChatMessage extends Model {
    declare chatMessageId: number
    declare chatId: number
    declare message: string
    declare userId: number
    declare status: Status
    declare createdAt: Date
    declare updatedAt: Date
    declare deletedAt?: Date
}

ChatMessage.init(
    {
        chatMessageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        chatId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
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