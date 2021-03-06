import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
  salt: {
    type: String,
  },
}, { timestamps: true });

export const UserModel = models.User ||
  model('User', userSchema);
