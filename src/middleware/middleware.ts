import database from "@middleware/database";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextHandler } from "next-connect";

const middleware = nextConnect({
  onError: (
    error: NativeError,
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    console.error(error.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => {
    res.status(404).end("Page not found.")
  }
});

middleware
  .use(database)

export default middleware;