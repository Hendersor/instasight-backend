const { config } = require('../config/config.js'); 

// const uri = process.env.URI;
const dbTest = process.env.DATABASE_URL_DEV;
const db = process.env.DATABASE_URL;

module.exports = {
  "development": {
    "url": dbTest,
    "dialect": "postgres",
  },
  "production": {
    "url": db,
    "dialect": "postgres",
  }
};
