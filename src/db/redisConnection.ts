import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(`${process.env.DB_REDIS_URL}`);