import dotenv from 'dotenv';

dotenv.config();

// const config = {
//     env: process.env.NODE_ENV || "development", 
//     port: process.env.PORT || 3000,            
//     dbUser: process.env.DB_USER,                
//     dbPassword: process.env.DB_PASSWORD,        
//     dbHost: process.env.DB_HOST,                
//     dbName: process.env.DB_NAME,                
//     dbPort: process.env.DB_PORT || 5432,        
//   };
const config = {
  development: {
    url: process.env.DATABASE_URL,  // Usamos la URL directamente desde el archivo .env
    dialect: 'postgres',
  },
  test: {
    url: process.env.DATABASE_URL,  // Se asume que las URLs para prueba también están configuradas de esta forma
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,  // Similar para producción
    dialect: 'postgres',
  },
};
  
export { config };