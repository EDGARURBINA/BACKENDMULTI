
import { Schema, model } from "mongoose";
const emprendedoraSchema = new Schema({

  nombres: {
    type: String,
    required: true
  },
  apellidos:{
  type: String,
  required: true
  },
  numeroCliente: {
    type: String,
    required: true
  },
  totalVenta:{
    type: Number,
    required: true
  },

  metasObtenidas: [{ type: Schema.Types.Object, ref: 'Meta' }],

  img: {
    type: String,
    required: true,
  },
  tips: [{ type: Schema.Types.Object, required: true }]

});

export default model("Emprendedora", emprendedoraSchema);
