import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  }
}, { timestamps: true });

export const UserModel = models.User || model("User", userSchema);

export interface User {
  username: string;
  password: string;
  email: string;
  timestamps: Date;
  salt: string;
}