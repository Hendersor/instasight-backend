'use strict';
const { DataTypes } = require('sequelize');
const {FOLLOW_TABLE} = require("../models/followModels");
const {USER_TABLE} = require("../models/userModels");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(FOLLOW_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      followerId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      followingId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(FOLLOW_TABLE);
  }
};
