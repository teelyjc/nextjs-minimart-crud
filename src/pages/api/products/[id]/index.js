import loggedinPermission from "@middlewares/permission/loggedin";
import middleware from "@middlewares/middleware";
import nextConnect from "next-connect";

import { ProductModel } from "@models/productModel";

const handler = nextConnect();

handler
  .use(middleware)
  .use(loggedinPermission)

handler.get(async (req, res) => {
  try {
    const { id } = req.query;

    ProductModel.findOne({ id },
      (error, product) => {
        if (error) throw new Error(error.message);

        if (!product) return res.status(200).json({
          success: false,
          message: "ไม่พบสินค้าที่ค้นหา",
        });

        return res.status(200).json({
          success: true,
          product,
          message: `เพิ่ม ${product.name} เรียบร้อย`,
        });
      }
    );

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id } = req.query;
    const { name, price, amount } = req.body;
    ProductModel.findOneAndUpdate({id: id}, {
      name: name,
      price, price,
      amount: amount,
    }, (error, result) => {
      if (error) throw new Error(error.message);
      return res.status(200).json({ success: true, message: `แก้ไข ${ result.name } สำเร็จ`})
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
})

handler.delete(async (req, res) => {
  try {
    const { id } = req.query;
    ProductModel.findOneAndDelete({ id },
      (error) => {
        if (error) throw new Error(error.message);
        return res.status(200).json({ success: true, message: "ลบสำเร็จ" });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default handler;