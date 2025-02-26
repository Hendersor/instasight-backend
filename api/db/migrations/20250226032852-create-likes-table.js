'use strict';
const { LIKE_TABLE } = require('../models/likeModels');
const { USER_TABLE } = require('../models/userModels');
const { IMAGE_TABLE } = require('../models/imageModels');
const { DataTypes, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(LIKE_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      image_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: IMAGE_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(LIKE_TABLE);
  }
};
