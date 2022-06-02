import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "@models/userModel";
import { compareSync } from "bcryptjs";
import passport from "passport";

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  UserModel.findById({ _id: id }, (error, user) => {
    if (error) return callback(error);
    return callback(null, user);
  });
});

passport.use(
  new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, callback) => {
    UserModel.findOne({ username },
      (error, user) => {
        if (error) return callback(error, false, { message: error.message });
        if (!user) return callback(null, false, { message: "ไม่พบผู้ใช้ในระบบ" });

        const comparePassword = compareSync(password, user.password);

        if (comparePassword) {
          return callback(null, user, { message: "เข้าสู่ระบบสำเร็จ" });
        }

        return callback(null, false, { message: "รหัสผ่านไม่ถูกต้อง" });
      },
    );
  }),
);

export default passport;
