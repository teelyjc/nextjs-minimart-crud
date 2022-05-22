import middleware from "@/src/middleware/middleware";
import { UserModel } from "@/src/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(middleware);

handler.post( async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { username, password } = await req.body;

  return res.status(200).json({ success: true, message: "Register Successful" })
});

export default handler;