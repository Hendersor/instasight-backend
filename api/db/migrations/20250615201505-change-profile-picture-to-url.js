'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'profile_picture');

    await queryInterface.addColumn('user', 'profile_picture', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'profile_picture');

    await queryInterface.addColumn('users', 'profile_picture', {
      type: Sequelize.BLOB,
      allowNull: true,
    });
  }
};
