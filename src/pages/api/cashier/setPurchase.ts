import { ProductModel } from "@/src/models/productModel";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "@/src/middleware/middleware";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { productPurchase } = req.body;
  try {
    const itemList = new Map();

    await productPurchase.map(async (item: any) => {
      if (!itemList.has(item.id)) {
        itemList.set(item.id, 1);
      } else if (itemList.has(item.id)) {
        const lastest = itemList.get(item.id);
        itemList.set(item.id, lastest + 1);
      }
    });

    itemList.forEach(async (value: any, key) => {
      const searchItem = await ProductModel.findOne({ id: key });
      await ProductModel.findOneAndUpdate(
        {
          id: key,
        },
        {
          amount: searchItem.amount - value,
        }
      );
    });

    res.status(200).json({ success: true, message: "Success transaction" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default handler;
