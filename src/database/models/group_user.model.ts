import { Sequelize, DataTypes, Model } from "sequelize";
import { instance } from "..";
import { User } from "./user.model";
import { Group } from "./group.model";

enum Status { 
    'new' = 1,
    'viewed' = 2,
}

class GroupUser extends Model {
    declare id: number
    declare GroupId: number
    declare UserId: number
    declare status: Status
}
    GroupUser.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            GroupId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.TINYINT,
                allowNull: false,
            },
        },
        {
            sequelize: instance,
            tableName: 'group_users',
            modelName: 'GroupUser',
            timestamps: false,
        },
    );

export {GroupUser};