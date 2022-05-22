import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import mongoose from "mongoose";

const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_DB } =
  process.env;

if (!MONGO_USER || !MONGO_PASS || !MONGO_HOST || !MONGO_PORT || !MONGO_DB) {
  throw new Error("Please define the MONGO environment variable on .env.local");
}

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

declare global {
  var mongoose: any;
}

global.mongoose = global.mongoose || {};
const cache = global.mongoose;

const database = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  if (!cache.connection) {
    console.log("Connecting to MongoDB...");
    try {
      const { connection } = await mongoose.connect(MONGO_URI);

      cache.connection = connection;
      cache.client = connection.getClient();

      if (cache.connection) {
        console.log("MongoDB connection established");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
  return next();
};

export { database };
