import { ProductModel } from "@/src/models/productModel";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "@/src/middleware/middleware";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  try {
    await ProductModel.findOneAndRemove({ id: id });
    return res.status(200).json({ success: true, timestamps: new Date() });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default handler;
