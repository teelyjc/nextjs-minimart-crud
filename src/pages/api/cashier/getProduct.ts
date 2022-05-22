import middleware from "@/src/middleware/middleware";
import { ProductModel } from "@/src/models/productModel";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  try {
    const result = await ProductModel.findOne({ id: id });

    if (result) {
      if (result.amount > 0) {
        res.status(200).json({ success: true, result });
      } else {
        res
          .status(200)
          .json({ success: false, message: "ไม่พบสินค้าในสต๊อก !" });
      }
    } else {
      res.status(200).json({ success: false, message: "ไม่พบสินค้าในระบบ !" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default handler;
