import loggedinPermission from "@middlewares/permission/loggedin";
import middleware from "@middlewares/middleware";
import nextConnect from "next-connect";

import { ProductModel } from "@models/productModel";

const handler = nextConnect();

handler
  .use(middleware)
  .use(loggedinPermission);

handler.get(async (req, res) => {
  try {
    ProductModel.find((error, product) => {
      if (error) throw new Error(error.message); 
      res.status(200).json({ success: true, product });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

handler.post(async (req, res) => {
  try {
    const { id, name, price, amount } = req.body;
    
    ProductModel.findOne({ id },
      (error, product) => {
        if (error) throw new Error(error.message);
        if (product) return res.status(200).json({
          success: false, 
          message: "มีสินค้านี้อยู่ในระบบอยู่แล้ว กรุณาลองใหม่อีกครั้ง",
        });

        ProductModel.insertMany({
          id: id,
          name: name,
          price: price,
          amount: amount,
        }, (error, product) => {
          if (error) throw new Error(error.message);
          return res.status(200).json({
            success: true,
            message: "เพิ่มสินค้าสำเร็จ",
          });
        });
      }
    )

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
})

export default handler;