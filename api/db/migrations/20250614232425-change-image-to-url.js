'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('image', null, {});


    await queryInterface.addColumn('image', 'img', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '', 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('image', 'img');

    await queryInterface.addColumn('image', 'img', {
      type: Sequelize.BLOB('long'),
      allowNull: false,
    });
  },
};
