import middleware from "@middlewares/middleware";
import { STATES, connection } from "mongoose";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(middleware);

handler.all((req, res) => {
  return res
    .status(200)
    .json({
      name: "NY-MINIMART",
      version: process.env.npm_package_version,
      services: {
        database: STATES[connection.readyState],
      },
      success: true,
      timestamp: new Date()
    })
});

export default handler;
