import { connect } from "mongoose";

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB 
} =
  process.env;

if (!MONGO_USER || !MONGO_PASS || !MONGO_HOST || !MONGO_PORT || !MONGO_DB) {
  throw new Error("Please define the MONGO environment variable on .env.local");
}

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

global.mongoose = global.mongoose || {};
const cache = global.mongoose;

export default async function database(req, res, next) {
  if (!cache.connection) {
    console.log("Connecting to MongoDB..");
    try {
      const { connection } = await connect(MONGO_URI);

      cache.connection = connection;
      cache.client = connection.getClient();

      if (cache.connection) {
        console.log("MongoDB connection established.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  req.dbClient = cache.client;
  return next();
}
