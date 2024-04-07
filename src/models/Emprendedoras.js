
import { Schema, model } from "mongoose";

const emprendedoraSchema = new Schema({

  nombre: {
    type: String,
    required: true
  },
  numeroCliente: {
    type: Number,
    required: true
  },
  tips: [
    {
      type: Object
    }
  ],

  semanas: {
    uno: {
      nombre: {
        type: String,
        default: "Semana 1",
      },
      venta: {
        type: Number,
        required: true,
      },
    },
    dos: {
      nombre: {
        type: String,
        default: "Semana 2",
      },
      venta: {
        type: Number,
        required: true,
      },
    },
    tres: {
      nombre: {
        type: String,
        default: "Semana 3",
      },
      venta: {
        type: Number,
        required: true,
      },
    },
  },
  ventaTotal: {
    type: Number,
    require: true,
  },
  metasObtenidas: [{ type: Schema.Types.Object, ref: 'Meta' }],
  img: {
    type: String,
    required: true,
  }

});

export default model("Emprendedoras", emprendedoraSchema);
