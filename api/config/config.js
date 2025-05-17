const dotenv = require('dotenv');

dotenv.config();

const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT || 5432,
    jwtSecret: process.env.JWT_SECRET,
    smtp_email: process.env.SMTP_EMAIL,
    smpt_emailPass: process.env.SMTP_PASSWORD,
    // uri: process.env.URI,
    dbTest: process.env.DATABASE_URL_DEV,
    db: process.env.DATABASE_URL,
};

module.exports = { config };
