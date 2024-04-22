
import { Schema, model } from "mongoose";

const emprendedoraSchema = new Schema({
  top: { type: Number },
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  numeroCliente: {
    type: String,
    required: true
  },
  totalVenta: {
    type: Number,
    required: true
  },

  metasObtenidas: [{ type: Schema.Types.Object, ref: 'Meta' }],

  car: [{ type: Schema.Types.Object, ref: 'Car' }],

  img: {
    type: String,
    required: true,
  },
  tips: [{ type: Schema.Types.Object, ref: 'Tip', required: true }],

});
export default model("Emprendedora", emprendedoraSchema);
