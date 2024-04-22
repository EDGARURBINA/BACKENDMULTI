import { Schema, model } from "mongoose";

const carSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  cantidadProducts: {
    type: Number,
    required: true 
  },
  totalVenta: {
    type: Number, 
    required: true 
  }
});

export default model("Car", carSchema);
