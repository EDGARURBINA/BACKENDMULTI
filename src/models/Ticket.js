import { Schema, model } from "mongoose";

const ticketSchema = new Schema ({
   nombre: {
    type: String,
    required: true
    },
    telefono:{
        type: Number,
        required: true
    },
    correo:{
        type: String,
        required: true
    },
    ciudad:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    numExterior:{
        type: Number,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    }

});

export default model("Ticket", ticketSchema);



