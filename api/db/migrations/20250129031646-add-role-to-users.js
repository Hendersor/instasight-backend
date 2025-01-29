'use strict';
const { UserModel, USER_TABLE } = require("../models/userModels.js");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'user',
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
