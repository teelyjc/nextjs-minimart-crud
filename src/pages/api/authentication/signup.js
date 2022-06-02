import middleware from "@middlewares/middleware";
import nextConnect from "next-connect";
import bcrypt from "bcryptjs";

import { UserModel } from "@models/userModel";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    UserModel.findOne({
      username
    }, (error, user) => {
      if (error) return res
        .status(500)
        .json({
          success: false,
          message: "มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง",
        });
        
      if (user) return res
        .status(200)
        .json({
          success: false,
          message: "มีชื่อผู้ใช้นี้อยู่แล้วในระบบ",
        });

      const genSalt = bcrypt.genSaltSync(12);
      const hashPassword = bcrypt.hashSync(password, genSalt);

      UserModel.create({
        username: username,
        password: hashPassword,
        email: email,
        role: 0,
        salt: genSalt,
      }, (error, user) => {
        if (error) return res
          .status(200)
          .json({
            success: false,
            message: error,
          });
        return res
          .status(200)
          .json({
            success: true,
            user,
            message: "สมัครสมาชิกสำเร็จ",
          });
      });
    })

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default handler;
