'use strict';

const { UserModel, USER_TABLE } = require("../models/userModels.js");
const { BookmarkModel, BOOKMARK_TABLE } = require("../models/bookmarkModels.js");
const { CommentModel, COMMENT_TABLE } = require("../models/commentModels.js");
const { ImageModel, IMAGE_TABLE } = require("../models/imageModels.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserModel);
    await queryInterface.createTable(IMAGE_TABLE, ImageModel);
    await queryInterface.createTable(BOOKMARK_TABLE, BookmarkModel);
    await queryInterface.createTable(COMMENT_TABLE, CommentModel);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(BOOKMARK_TABLE);
    await queryInterface.dropTable(COMMENT_TABLE);
    await queryInterface.dropTable(IMAGE_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },  
};
