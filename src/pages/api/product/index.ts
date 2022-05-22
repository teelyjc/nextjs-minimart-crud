import { NextApiRequest, NextApiResponse } from "next";
import middleware from "@/src/middleware/middleware";
import nextConnect from "next-connect";
import { ProductModel } from "@/src/models/productModel";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const productList = await ProductModel.find();
    return res.status(200).json({ products: productList });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default handler;
