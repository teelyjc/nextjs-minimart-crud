import { NextApiRequest, NextApiResponse } from 'next';
import middleware from '@middleware/middleware';
import nextConnect from 'next-connect';
import mongoose from 'mongoose';

const handler = nextConnect();
handler.use(middleware);

handler.get( async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    return res.status(200).json({
      name: "NY-MINIMART",
      services_status: {
        database: mongoose.STATES[mongoose.connection.readyState],
        allow_registration: true,
      },
      version: process.env.npm_package_version,
      success: true,
      timestamp: new Date(),
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});


export default handler;