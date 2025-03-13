import { Sequelize, DataTypes, Model } from "sequelize";
import { instance } from "..";


class Group_chat extends Model {}
    Group_chat.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            group_user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            text: {
                type: DataTypes.STRING,
            },
            created_at: {
                type: DataTypes.TIME,
            },
            updated_at: {
                type: DataTypes.TIME,
            },
        },
        {
            sequelize: instance,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            tableName: 'group_chats',
            modelName: 'Group_chat',
        },
    );
export {Group_chat};