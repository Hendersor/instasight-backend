const { config } = require('../config/config.js'); 

const dbTest = config.dbTest;
const db = config.db;

module.exports = {
  "development": {
    "url": dbTest,
    "dialect": "postgres",
      "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  "production": {
    "url": db,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
};
