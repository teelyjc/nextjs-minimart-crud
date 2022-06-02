import middleware from "@middlewares/middleware";
import { ProductModel } from "@models/productModel";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(middleware)

handler.post( async (req, res) => {
  const { products } = req.body;
  try {
    const handleProduct = new Map();

    await products.map( async ({ _id }) => {
      if (!handleProduct.has(_id)) {
        handleProduct.set(_id, 1);
      } else {
        const latest = handleProduct.get(_id);
        handleProduct.set(_id, latest + 1);
      }
    });

    handleProduct.forEach((value, id) => {
      ProductModel.findById(id, async (error, result) => {
        if (error) return res.status(200).json({ success: false, message: error.message });
        if (result) {
          await ProductModel.findByIdAndUpdate(id, { amount: result.amount - value });
          return res.status(200).json({ success: true, message: "ชำระเงินสำเร็จ" });
        }
      });
    });
      
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default handler;