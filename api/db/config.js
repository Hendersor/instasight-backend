const { config } = require('../config/config.js'); 


module.exports = {
  "development": {
    "url": config.dbTest,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },

  "production": {
    "url": config.db,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
};
