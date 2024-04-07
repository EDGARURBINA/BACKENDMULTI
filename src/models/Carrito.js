import { Schema ,model } from "mongoose";

const cartItemSchema = new Schema({
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  });

  const cartSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      default: 0
    }
  });
  
  export default model("Cart", cartSchema);
