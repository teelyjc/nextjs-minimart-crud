import { Schema } from "mongoose";

export default interface ProductProps {
  _id: Schema.Types.ObjectId;
  id: string;
  name: string;
  price: number;
  amount: number;
}
