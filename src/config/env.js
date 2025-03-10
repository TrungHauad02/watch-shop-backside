import dotenv from "dotenv";
dotenv.config();

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,

  PORT: process.env.PORT,

  JWT_SECRET: process.env.JWT_SECRET,
};
