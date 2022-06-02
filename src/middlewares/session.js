import express_session from "express-session";
import { create } from "connect-mongo";

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
  throw new Error('Please define SECRET_KEY to environment variable .env.local');
}

export default function session(req, res, next) {
  return express_session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: create({
      client: req.dbClient,
    }),
  })(req, res, next);
}
