import { Schema, model } from "mongoose";

const productSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  clave: {
    type: Number, 
    required: true,
    unique: true 
  },
  cantidad: {
    type: Number,
    required: true,
  },
  tipo:{
    type: String,
    required: true
  }
  
});

export default model("Product", productSchema);