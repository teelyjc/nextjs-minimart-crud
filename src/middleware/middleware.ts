import { database } from "@/middleware/database";
import nextConnect from "next-connect";

const middleware = nextConnect();

middleware.use(database);

export default middleware;
