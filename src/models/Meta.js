import { Schema, model } from "mongoose";

const metaSchema = new Schema({
  clave: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  ventaNecesaria: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },

});

export default model("Meta", metaSchema);
