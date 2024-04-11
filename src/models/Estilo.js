import { Schema, model } from "mongoose";

const estiloSchema = new Schema({

    clave:{
        type: String,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true

    }


})

export default model("Estilo" ,estiloSchema);