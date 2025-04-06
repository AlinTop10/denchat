'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chat_messages', {
      chatMessageId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chatId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'chats',
            // schema: 'schema',
          },
          key: 'chatId',
        },
        onDelete: 'CASCADE'
      },
      message: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'users',
              // schema: 'schema',
            },
            key: 'userId',
          }
        },
      status:{
          allowNull: false,
          type: Sequelize.DataTypes.TINYINT,
          defaultValue: 1
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chat_messages');
  },
};