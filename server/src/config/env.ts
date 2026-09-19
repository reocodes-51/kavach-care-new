import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kavach_care',
  JWT_SECRET: process.env.JWT_SECRET || 'kavach_national_care_jwt_key_2024',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
