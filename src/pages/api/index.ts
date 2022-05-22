import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import mongoose from "mongoose";

const handler = nextConnect();

handler.all(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).json({
      name: process.env.npm_package_name,
      status: {
        database: mongoose.STATES[mongoose.connection.readyState],
      },
      version: process.env.npm_package_version,
      success: true,
      timestamp: new Date(),
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default handler;
