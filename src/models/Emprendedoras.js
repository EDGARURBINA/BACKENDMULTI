
import { Schema, model } from "mongoose";
const emprendedoraSchema = new Schema({

  nombre: {
    type: String,
    required: true
  },
  apellidos:{
  type: String,
  required: true
  },
  numeroCliente: {
    type: Number,
    required: true
  },
  ventaTotal:{
    type: Number,
    required: true
  },

  metasObtenidas: [{ type: Schema.Types.Object, ref: 'Meta' }],

  img: {
    type: String,
    required: true,
  },
  tip: { type: Schema.Types.Object, ref: 'Tip' } 

});

export default model("Emprendedoras", emprendedoraSchema);
