import dotenv from 'dotenv';

dotenv.config();
export const config = {
    port: process.env.PORT || 3500,
    host: process.env.HOST || 'http://localhost:3000',
    databaseUri: process.env.DATABASE_URI || '',
    nodeEnv: process.env.NODE_ENV || 'development',
};
