import { UserModel } from "@models/userModel";

export default function getUser(id) {
  return UserModel
    .findById(id)
    .select("-password -createdAt -updatedAt -salt -_id -__v")
    .lean()
    .exec()
}
