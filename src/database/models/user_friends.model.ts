import { Sequelize, DataTypes, Model, BelongsTo } from "sequelize";
import { instance } from "..";
import { User } from "./user.model";

enum  Status {
    new = 1,
    accepted = 2
}

class UserFriend extends Model {
    declare id: number;
    declare userOneId: number;
    declare userTwoId: number;
    declare status: Status;
    declare createdAt: Date;
}

    UserFriend.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userOneId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userTwoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.TIME,
            },
            updatedAt: {
                type: DataTypes.TIME,
            },
        },
        {
            sequelize: instance,
            timestamps: true,
            tableName: 'user_friends',
        },
    );

    // UserFriend.belongsTo(User, {
    //     foreignKey: "userOneId",
    //     as: "UserOne"
    // });
  
    //   UserFriend.belongsTo(User, {
    //     foreignKey: "userTwoId",
    //     as: "UserTwo"
    // });
    
export {UserFriend}