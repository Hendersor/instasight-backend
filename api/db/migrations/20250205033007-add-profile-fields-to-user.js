'use strict';
const { USER_TABLE } = require("../models/userModels.js");
const { Sequelize } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'profile_picture', {
      type: Sequelize.BLOB('long'),
      allowNull: true,
    })

    await queryInterface.addColumn(USER_TABLE, 'bio', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'profile_picture');
    await queryInterface.removeColumn(USER_TABLE, 'bio');
  }
};
