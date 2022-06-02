import middleware from "@middlewares/middleware";
import passport from "@middlewares/passport";
import nextConnect from "next-connect";

import getUser from "@utils/getUser";

const handler = nextConnect();
handler.use(middleware);

handler.post((req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return res.status(200).json({ success: false, message: info.message });
    }
    if (!user) {
      return res.status(200).json({ success: false, message: info.message });
    }
    
    req.login(user, (error) => {
      if (error) return res.status(200).json({ success: false, message: error });

      return res.status(200).json({ success: true, message: info.message });
    })

  })(req, res, next);
});

export default handler;
