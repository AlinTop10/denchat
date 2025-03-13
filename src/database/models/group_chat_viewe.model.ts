import { Sequelize, DataTypes, Model } from "sequelize";
import { instance } from "..";


class Group_chat_viewe extends Model {}
    Group_chat_viewe.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,  
            },
            group_chat_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            group_user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.TIME,
            },
            status: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize: instance,
            timestamps: true,
            createdAt: 'created_at',
            tableName: 'group_chat_viewes',
            modelName: 'Group_chat_viewe',
        },
    );
export {Group_chat_viewe};