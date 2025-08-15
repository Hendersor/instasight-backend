const dotenv = require('dotenv');
const path = require('path')

const ENV = process.env.NODE_ENV || 'development';

const envPath = ENV === 'development' ? '.env' : `.env.${ENV}`;

dotenv.config({ path: path.resolve(process.cwd(), envPath) });



const config = {
    env: ENV,
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT || 5432,
    jwtSecret: process.env.JWT_SECRET,
    smtp_email: process.env.SMTP_EMAIL,
    smpt_emailPass: process.env.SMTP_PASSWORD,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    dbDev: process.env.DATABASE_URL_DEV,
    dbProd: process.env.DATABASE_URL || process.env.DATABASE_URL_PROD,
};

module.exports = { config };
