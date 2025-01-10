'use strict';

const { UserModel, USER_TABLE } = require("../models/userModels.js");
const { CartModel, CART_TABLE } = require("../models/cartModels.js");
const { OrdersModel, ORDER_TABLE } = require("../models/orderModels.js");
const { ProductsModel, PRODUCT_TABLE } = require("../models/productModels.js");
const { WishModel, WISH_TABLE } = require("../models/wishModels.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserModel);
    await queryInterface.createTable(CART_TABLE, CartModel);
    await queryInterface.createTable(ORDER_TABLE, OrdersModel);
    await queryInterface.createTable(PRODUCT_TABLE, ProductsModel);
    await queryInterface.createTable(WISH_TABLE, WishModel);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CART_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(WISH_TABLE);
  },
};
