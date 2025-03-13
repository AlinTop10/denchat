import { Sequelize, DataTypes, Model, IncrementDecrementOptionsWithBy } from "sequelize";
import { instance } from "..";


class Group extends Model {
    declare id: number;
    declare name: string;
    declare UserId: number;
    declare createAt: Date;
    declare updateAt: Date;
    
}

    Group.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }, 
            UserId: {
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
            //createdAt: 'created_at',
            //updatedAt: 'updated_at',
            tableName: 'groups',
            modelName: 'Group',
        },
    );
export {Group};