import database from "@middlewares/database";
import passport from "@middlewares/passport";
import session from "@middlewares/session";
import nextConnect from "next-connect";

const middleware = nextConnect();

middleware
  .use(database)
  .use(session)
  .use(passport.initialize())
  .use(passport.session())

export default middleware;
