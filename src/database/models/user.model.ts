import { Sequelize, DataTypes, Model, HasManyGetAssociationsMixin }  from 'sequelize';
import { instance } from '..';
import { Group } from './group.model';
import { GroupUser } from './group_user.model';
import { ChatMessage } from './chat_message.model';
import bcrypt from 'bcrypt';
import { UserFriend } from './user_friends.model';
import { Chat } from './chat.model';

class User extends Model {
  declare getGroups?: HasManyGetAssociationsMixin<Group>;
  declare userId: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare avatar: string;
  
}

    User.init(
        {
          
          userId: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
            },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
              type: DataTypes.STRING,
              allowNull: false,
            },
          avatar: {
              type: DataTypes.STRING,
              allowNull: true,
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
          tableName: 'users',
          modelName: 'User', 
        },
      );  
      
      User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      });

    // User.hasMany(Chat,{
    //   as: 'OwnedChats',
    //   foreignKey: 'ownerId'
    // });

    // User.hasMany(Chat,{
    //   as: 'InvitedChats',
    //   foreignKey: 'invitedId'
    // })



    // User.hasMany(UserFriend,{
    //   foreignKey: "userOneId",
    //   as: "UserOne"
    // })

    // User.hasMany(UserFriend,{
    //   foreignKey: "userTwoId",
    //   as: "UserTwo"
    // })

    // UserFriend.belongsTo(User, {
    //   foreignKey: "userOneId",
    //   as: "UserOne"
    // });

    // UserFriend.belongsTo(User, {
    //   foreignKey: "userTwoId",
    //   as: "UserTwo"
    // });

    // User.belongsToMany(Group, {
    //   through: GroupUser, // Modelul intermediar
    //   foreignKey: 'UserId', // Legătura utilizatorului cu tabela intermediară
    //   otherKey: 'GroupId', // Legătura grupului cu tabela intermediară
    //   as: 'Groups', // Alias pentru grupurile utilizatorului
    // });

    // Group.belongsToMany(User, {
    //   through: GroupUser, // Modelul intermediar
    //   foreignKey: 'GroupId', // Legătura grupului cu tabela intermediară
    //   otherKey: 'UserId', // Legătura utilizatorului cu tabela intermediară
    //   as: 'Members', // Alias pentru membrii grupului
    // });

    ChatMessage.belongsTo(User,{
      foreignKey: 'userId',
      targetKey: 'userId'
    });

    User.hasMany(ChatMessage,{
        foreignKey: 'userId',
        sourceKey: 'userId'
      })

    // User.belongsToMany(Group, {through: GroupUser}); //foreignKey: 'group_id', otherKey: 'user_id'});

export {User};