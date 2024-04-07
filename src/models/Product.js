import { Schema, model } from "mongoose";

const productSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  clave: {
    type: String, 
    required: true,
    unique: true 
  },
  estilos: [
     { 
        nombreStyle:{
            type:String,
            required:true,
        },
        cantidad:{
            type:Number,
            required:true
        },
        precio: {
          type: Number,
          required: true
        },
        categoria:{
          type: String,
          required: true
        },
        claveStyle: {
          type: String, 
          required: true,
          unique: true 
        },
        descripcion: {
          type: String,
          required: true
        },
        img: {
          type: String,
          required: true
        }
      
    }
  ],
  
});

export default model("Product", productSchema);