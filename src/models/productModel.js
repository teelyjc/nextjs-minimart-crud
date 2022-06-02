import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export const ProductModel = models.Product ||
  model('Product', productSchema);
