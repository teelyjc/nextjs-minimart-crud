import { Schema, model, models } from "mongoose";

const SettingModal = new Schema({
  registration: {
    type: Boolean,
  }
}, { timestamps: true });

export const UserModel = models.Setting || model("Setting", SettingModal);