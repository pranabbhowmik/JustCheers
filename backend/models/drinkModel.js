import mongoose from "mongoose";
import { Schema } from "mongoose";

const drinkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Assuming the image is a file path or URL
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: [
      {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Drink = mongoose.model("Drink", drinkSchema);

export default Drink;
